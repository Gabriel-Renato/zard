import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  Search, 
  CheckCircle, 
  XCircle, 
  Mail,
  Calendar,
  Filter,
  UserCheck,
  UserX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

interface Solicitacao {
  id: number;
  nome: string;
  email: string;
  motivo: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  criado_em: string;
  atualizado_em: string;
}

const AdminSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState<Solicitacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendente' | 'aprovado' | 'rejeitado'>('todos');
  const { toast } = useToast();

  useEffect(() => {
    loadSolicitacoes();
  }, []);

  useEffect(() => {
    filterSolicitacoes();
  }, [searchTerm, statusFilter, solicitacoes]);

  const loadSolicitacoes = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.listarTodasSolicitacoes();
      if (response.success && response.data) {
        setSolicitacoes(response.data);
        setFilteredSolicitacoes(response.data);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar solicitações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSolicitacoes = () => {
    let filtered = solicitacoes;

    // Filtrar por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.motivo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSolicitacoes(filtered);
  };

  const handleApprove = async (id: number) => {
    try {
      await apiService.atualizarSolicitacao(id, 'aprovado');
      toast({
        title: "Solicitação aprovada!",
        description: "Um email foi enviado com as instruções de acesso.",
      });
      await loadSolicitacoes();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao aprovar solicitação",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await apiService.atualizarSolicitacao(id, 'rejeitado');
      toast({
        title: "Solicitação rejeitada",
        description: "O usuário foi notificado por email.",
        variant: "destructive",
      });
      await loadSolicitacoes();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao rejeitar solicitação",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pendente: "bg-yellow-500/20 text-yellow-600",
      aprovado: "bg-green-500/20 text-green-600",
      rejeitado: "bg-red-500/20 text-red-600",
    };
    return badges[status as keyof typeof badges] || "";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pendente: "Pendente",
      aprovado: "Aprovado",
      rejeitado: "Rejeitado",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const stats = {
    total: solicitacoes.length,
    pendentes: solicitacoes.filter(s => s.status === 'pendente').length,
    aprovados: solicitacoes.filter(s => s.status === 'aprovado').length,
    rejeitados: solicitacoes.filter(s => s.status === 'rejeitado').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Solicitações</h1>
          <p className="text-muted-foreground">Gerencie todas as solicitações de cadastro</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejeitados</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejeitados}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar por nome, email ou motivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="todos">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solicitações List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Lista de Solicitações ({filteredSolicitacoes.length})
          </CardTitle>
          <CardDescription>
            {statusFilter !== 'todos' && `Filtrado por: ${getStatusLabel(statusFilter)}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>Carregando...</p>
            </div>
          ) : filteredSolicitacoes.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma solicitação encontrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSolicitacoes.map((solicitacao, i) => (
                <motion.div
                  key={solicitacao.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/70 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {solicitacao.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{solicitacao.nome}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(solicitacao.status)}`}>
                          {getStatusLabel(solicitacao.status)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {solicitacao.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Motivo: {solicitacao.motivo}
                      </p>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Criado em {new Date(solicitacao.criado_em).toLocaleDateString('pt-BR')}
                        </p>
                        {solicitacao.atualizado_em !== solicitacao.criado_em && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            Atualizado em {new Date(solicitacao.atualizado_em).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {solicitacao.status === 'pendente' && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleReject(solicitacao.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(solicitacao.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSolicitacoes;

