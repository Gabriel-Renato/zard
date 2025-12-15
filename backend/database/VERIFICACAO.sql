-- =====================================================
-- SCRIPT DE VERIFICAÇÃO - Verificar estrutura do banco
-- =====================================================
-- Execute este script para verificar se tudo está correto

USE if0_40649761_zard;

-- Ver todas as tabelas
SHOW TABLES;

-- Verificar estrutura de cada tabela
DESCRIBE usuarios;
DESCRIBE solicitacoes_cadastro;  -- ou solicitacoes se foi renomeada
DESCRIBE materias;
DESCRIBE flashcards;
DESCRIBE revisoes;

-- Verificar se a tabela de solicitações tem o nome correto
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'if0_40649761_zard' 
AND TABLE_NAME LIKE '%solicit%';

-- Verificar contagem de registros
SELECT 
    'usuarios' as tabela, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'solicitacoes_cadastro', COUNT(*) FROM solicitacoes_cadastro
UNION ALL
SELECT 'materias', COUNT(*) FROM materias
UNION ALL
SELECT 'flashcards', COUNT(*) FROM flashcards
UNION ALL
SELECT 'revisoes', COUNT(*) FROM revisoes;

-- Verificar se usuário admin existe
SELECT * FROM usuarios WHERE email = 'admin@zard.com';

