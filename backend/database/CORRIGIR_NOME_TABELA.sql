-- =====================================================
-- CORRIGIR NOME DA TABELA
-- =====================================================
-- Se sua tabela se chama "solicitacoes" mas deveria ser
-- "solicitacoes_cadastro", execute este script

USE if0_40649761_zard;

-- Opção 1: Renomear tabela existente (se ela se chama "solicitacoes")
-- Descomente a linha abaixo se necessário:
-- RENAME TABLE solicitacoes TO solicitacoes_cadastro;

-- Opção 2: Se a tabela está com nome diferente, primeiro verifique:
-- SHOW TABLES LIKE '%solicit%';

-- Opção 3: Se não existe nenhuma tabela de solicitações, crie:
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

