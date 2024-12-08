---- Criando o Banco de Dados ----

create database sulagro;

---- Conectando com o Banco de dados ----

\c sulagro


---- Criando as tabelas ----

CREATE TABLE colaborador_sulagro (
	cpf VARCHAR(50) NOT NULL, 
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	cargo VARCHAR(50) NOT NULL,
	permissao INTEGER NOT NULL,
	cidade VARCHAR(50) NOT NULL,
	logradouro VARCHAR(50) NOT NULL,
	bairro VARCHAR(50) NOT NULL,
	cep VARCHAR(50) NOT NULL, 
	estado VARCHAR(50) NOT NULL,
	celular VARCHAR(50) NOT NULL,
	horario VARCHAR(50) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	CONSTRAINT pk_colaborador_sulagro PRIMARY KEY (cpf),
	CONSTRAINT uk_email_colaborador UNIQUE (email)
);

CREATE TABLE cliente (
	cnpj VARCHAR(50) NOT NULL,
  	nome VARCHAR(100) NOT NULL,
  	email VARCHAR(100) NOT NULL,
	razao_social VARCHAR(50) NOT NULL,
  	permissao INTEGER NOT NULL,
  	cidade VARCHAR(50) NOT NULL,
 	logradouro VARCHAR(50) NOT NULL,
  	bairro VARCHAR(50) NOT NULL,
	cep VARCHAR(50) NOT NULL, 
  	estado VARCHAR(50) NOT NULL,
  	celular VARCHAR(50) NOT NULL,
  	senha VARCHAR(255) NOT NULL,
  	CONSTRAINT pk_cliente PRIMARY KEY (cnpj),
  	CONSTRAINT uk_email_cliente UNIQUE (email)
);

CREATE TABLE protocolo (
	sigla VARCHAR(10) NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	CONSTRAINT pk_protocolo PRIMARY KEY (sigla)
);

CREATE TABLE contrato (
	num_contrato INTEGER NOT NULL,
	protocolo_num VARCHAR(10) NOT NULL,
	num_parcelas INTEGER NOT NULL,
	preco VARCHAR(50) NOT NULL,
	dt_assinatura VARCHAR(50) NOT NULL,
	dt_entrega VARCHAR(50) NOT NULL,
	cliente_cnpj VARCHAR(50) NOT NULL,
	CONSTRAINT pk_contrato PRIMARY KEY (num_contrato),
	CONSTRAINT fk_contrato_cliente FOREIGN KEY (cliente_cnpj) REFERENCES cliente(cnpj),
	CONSTRAINT fk_contrato_protocolo FOREIGN KEY (protocolo_num) REFERENCES protocolo(sigla)
);

CREATE TABLE pesquisa (
	cod SERIAL NOT NULL,
	dt_coleta VARCHAR(50) NOT NULL,
	dt_apl_prod VARCHAR(50) NULL,
	tm_plantas VARCHAR(50) NOT NULL,
	cor_folhas VARCHAR(50) NOT NULL,
	outros_prod VARCHAR(50) NULL,
	num_nos INTEGER NOT NULL,
	clima VARCHAR(50) NOT NULL,
	fase VARCHAR(50) NOT NULL,
	obs VARCHAR(1000) NULL,
	contrato INTEGER NOT NULL, 
	cpf_colaborador VARCHAR(50) NOT NULL,
	CONSTRAINT pk_pesquisa PRIMARY KEY (cod),
	CONSTRAINT fk_pesquisa_contrato FOREIGN KEY (contrato) REFERENCES contrato(num_contrato), 
	CONSTRAINT fk_pesquisa_colaborador FOREIGN KEY (cpf_colaborador) REFERENCES colaborador_sulagro(cpf)
);

---- População das tabelas Protocolo, Pesquisa e Contrato (Clientes e Funcionários são inseridos com json) ----

--Tabela Protocolo--

INSERT INTO protocolo (sigla, tipo)
VALUES
	('CL', 'Cultivar'),
	('FL', 'Folicular'),
	('NT', 'Nutrição'),
	('CPR', 'Controle de pragas'),
	('IRG', 'Irrigação'),
	('FRT', 'Fertilizante'),
	('HER', 'Herbicida'),
	('AQS', 'Análise química do solo'),
	('FNG', 'Controle de fungos'),
	('BIO', 'Bioestimulantes');
	

-- Tabela Contrato --

INSERT INTO contrato(num_contrato, protocolo_num, num_parcelas, preco, dt_assinatura, dt_entrega, cliente_cnpj)
VALUES
(1, 'CL', 12, '75000.00', '15/01/2024', '15/12/2024', '09876543210'),
(2, 'FL', 6, '85000.00', '01/02/2024', '01/07/2024', '88990011223'),
(3, 'NT', 18, '95000.00', '20/03/2024', '20/09/2025', '12345678901'),
(4, 'CPR', 10, '80000.00', '10/04/2024', '10/02/2025', '77889900112'),
(5, 'IRG', 8, '95000.00', '05/05/2024', '05/12/2024', '66778899001'),
(6, 'FRT', 14, '90000.00', '15/06/2024', '15/08/2025', '55667788990'),
(7, 'HER', 20, '95000.00', '01/07/2024', '01/07/2026', '44556677889'),
(8, 'AQS', 16, '98000.00', '10/08/2024', '10/12/2025', '22334455667'),
(9, 'FNG', 24, '99000.00', '15/09/2024', '15/09/2026', '11223344556'),
(10, 'BIO', 18, '87000.00', '01/10/2024', '01/10/2025', '09876543210'),
(11, 'CL', 30, '90000.00', '15/01/2024', '15/12/2024', '09876543210');


-- Tabela Pesquisa --

-- Pesquisa com cinco fases
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('15/01/2024', '10/01/2024', '30cm', 'Verde', 'Nenhum', 4, 'Chuvoso', 'fase1', 'Observação das plantas saudáveis', 1, '23456789001'),
('10/02/2024', '05/02/2024', '70cm', 'Amarela', 'Agrotóxico', 4, 'Chuvoso', 'fase2', 'Aplicação de defensivos', 1, '34567890123'),
('05/03/2024', '01/03/2024', '95cm', 'Verde escuro', 'Adubação', 5, 'Nublado', 'fase3', 'Ótimo Desenvolvimento', 1, '45678901234'),
('20/04/2024', '15/04/2024', '110cm', 'Verde claro', 'Nenhum', 6, 'Quente', 'fase4', 'Controle de irrigação', 1, '56789012345'),
('15/05/2024', '10/05/2024', '120cm', 'Verde', 'Nenhum', 7, 'Ensolarado', 'fase5', 'Pronto para a Colheita', 1, '78901234567');


-- Pesquisa com uma fase
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('15/01/2024', '10/01/2024', '30cm', 'Verde', 'Nenhum', 4, 'Quente e único', 'fase1', 'Plantas saudáveis e com crescimento superior às parcelas de controle', 2, '23456789001');


-- Pesquisa com duas fases
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('01/06/2024', '27/05/2024', '80cm', 'Verde claro', 'Nenhum', 5, 'Ensolarado', 'fase1', 'Plantas não estão apresentando o desenvolvimento esperado', 5, '23456789001'),
('10/07/2024', '05/07/2024', '95cm', 'Verde escuro', 'Adubação', 6, 'Chuvoso', 'fase2', 'Aplicação de fertilizantes', 5, '34567890123');


-- Pesquisa com três fases
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('15/06/2024', '10/06/2024', '70cm', 'Verde', 'Nenhum', 4, 'Ensolarado', 'fase1', 'Plantas se desenvolvendo conforme o esperado', 7, '23456789001'),
('05/07/2024', '30/06/2024', '90cm', 'Verde escuro', 'Adubação', 5, 'Chuvoso', 'fase2', 'Aplicação de fertilizantes', 7, '34567890123'),
('01/08/2024', '27/07/2024', '110cm', 'Amarela', 'Nenhum', 6, 'Nublado', 'fase3', 'Controle de irrigação em andamento', 7, '45678901234');


-- Pesquisa com quatro fases
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('20/06/2024', '15/06/2024', '60cm', 'Verde claro', 'Nenhum', 4, 'Frio', 'fase1', 'Plantas com bom desenvolvimento inicial', 8, '23456789001'),
('15/07/2024', '10/07/2024', '80cm', 'Verde', 'Agrotóxico', 5, 'Chuvoso', 'fase2', 'Aplicação de defensivos', 8, '34567890123'),
('10/08/2024', '05/08/2024', '100cm', 'Verde escuro', 'Nenhum', 6, 'Ensolarado', 'fase3', 'Plantas se desenvolvendo bem', 8, '45678901234'),
('05/09/2024', '01/09/2024', '120cm', 'Verde claro', 'Nenhum', 7, 'Quente', 'fase4', 'Fazendo acompanhamento para verificar a alteração na coloração das folhas', 8, '56789012345');


-- Pesquisa com mesmo protocolo e mesmo cliente
INSERT INTO pesquisa(dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador)
VALUES
('25/06/2024', '20/06/2024', '70cm', 'Verde claro', 'Nenhum', 4, 'Quente e úmido', 'fase1', 'Desenvolvimento saudável nas plantas', 11, '23456789001'),
('30/07/2024', '25/07/2024', '90cm', 'Verde escuro', 'Adubação', 5, 'Chuvoso', 'fase2', 'Aplicação de adubo', 11, '34567890123'),
('25/08/2024', '20/08/2024', '110cm', 'Verde claro', 'Nenhum', 6, 'Ensolarado', 'fase3', 'Plantas atingindo tamanho ideal', 11, '45678901234');

