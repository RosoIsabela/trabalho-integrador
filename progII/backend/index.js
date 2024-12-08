require('dotenv').config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const pgp = require("pg-promise")({});
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");


//conexao com o banco
const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const db = pgp(`postgres://${usuario}:${senha}@${dbHost}:${dbPort}/${dbName}`);

const server = express();

// Configuração de CORS
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

db.connect()
  .then(obj => {
    console.log("Conexão bem-sucedida com o banco de dados!");
    obj.done(); // libera a conexão
  })
  .catch(error => {
    console.error("Erro ao conectar ao banco:", error);
});

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configuração do express-session
server.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Altere para true se usar HTTPS em produção
  })
);
server.use(passport.initialize());
server.use(passport.session());


// Estratégia Local com Passport para autenticação
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Busca o usuário no banco de dados
        const user = await db.oneOrNone(
          "SELECT email, senha FROM cliente WHERE email = $1;",
          [username]
        );

        if (!user) {
          return done(null, false, { message: "Usuário não encontrado." });
        }

        // Verifica a senha
        const passwordMatch = await bcrypt.compare(password, user.senha);

        if (passwordMatch) {
          console.log("Usuário autenticado!");
          return done(null, user);
        } else {
          return done(null, false, { message: "Senha incorreta." });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estratégia JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db.oneOrNone(
          "SELECT * FROM cliente WHERE email = $1;",
          [payload.email]
        );

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });


const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Token ausente" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.identificador) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    res.status(403).json({ message: "Token expirado ou inválido" });
  }
};

module.exports = { authenticateToken };

// Rotas do servidor

// Rota de login funcionario
server.post("/tela-login-principal", async (req, res) => {
  const { email, senha } = req.body;

  try {
    let user;

    //busca usuario na tabela de colaborador, se nao encontrar busca na de clientes
    user = await db.oneOrNone(
      "select cpf as identificador, email, senha, permissao from colaborador_sulagro where email = $1;",
      [email]
    );

    if (!user) {
      user = await db.oneOrNone(
        "select cnpj as identificador, email, senha, permissao from cliente where email = $1;",
        [email]
      );
    }
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

   
    //verifica se a senha é valida usando bcrypt
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

     //gerando token com identificador(cpf ou cnpj) e-mail e permissão
      const token = jwt.sign(
      {
        identificador: user.identificador,
        email: user.email,
        permissao: user.permissao,
      },
          JWT_SECRET,
          { expiresIn: "5h" }
      );

    //retorna o token gerado
    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

server.put("/tela-esqueceu-senha", async (req, res) => {
  const { email, identificador, novasenha } = req.body;

  try {
    // Verifica se todos os campos foram preenchidos
    if (!email || !identificador || !novasenha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    //criptografa a nova senha
    const hashedPassword = await bcrypt.hash(novasenha, 10);

    let user;

    //tenta atualizar na tabela de colaboradores
    user = await db.result(
      "update colaborador_sulagro set senha = $1 where email = $2 and cpf = $3",
      [hashedPassword, email, identificador]
    );

    if (user.rowCount === 0) {
      // Se não encontrou no colaborador, tenta na tabela de clientes
      user = await db.result(
        "update cliente set senha = $1 where email = $2 and cnpj = $3",
        [hashedPassword, email, identificador]
      );
    }

    if (user.rowCount === 0) {
      // Se nenhum registro foi atualizado, retorna erro
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Retorna sucesso
    res.json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});


// seleção de cliente para a tela inicial do funcionário
server.get("/clientes", async (req, res) => {
  try {
      const clientes = await db.any("select cnpj, razao_social from cliente");
      res.status(200).json(clientes);
  } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});

// seleção de contrato para a tela inicial do funcionario

server.get('/contratos/:clienteCnpj', async (req, res) => {
  const clienteCnpj = req.params.clienteCnpj;

  try {
    const contratos = await db.any("SELECT num_contrato, protocolo_num FROM contrato WHERE cliente_cnpj = $1", [clienteCnpj]);
    
    res.status(200).json(contratos); 
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    res.status(500).json({ message: "Erro ao buscar contratos" });
  }
});

// Atualização da data final de entrega do dashboard do profissional
server.get('/contratos/:clienteCnpj/:contratoNum', async (req, res) => {
  try {
    const { clienteCnpj, contratoNum } = req.params;

    const contrato = await db.oneOrNone(
      `SELECT dt_entrega
       FROM contrato 
       WHERE cliente_cnpj = $1 AND num_contrato = $2;`,
      [clienteCnpj, contratoNum]
    );

    if (!contrato) {
      return res.status(404).json({ message: "Contrato não encontrado." });
    }

    res.status(200).json({ contrato });
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
    res.status(500).json({ message: "Erro ao buscar contrato." });
  }
});


// Atualização do checklist das fases da pesquisa
server.get('/pesquisas/fase-maior/:clienteCnpj/:contratoNum', async (req, res) => {
  try {
    const { clienteCnpj, contratoNum } = req.params;

    const resultado = await db.oneOrNone(
      `SELECT MAX(CAST(REGEXP_REPLACE(fase, '\\D', '', 'g') AS INTEGER)) AS maior_fase
       FROM pesquisa p
       JOIN contrato c ON p.contrato = c.num_contrato
       WHERE c.cliente_cnpj = $1 AND c.num_contrato = $2;`,
      [clienteCnpj, contratoNum]
    );

    if (!resultado || resultado.maior_fase === null) {
      return res.status(404).json({ 
        message: "Nenhuma fase encontrada para o contrato e cliente especificados." 
      });
    }

    res.status(200).json({ maiorFase: resultado.maior_fase });
  } catch (error) {
    console.error("Erro ao buscar a maior fase:", error);
    res.status(500).json({ 
      message: "Erro ao buscar a maior fase da pesquisa." 
    });
  }
});




//rota para criar um colaborador
server.post("/create-colaborador", async (req, res) => {
  const saltRounds = 10; // Número de rounds para o salt
  try {
      const {
          nome,
          cpf,
          email,
          celular,
          cargo,
          logradouro,
          bairro,
          cidade,
          estado,
          cep,
          permissao,
          horario,
          senha
      } = req.body;

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPasswd = bcrypt.hashSync(senha, salt);

      await db.none(
        `INSERT INTO colaborador_sulagro 
        (cpf, nome, email, celular, cargo, permissao, cidade, logradouro, bairro, cep, estado, horario, senha) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        [
            cpf,
            nome,
            email,
            celular,
            cargo,
            permissao,
            cidade,
            logradouro,
            bairro,
            cep,
            estado,
            horario,
            hashedPasswd
        ]
    );

    console.log("Colaborador criado com sucesso!");
    res.status(200).json({ message: "Colaborador criado com sucesso!" });
} catch (error) {

    console.error("Erro ao criar colaborador:", error);
    res.status(500).json({ message: "Erro ao criar colaborador.", error });
}
});



// Rota para procurar um colaborador
server.get('/buscar_funcionario', async (req, res) => {
  console.log('Requisição recebida em /buscar_funcionario');
  const termoBusca = req.query.search;
  console.log('Parâmetro search:', termoBusca);

  try {
      const colaboradores = await db.any(
          `
          SELECT * 
          FROM colaborador_sulagro 
          WHERE nome ILIKE $1 
          OR cpf ILIKE $1
          `,
          [`%${termoBusca}%`]
      );

      if (colaboradores.length > 0) {
          res.json({ status: 'encontrado', data: colaboradores });
      } else {
          res.json({ status: 'não encontrado', message: 'Nenhum colaborador encontrado.' });
      }
  } catch (error) {
      console.error('Erro ao buscar colaboradores:', error.message);
      res.status(500).json({ status: 'error', message: 'Erro no servidor.' });
  }
});

// Atualizar colaborador
server.put('/update-colaborador/:cpf', async (req, res) => {
  const { cpf } = req.params;
  let {
    nome,
    email,
    celular,
    cargo,
    logradouro,
    bairro,
    cidade,
    estado,
    cep,
    permissao,
    horario,
    senha,
  } = req.body;

  try {
    // Atualiza a senha apenas se ela for enviada
    if (senha) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      senha = bcrypt.hashSync(senha, salt);
    }

    await db.none(
      `UPDATE colaborador_sulagro 
       SET nome = COALESCE($1, nome), 
           email = COALESCE($2, email), 
           celular = COALESCE($3, celular), 
           cargo = COALESCE($4, cargo), 
           logradouro = COALESCE($5, logradouro), 
           bairro = COALESCE($6, bairro), 
           cidade = COALESCE($7, cidade), 
           estado = COALESCE($8, estado), 
           cep = COALESCE($9, cep), 
           permissao = COALESCE($10, permissao), 
           horario = COALESCE($11, horario), 
           senha = COALESCE($12, senha)
       WHERE cpf = $13`,
      [nome, email, celular, cargo, logradouro, bairro, cidade, estado, cep, permissao, horario, senha, cpf]
    );

    res.json({ message: 'Colaborador atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    res.status(500).json({ message: 'Erro ao atualizar colaborador!' });
  }
});


// Excluir colaborador
server.delete('/delete-colaborador/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
      await db.none('DELETE FROM colaborador_sulagro WHERE cpf = $1', [cpf]);
      res.json({ message: 'Colaborador excluído com sucesso!' });
  } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
      res.status(500).json({ message: 'Erro ao excluir colaborador!' });
  }
});


server.get("/perfilProfissional", authenticateToken, async (req, res) => {
  try {
      const userCPF = req.user.identificador; 
      const colaborador = await db.oneOrNone(
          "select nome, cpf, email, celular, cargo, horario from colaborador_sulagro where cpf = $1;",
          [userCPF]
      );

      if (!colaborador) {
          return res.status(404).json({ message: "Colaborador não encontrado." });
      }

      res.status(200).json({ colaborador });
  } catch (error) {
      console.error("Erro ao buscar perfil profissional:", error);
      res.status(500).json({ message: "Erro ao buscar perfil profissional." });
  }
});


//rota para criar um cliente
server.post("/create-cliente", async (req, res) => {
  const saltRounds = 10; // Número de rounds para o salt
  try {
      const {
        nome,
        cnpj,
        email,
        celular,
        razao_social,
        cidade,
        logradouro,
        bairro,
        estado,
        cep,
        senha,
      } = req.body;

      const permissao = 0; 

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPasswd = bcrypt.hashSync(senha, salt);

      await db.none(
          "insert into cliente (nome, cnpj, email, celular, razao_social, permissao, cidade, logradouro, bairro, cep, estado, senha) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
          [
              nome,
              cnpj,
              email,
              celular,
              razao_social,
              permissao,
              cidade,
              logradouro,
              bairro,
              estado,
              cep,
              hashedPasswd
          ]
      );

      console.log("Cliente criado com sucesso!");
      res.status(200).json({ message: "Cliente criado com sucesso!" });
  } catch (error) {
      console.error("Erro ao criar cliente:", error);
      res.status(400).json({ message: "Erro ao criar cliente" });
  }
});

// Rota para procurar um cliente
server.get('/buscar_cliente', async (req, res) => {
  console.log('Requisição recebida em /buscar_cliente');
  const termoBusca = req.query.search;
  console.log('Parâmetro search:', termoBusca);

  try {
      const cliente = await db.any(
          `
          SELECT * 
          FROM cliente 
          WHERE nome ILIKE $1 
          OR cnpj ILIKE $1
          OR razao_social ILIKE $1
          `,
          [`%${termoBusca}%`]
      );

      if (cliente.length > 0) {
          res.json({ status: 'encontrado', data: cliente });
      } else {
          res.json({ status: 'não encontrado', message: 'Nenhum cliente encontrado.' });
      }
  } catch (error) {
      console.error('Erro ao buscar cclientes:', error.message);
      res.status(500).json({ status: 'error', message: 'Erro no servidor.' });
  }
});


server.get("/perfilCliente", authenticateToken, async (req, res) => {
  try {
      const userCNPJ = req.user.identificador; 
      const cliente = await db.oneOrNone(
          "select nome, cnpj, email, celular, razao_social from cliente where cnpj = $1;",
          [userCNPJ]
      );

      if (!cliente) {
          return res.status(404).json({ message: "Cliente não encontrado." });
      }

      res.status(200).json({ cliente });
  } catch (error) {
      console.error("Erro ao buscar perfil cliente:", error);
      res.status(500).json({ message: "Erro ao buscar perfil cliente." });
  }
});

// Atualizar cliente
server.put('/update-cliente/:cnpj', async (req, res) => {
  const { cnpj } = req.params;
  let {
        nome,
        email,
        celular,
        razao_social,
        cidade,
        logradouro,
        bairro,
        estado,
        cep,
        senha,
  } = req.body;

  try {
    // Atualiza a senha apenas se ela for enviada
    if (senha) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      senha = bcrypt.hashSync(senha, salt);
    }

    await db.none(
      `UPDATE cliente
       SET nome = COALESCE($1, nome), 
           email = COALESCE($2, email), 
           celular = COALESCE($3, celular), 
           razao_social = COALESCE($4, razao_social), 
           cidade = COALESCE($5, cidade),
           logradouro = COALESCE($6, logradouro), 
           bairro = COALESCE($7, bairro), 
           estado = COALESCE($8, estado), 
           cep = COALESCE($9, cep),            
           senha = COALESCE($10, senha)
       WHERE cnpj = $11`,
      [ nome, email, celular, razao_social, cidade, logradouro, bairro, estado, cep, senha, cnpj]
    );

    res.json({ message: 'Colaborador atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    res.status(500).json({ message: 'Erro ao atualizar colaborador!' });
  }
});


// Excluir cliente
server.delete('/delete-cliente/:cnpj', async (req, res) => {
  const { cnpj } = req.params;

  try {
      await db.none('DELETE FROM cliente WHERE cnpj = $1', [cnpj]);
      res.json({ message: 'Cliente excluído com sucesso!' });
  } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      res.status(500).json({ message: 'Erro ao excluir cliente!' });
  }
});


server.get("/clientes", async (req, res) => {
  try {
      const clientes = await db.any("select cnpj, razao_social from cliente");
      res.status(200).json(clientes);
  } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});


// Rota para buscar todos os colaboradores
server.get("/colaboradores", async (req, res) => {
  try {
      const colaboradores = await db.any("SELECT cpf, nome FROM colaborador_sulagro");
      res.status(200).json(colaboradores);
  } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
      res.status(400).json({ message: "Erro ao buscar colaboradores" });
  }
});


// Rota para buscar todos os protocolo
server.get("/protocolos", async (req, res) => {
  try {
    const protocolos = await db.any("select sigla, tipo from protocolo");
    res.status(200).json(protocolos);
  } catch (error) {
    console.error("Erro ao buscar protocolos:", error);
    res.status(500).json({ message: "Erro ao buscar protocolos" });
}
});


// Rota para buscar todos os contratos
server.get("/contratos", async (req, res) => {
  try {
      const contratos = await db.any("select num_contrato from contrato");
      res.status(200).json(contratos);
  } catch (error) {
      console.error("Erro ao buscar contratos:", error);
      res.status(400).json({ message: "Erro ao buscar contratos" });
  }
});

// Rotas dashboard do cliente

// Rota para buscar informações do contrato do cliente
server.get("/contratos-cliente/:numContrato", authenticateToken, async (req, res) => {
  try {
    const cnpjCliente = req.user.identificador; 
    const { numContrato } = req.params;

    const contratos = await db.any(
      `SELECT num_contrato, num_parcelas, preco, dt_entrega 
       FROM contrato 
       WHERE cliente_cnpj = $1 AND num_contrato = $2`, 
      [cnpjCliente, numContrato]
    );

    if (contratos.length === 0) {
      return res.status(404).json({ message: "Nenhum contrato encontrado para este cliente." });
    }

    res.status(200).json(contratos[0]); 
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    res.status(500).json({ message: "Erro ao buscar contratos" });
  }
});

// Rota para recuperar o número da fase da pesquisa que é utilizado na construção do gráfico

server.get('/pesquisas/fase-maior/:contratoNum', async (req, res) => {
  try {
    const { contratoNum } = req.params;

    const resultado = await db.oneOrNone(
      `SELECT MAX(CAST(REGEXP_REPLACE(fase, '\\D', '', 'g') AS INTEGER)) AS maior_fase
       FROM pesquisa p
       JOIN contrato c ON p.contrato = c.num_contrato
       WHERE c.num_contrato = $1;`,
      [contratoNum]
    );

    if (!resultado || resultado.maior_fase === null) {
      return res
        .status(404)
        .json({ message: 'Nenhuma fase encontrada para o contrato especificado.' });
    }

    res.status(200).json({ maiorFase: resultado.maior_fase });
  } catch (error) {
    console.error('Erro ao buscar a maior fase:', error);
    res.status(500).json({ message: 'Erro ao buscar a maior fase da pesquisa.' });
  }
});


// Rota para buscar os últimos dados coletados da pesquisa
server.get('/pesquisas/ultimos-dados/:contratoNum', async (req, res) => {
  try {
    const { contratoNum } = req.params;

    const resultado = await db.oneOrNone(
      `SELECT dt_coleta, tm_plantas, cor_folhas, num_nos, clima
       FROM pesquisa
       WHERE contrato = $1
       ORDER BY fase DESC
       LIMIT 1`, 
      [contratoNum]
    );

    if (!resultado) {
      return res.status(404).json({ message: 'Nenhum dado encontrado para o contrato especificado.' });
    }

    res.status(200).json({
      data_coleta: resultado.dt_coleta,
      tamanho_plantas: resultado.tm_plantas,
      coloracao_folhas: resultado.cor_folhas,
      num_nos: resultado.num_nos,
      clima: resultado.clima,
    });
  } catch (error) {
    console.error('Erro ao buscar os últimos dados:', error);
    res.status(500).json({ message: 'Erro ao buscar os últimos dados da pesquisa.' });
  }
});



//-----Fim rotas dashboard cliente ---


// Rota para buscar todos os contratos do cliente
server.get("/contratos-cliente", authenticateToken, async (req, res) => {
  try {
    const cnpjCliente = req.user.identificador; 

    const contratos = await db.any(
      `SELECT num_contrato FROM contrato WHERE cliente_cnpj = $1`, 
      [cnpjCliente]
    );

    if (contratos.length === 0) {
      return res.status(404).json({ message: "Nenhum contrato encontrado para este cliente." });
    }

    res.status(200).json(contratos);

  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    res.status(400).json({ message: "Erro ao buscar contratos" });
  }
});



server.get("/ver-contrato", async (req, res) => {
  try { 
      const { cliente_cnpj, protocolo_num, num_contrato } = req.query;

      const protocolo = await db.oneOrNone("select sigla, tipo from protocolo where sigla = $1", protocolo_num);
      if (!protocolo) {
        return res.status(404).json({ message: "Protocolo não encontrado." });
      }

      const contrato = await db.any(
        "select num_contrato, num_parcelas, preco, dt_assinatura, dt_entrega from contrato where cliente_cnpj = $1 and protocolo_num = $2 and num_contrato = $3;",
        [cliente_cnpj, protocolo_num, num_contrato] 
     );

      if (!contrato || contrato.length === 0) {
          return res.status(404).json({ message: "Contrato não encontrado." });
      }

      res.status(200).json({ contrato });
  } catch (error) {
      console.error("Erro ao buscar contrato:", error);
      res.status(500).json({ message: "Erro ao buscar contrato." });
  }
});


server.get("/ver-contrato-cliente", async (req, res) => {
  try {
    const { protocolo_num, num_contrato } = req.query;

    if (!protocolo_num || !num_contrato) {
      return res.status(400).json({ message: "Parâmetros obrigatórios ausentes." });
    }

    const protocolo = await db.oneOrNone("select sigla, tipo from protocolo where sigla = $1", protocolo_num);
    if (!protocolo) {
      return res.status(404).json({ message: "Protocolo não encontrado." });
    }

    const contrato = await db.any(
      `SELECT num_contrato, num_parcelas, preco, dt_assinatura, dt_entrega FROM contrato WHERE protocolo_num = $1 AND num_contrato = $2;`,
      [protocolo_num, num_contrato]
    );

    if (!contrato || contrato.length === 0) {
      return res.status(404).json({ message: "Contrato não encontrado." });
    }

    const formattedContract = contrato[0]; 
    res.status(200).json({ contrato: [formattedContract] });

  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
    res.status(500).json({ message: "Erro ao buscar contrato." });
  }
});


server.post("/cadastrar-protocolo", async (req, res) => {
  try {
    const { sigla, tipo } = req.body; 

    if (!sigla || !tipo) {
        return res.status(400).json({error: "Sigla e tipo são obrigatórios."});
    }

    await db.oneOrNone(
      "insert into protocolo (sigla, tipo) values ($1, $2);", 
      [sigla, tipo]
    );
      
    res.status(201).json({message: 'Protocolo cadastrado com sucesso!'});
  } catch (error) {
      console.error("Erro ao cadastrar protocolo:", error);
      res.status(500).json({error: "Erro ao cadastrar protocolo."});
    }
});


server.post("/cadastrar-contrato", async (req, res) => {
  try {
    const {
      num_contrato,
      protocolo_num,
      num_parcelas,
      preco,
      dt_assinatura,
      dt_entrega,
      cliente_cnpj
    } = req.body;


    // Buscar a sigla do protocolo
    const protocoloData = await db.oneOrNone("select sigla, tipo from protocolo where sigla = $1", protocolo_num); 

    if (!protocoloData) {
        return res.status(400).json({ message: "Protocolo não encontrado." });
    }


    await db.none(
      "insert into contrato (num_contrato, protocolo_num, num_parcelas, preco, dt_assinatura, dt_entrega, cliente_cnpj) values ($1, $2, $3, $4, $5, $6, $7);",
      [
        num_contrato,
        protocoloData.sigla, 
        num_parcelas,
        preco,
        dt_assinatura,
        dt_entrega,
        cliente_cnpj
      ]
    );

    console.log("Contrato cadastrado com sucesso!");
    res.status(200).json({ message: "Contrato cadastrado com sucesso!" });

  } catch(error){
      console.error("Erro ao cadastrar contrato", error);
      res.status(400).json({ message: "Erro ao cadastrar contrato" });
  }
});


server.put('/alterar-contrato/:cliente_cnpj/:protocolo_num/:num_contrato', async (req, res) => {
  const { cliente_cnpj, protocolo_num } = req.params;
  const { 
    dataContrato, 
    dataEntrega, 
    custo, 
    parcelas 
  } = req.body;

  try {
    await db.none(
      `UPDATE contrato
        SET dt_assinatura = COALESCE($1, dt_assinatura),
            dt_entrega = COALESCE($2, dt_entrega),
            preco = COALESCE($3, preco),
            num_parcelas = COALESCE($4, num_parcelas)
        WHERE cliente_cnpj = $5 AND protocolo_num = $6`,
      [dataContrato, dataEntrega, custo, parcelas, cliente_cnpj, protocolo_num]
    );

      res.json({ message: 'Contrato atualizado com sucesso!' });
  } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      res.status(500).json({ message: 'Erro ao atualizar contrato!' });
  }
});


server.delete("/excluir-contrato/:num_contrato", async (req, res) => {
  try {
    const { num_contrato } = req.params;

    await db.none("DELETE FROM contrato WHERE num_contrato = $1;", [num_contrato]);

    res.status(200).json({ message: "Contrato excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir contrato", error);
    res.status(400).json({ message: "Erro ao excluir contrato" });
  }
});


server.post("/incluir-etapa-pesquisa", async (req, res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);

    const {
      dt_coleta,
      dt_apl_prod,
      tm_plantas,
      cor_folhas,
      outros_prod,
      num_nos,
      clima,
      fase,
      obs,
      contrato,
      cpf_colaborador,
    } = req.body;

    // tratando os campos null
    const normalizarCampo = (campo) => (campo === undefined || campo === "" ? null : campo);

    const valoresTratados = {
      dt_coleta,
      dt_apl_prod: normalizarCampo(dt_apl_prod),
      tm_plantas,
      cor_folhas,
      outros_prod: normalizarCampo(outros_prod),
      num_nos,
      clima,
      fase,
      obs: normalizarCampo(obs),
      contrato,
      cpf_colaborador,
    };

    console.log("Valores tratados para inserção:", valoresTratados);

    await db.none(
      `INSERT INTO pesquisa 
      (dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato, cpf_colaborador) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
      [
        valoresTratados.dt_coleta,
        valoresTratados.dt_apl_prod,
        valoresTratados.tm_plantas,
        valoresTratados.cor_folhas,
        valoresTratados.outros_prod,
        valoresTratados.num_nos,
        valoresTratados.clima,
        valoresTratados.fase,
        valoresTratados.obs,
        valoresTratados.contrato,
        valoresTratados.cpf_colaborador,
      ]
    );

    console.log("Etapa de pesquisa adicionada com sucesso!");
    res.status(200).json({ message: "Etapa de pesquisa adicionada com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar etapa de pesquisa:", error.message || error);
    res.status(400).json({ message: "Erro ao adicionar etapa de pesquisa.", error });
  }
});



server.get("/ver-pesquisa/:contrato/:fase", async (req, res) => {
  try {
    const { contrato, fase } = req.params;

    const pesquisa = await db.any(
      `select * from pesquisa where contrato = $1 and fase = $2`, 
      [contrato, fase]
    );

    if (pesquisa.length > 0) {
      res.status(200).json({ pesquisa });
    } else {
      res.status(404).json({ message: "Pesquisa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao buscar pesquisa:", error);
    res.status(500).json({ message: "Erro ao buscar pesquisa." });
  }
});

// Rota para buscar todos os relatorios (pesquisas)
server.get("/contratos", async (req, res) => {
  try {
      const contratos = await db.any("select cod from pesquisa");
      res.status(200).json(contratos);
  } catch (error) {
      console.error("Erro ao buscar pesquisa:", error);
      res.status(400).json({ message: "Erro ao buscar pesquisa" });
  }
});

//rota para encontrar relatorio com base na fase e numero do contrato 
server.get("/relatorios/:fase/:contrato", async (req, res) => {
  const { fase, contrato } = req.params; // Captura os parâmetros da URL
  try {
      // Consulta no banco de dados utilizando os parâmetros fase e contrato
      const relatorio = await db.any(
          "SELECT * FROM pesquisa WHERE fase = $1 AND contrato = $2", 
          [fase, contrato]  // Passando os valores dos parâmetros para a consulta
      );
      
      // Retorna os resultados encontrados
      if (relatorio.length === 0) {
          return res.status(404).json({ message: "Relatório não encontrado." });
      }

      res.status(200).json(relatorio);  // Retorna os dados do relatório
  } catch (error) {
      console.error("Erro ao buscar relatorios:", error);
      res.status(500).json({ message: "Erro ao buscar relatorios" });
  }
});

// Rota para listar os funcionários cadastrados

server.get("/listar_colaboradores", async (req, res) => {
  try {
    // Consulta os colaboradores (nome e cpf)
    const colaboradores = await db.any("SELECT cpf, nome FROM colaborador_sulagro");

    // Retorna os dados dos colaboradores
    res.status(200).json(colaboradores);
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    res.status(400).json({ message: "Erro ao buscar colaboradores" });
  }
});


server.put('/alterar-relatorio/:fase/:contrato', async (req, res) => {
  const { fase, contrato } = req.params; 
  const { 
      dtColeta, 
      dtAplicacao, 
      tamanho, 
      corFolhas, 
      outrosProdutos, 
      numeroNos, 
      clima, 
      observacao, 
  } = req.body;

  // Função para tratar os campos nulos
  const normalizarCampo = (campo) => (campo === undefined || campo === "" ? null : campo);

  try {

    const valoresTratados = {
          dt_coleta: normalizarCampo(dtColeta),
          dt_apl_prod: normalizarCampo(dtAplicacao),
          tm_plantas: tamanho,
          cor_folhas: corFolhas,
          outros_prod: normalizarCampo(outrosProdutos),
          num_nos: numeroNos,
          clima,
          obs: normalizarCampo(observacao)
      };

      await db.none(
          `UPDATE pesquisa 
              SET dt_coleta = COALESCE($1, dt_coleta),
                  dt_apl_prod = COALESCE($2, dt_apl_prod),
                  tm_plantas = COALESCE($3, tm_plantas),
                  cor_folhas = COALESCE($4, cor_folhas),
                  outros_prod = COALESCE($5, outros_prod),
                  num_nos = COALESCE($6, num_nos),
                  clima = COALESCE($7, clima),
                  obs = COALESCE($8, obs)
              WHERE fase = $9 AND contrato = $10`,
          [
              valoresTratados.dt_coleta,
              valoresTratados.dt_apl_prod,
              valoresTratados.tm_plantas,
              valoresTratados.cor_folhas,
              valoresTratados.outros_prod,
              valoresTratados.num_nos,
              valoresTratados.clima,
              valoresTratados.obs,
              fase,
              contrato
          ] 
      );

      res.json({ message: 'Relatório atualizado com sucesso!' });
  } catch (error) {
      console.error('Erro ao atualizar relatório:', error);
      res.status(500).json({ message: 'Erro ao atualizar relatório!', error: error.message });
  }
});




server.delete("/excluir-relatorio/:fase", async (req, res) => {
  try {
    const { fase } = req.params;

    await db.none("DELETE FROM pesquisa WHERE fase = $1;", [fase]);

    res.status(200).json({ message: "Relatório excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir relatório", error);
    res.status(400).json({ message: "Erro ao excluir relatório" });
  }
});


server.post("/logout", function (req, res) {
  req.logout(function (err) {
      if (err) {
          return res.status(500).json({ message: "Erro ao fazer logout" });
      }
      res.status(200).json({ message: "Logout realizado com sucesso" });
  });
});