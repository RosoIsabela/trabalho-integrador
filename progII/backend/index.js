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

// Conexão com o banco
const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/sulagro`);

const server = express();

// Configuração de CORS
const corsOptions = {
  origin: "http://localhost:5173", // Permite requisições do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

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


// Inicialização do servidor
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


db.connect()
  .then(obj => {
    console.log("Conexão bem-sucedida com o banco de dados!");
    obj.done(); // libera a conexão
  })
  .catch(error => {
    console.error("Erro ao conectar ao banco:", error);
});


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
      `SELECT MAX(fase) AS maior_fase
       FROM pesquisa p
       JOIN contrato c ON p.contrato = c.num_contrato
       WHERE c.cliente_cnpj = $1 AND c.num_contrato = $2;`,
      [clienteCnpj, contratoNum]
    );

    if (!resultado || resultado.maior_fase === null) {
      return res.status(404).json({ message: "Nenhuma fase encontrada para o contrato e cliente especificados." });
    }

    res.status(200).json({ maiorFase: resultado.maior_fase });
  } catch (error) {
    console.error("Erro ao buscar a maior fase:", error);
    res.status(500).json({ message: "Erro ao buscar a maior fase da pesquisa." });
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
          "insert into colaborador_sulagro (nome, cpf, email, celular, cargo, permissao, cidade, logradouro, bairro, cep, estado, horario, senha) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
          [
              nome,
              cpf,
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
      res.status(400).json({ message: "Erro ao criar colaborador" });
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
        nome_completo: nome,
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
          "insert into cliente (nome, cnpj, email, celular, razao_social, cidade, logradouro, bairro, cep, estado, permissao, senha) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
          [
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
              permissao,
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


server.get("/ver-contrato", async (req, res) => {
  try { 
      const { cliente_cnpj, protocolo_sigla, num_contrato } = req.query;

      const protocolo = await db.oneOrNone("select sigla from protocolo", [protocolo_sigla]);
      if (!protocolo) {
        return res.status(404).json({ message: "Protocolo não encontrado." });
      }

      const contrato = await db.any(
        "select num_contrato, num_parcelas, preco, dt_assinatura, dt_entrega from contrato where cliente_cnpj = $1 and protocolo_num = $2 and num_contrato = $3;",
        [cliente_cnpj, protocolo_sigla, num_contrato] 
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
      protocolo,
      num_parcelas,
      preco,
      dt_assinatura,
      dt_entrega,
      cliente_cnpj
    } = req.body;


    // Buscar a sigla do protocolo
    const protocoloData = await db.oneOrNone("SELECT sigla FROM protocolo", [protocolo]);
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
  const { cliente_cnpj, protocolo_num, num_contrato } = req.params;
  const { 
    contrato, 
    dataContrato, 
    dataEntrega, 
    custo, 
    parcelas 
  } = req.body;

  try {
      await db.none(
          `update contrato 
           set num_contrato = COALESCE($1, num_contrato),
               dt_assinatura = COALESCE($2, dt_assinatura),
               dt_entrega = COALESCE($3, dt_entrega),
               preco = COALESCE($4, preco),
               num_parcelas = COALESCE($5, num_parcelas)
           where cliente_cnpj = $6 and protocolo_num = $7`,
          [contrato, dataContrato, dataEntrega, custo, parcelas, cliente_cnpj, protocolo_num, num_contrato]
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
    } = req.body;

    await db.none(
      `insert into pesquisa 
      (dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, num_nos, clima, fase, obs, contrato) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
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
      ]
    );

    console.log("Etapa de pesquisa adicionada com sucesso!");
    res.status(200).json({ message: "Etapa de pesquisa adicionada com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar etapa de pesquisa:", error);
    res.status(400).json({ message: "Erro ao adicionar etapa de pesquisa." });
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