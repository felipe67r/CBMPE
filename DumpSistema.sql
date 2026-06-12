-- 1. Criar o banco de dados
CREATE DATABASE gestao_ocorrencias;

-- Conectar ao banco (Se for no PostgreSQL, use: \c gestao_ocorrencias)
-- Se for no MySQL, use: USE gestao_ocorrencias;

-- 2. Criar tabela de Usuários
CREATE TABLE usuarios (
    matricula VARCHAR(20) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL -- Recomendado guardar a senha criptografada (hash)
);

-- 3. Criar tabela de Ocorrências
CREATE TABLE ocorrencias (
    id_ocorrencia SERIAL PRIMARY KEY, -- No MySQL, mude para: id_ocorrencia INT AUTO_INCREMENT PRIMARY KEY
    tipo_ocorrencia VARCHAR(100) NOT NULL,
    nivel_gravidade VARCHAR(50),
    qtd_vitimas INT DEFAULT 0,
    riscos_adicionais TEXT,
    localizacao TEXT,
    usuario_matricula VARCHAR(20),
    FOREIGN KEY (usuario_matricula) REFERENCES usuarios(matricula) ON DELETE SET NULL
);

-- 4. Criar tabela de Evidências (Logística e Recursos utilizados)
CREATE TABLE evidencias (
    id_evidencia SERIAL PRIMARY KEY, -- No MySQL, mude para: id_evidencia INT AUTO_INCREMENT PRIMARY KEY
    id_ocorrencia INT UNIQUE, -- Relacionamento 1 para 1 com a ocorrência
    fotos TEXT, -- Pode guardar a URL/caminho da foto
    detalhamento_tecnico TEXT,
    agentes_extintores VARCHAR(100),
    estabelecimento_mangueira VARCHAR(100),
    equip_protecao VARCHAR(100),
    ferramentas_arrombamento VARCHAR(100),
    suporte_basico VARCHAR(100),
    imobilizacao VARCHAR(100),
    curativos VARCHAR(100),
    equip_diagnostico VARCHAR(100),
    ferramentas_hidraulicas VARCHAR(100),
    iluminacao VARCHAR(100),
    equip_superficie VARCHAR(100),
    mergulho VARCHAR(100),
    sistema_cordas VARCHAR(100),
    seguranca VARCHAR(100),
    FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia) ON DELETE CASCADE
);

-- 5. Criar tabela de Assinatura
CREATE TABLE assinaturas (
    id_assinatura SERIAL PRIMARY KEY, -- No MySQL, mude para: id_assinatura INT AUTO_INCREMENT PRIMARY KEY
    id_ocorrencia INT UNIQUE,
    rubrica TEXT, -- Pode guardar o caminho da imagem da assinatura digital ou hash
    FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencias(id_ocorrencia) ON DELETE CASCADE
);

ALTER TABLE usuarios ADD COLUMN nome VARCHAR(150);
ALTER TABLE usuarios ADD COLUMN unidade VARCHAR(100);