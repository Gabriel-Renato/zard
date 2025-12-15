-- =====================================================
-- ZARD FLASHCARD MASTERY - Banco de Dados Completo
-- =====================================================
-- Este script cria todo o banco de dados necessário
-- Execute este arquivo no MySQL para criar o banco completo
-- =====================================================

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS zard_flashcard 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados
USE zard_flashcard;

-- =====================================================
-- TABELA: usuarios
-- Armazena informações dos usuários do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'estudante') DEFAULT 'estudante',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_tipo (tipo),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA: solicitacoes_cadastro
-- Armazena solicitações de novos cadastros
-- =====================================================
CREATE TABLE IF NOT EXISTS solicitacoes_cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    motivo TEXT,
    status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_criado_em (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA: materias
-- Armazena as matérias/disciplinas dos usuários
-- =====================================================
CREATE TABLE IF NOT EXISTS materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    cor VARCHAR(7) DEFAULT '#1e40af',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA: flashcards
-- Armazena os flashcards criados pelos usuários
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    materia_id INT NOT NULL,
    usuario_id INT NOT NULL,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    dificuldade ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    revisado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_materia (materia_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_revisado (revisado),
    INDEX idx_dificuldade (dificuldade),
    FULLTEXT idx_busca (pergunta, resposta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA: revisoes
-- Histórico de revisões dos flashcards
-- =====================================================
CREATE TABLE IF NOT EXISTS revisoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flashcard_id INT NOT NULL,
    usuario_id INT NOT NULL,
    acertou BOOLEAN,
    revisado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_flashcard (flashcard_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_revisado_em (revisado_em),
    INDEX idx_acertou (acertou)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Inserir usuário administrador padrão
-- Email: admin@zard.com
-- Senha: admin123
-- Hash gerado com: password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO usuarios (nome, email, senha, tipo) 
VALUES (
    'Administrador', 
    'admin@zard.com', 
    '$2y$10$DRmme6UBU6TRins3HJ4mxOn8ypboiQE48LXts3SGg1RlBIe3S/OpG', 
    'admin'
)
ON DUPLICATE KEY UPDATE nome=nome;

-- =====================================================
-- DADOS DE EXEMPLO (OPCIONAL)
-- Descomente as linhas abaixo se quiser dados de teste
-- =====================================================

-- Exemplo: Criar usuário estudante de teste
-- INSERT INTO usuarios (nome, email, senha, tipo) 
-- VALUES (
--     'Estudante Teste', 
--     'estudante@teste.com', 
--     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
--     'estudante'
-- );

-- Exemplo: Criar matéria de exemplo (precisa de usuario_id válido)
-- INSERT INTO materias (usuario_id, nome, descricao, cor)
-- VALUES (1, 'Direito Constitucional', 'Princípios e normas da Constituição', '#1e40af');

-- Exemplo: Criar flashcard de exemplo
-- INSERT INTO flashcards (materia_id, usuario_id, pergunta, resposta, dificuldade)
-- VALUES (1, 1, 'O que é o princípio da legalidade?', 'O princípio que estabelece que a Administração Pública só pode fazer o que a lei permite.', 'medium');

-- =====================================================
-- VISUALIZAR ESTRUTURA (OPCIONAL)
-- Execute os comandos abaixo para verificar as tabelas
-- =====================================================

-- Listar todas as tabelas
-- SHOW TABLES;

-- Ver estrutura de uma tabela específica
-- DESCRIBE usuarios;
-- DESCRIBE materias;
-- DESCRIBE flashcards;
-- DESCRIBE solicitacoes_cadastro;
-- DESCRIBE revisoes;

-- Verificar dados inseridos
-- SELECT * FROM usuarios;
-- SELECT COUNT(*) as total_usuarios FROM usuarios;
-- SELECT COUNT(*) as total_materias FROM materias;
-- SELECT COUNT(*) as total_flashcards FROM flashcards;

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================

