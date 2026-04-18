-- Referência: alinhe a tabela do Neon a estes nomes OU ajuste appsettings.json -> UsuarioCadastro (ColunaNome, ColunaEmail, ColunaSenha).
-- Execute no console SQL do Neon se precisar criar do zero.

CREATE TABLE IF NOT EXISTS public.usuarios (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL
);
