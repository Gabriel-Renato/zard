const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/zard-flashcard-mastery/backend/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  user?: any;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}/${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(nome: string, email: string, password: string) {
    return this.request('auth.php?action=register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, password }),
    });
  }

  // Solicitações
  async criarSolicitacao(nome: string, email: string, motivo: string) {
    return this.request('solicitacoes.php', {
      method: 'POST',
      body: JSON.stringify({ nome, email, motivo }),
    });
  }

  async listarSolicitacoes(status: string = 'pendente') {
    return this.request(`solicitacoes.php?status=${status}`);
  }

  async atualizarSolicitacao(id: number, status: string) {
    return this.request('solicitacoes.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    });
  }

  // Matérias
  async listarMaterias(userId: number) {
    return this.request(`materias.php?user_id=${userId}`);
  }

  async obterMateria(userId: number, id: number) {
    return this.request(`materias.php?user_id=${userId}&id=${id}`);
  }

  async criarMateria(userId: number, nome: string, descricao?: string, cor?: string) {
    return this.request(`materias.php?user_id=${userId}`, {
      method: 'POST',
      body: JSON.stringify({ nome, descricao, cor }),
    });
  }

  async atualizarMateria(userId: number, id: number, data: { nome?: string; descricao?: string; cor?: string }) {
    return this.request(`materias.php?user_id=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    });
  }

  async deletarMateria(userId: number, id: number) {
    return this.request(`materias.php?user_id=${userId}&id=${id}`, {
      method: 'DELETE',
    });
  }

  // Flashcards
  async listarFlashcards(userId: number, materiaId?: number, revisado?: boolean) {
    let url = `flashcards.php?user_id=${userId}`;
    if (materiaId) url += `&materia_id=${materiaId}`;
    if (revisado !== undefined) url += `&revisado=${revisado}`;
    return this.request(url);
  }

  async obterFlashcard(userId: number, id: number) {
    return this.request(`flashcards.php?user_id=${userId}&id=${id}`);
  }

  async criarFlashcard(
    userId: number,
    materiaId: number,
    pergunta: string,
    resposta: string,
    dificuldade: 'easy' | 'medium' | 'hard' = 'medium'
  ) {
    return this.request(`flashcards.php?user_id=${userId}`, {
      method: 'POST',
      body: JSON.stringify({ materia_id: materiaId, pergunta, resposta, dificuldade }),
    });
  }

  async atualizarFlashcard(
    userId: number,
    id: number,
    data: {
      pergunta?: string;
      resposta?: string;
      dificuldade?: 'easy' | 'medium' | 'hard';
      revisado?: boolean;
      materia_id?: number;
    }
  ) {
    return this.request(`flashcards.php?user_id=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    });
  }

  async deletarFlashcard(userId: number, id: number) {
    return this.request(`flashcards.php?user_id=${userId}&id=${id}`, {
      method: 'DELETE',
    });
  }

  // Admin
  async obterEstatisticas() {
    return this.request('admin.php?action=stats');
  }
}

export const apiService = new ApiService();
export default apiService;

