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
const senha = "laranja02";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/sulagro`);

const server = express();

// Configuração de CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Permite requisições do frontend
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
          "SELECT email, senha FROM clientes WHERE email = $1;",
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
          "SELECT * FROM clientes WHERE email = $1;",
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
      "select cpf as identificador, email, senha, permissao from colaboradores where email = $1;",
      [email]
    );

    if (!user) {
      user = await db.oneOrNone(
        "select cnpj as identificador, email, senha, permissao from clientes where email = $1;",
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
          "INSERT INTO colaboradores (nome, cpf, email, celular, cargo, permissao, cidade, logradouro, bairro, cep, estado, horario, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
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
          FROM colaboradores 
          WHERE nome ILIKE $1 
          OR cpf ILIKE $1
          `,
          [`%${termoBusca}%`]
      );
      console.log('Resultado da consulta:', colaboradores);
      res.json(colaboradores);
  } catch (error) {
      console.error('Erro ao buscar colaboradores:', error.message);
      res.status(500).send("Erro no servidor");
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
      `UPDATE colaboradores 
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
      await db.none('DELETE FROM colaboradores WHERE cpf = $1', [cpf]);
      res.json({ message: 'Colaborador excluído com sucesso!' });
  } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
      res.status(500).json({ message: 'Erro ao excluir colaborador!' });
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
          "insert  into clientes (nome, cnpj, email, celular, razao_social, cidade, logradouro, bairro, cep, estado, permissao, senha) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
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
          "select nome, cnpj, email, celular, razao_social from clientes where cnpj = $1;",
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
      const clientes = await db.any("select cnpj, razao_social from clientes");
      res.status(200).json(clientes);
  } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});


server.get("/protocolos", async (req, res) => {
  try {
    const protocolos = await db.any("select sigla, tipo from protocolo");
    res.status(200).json(protocolos);
  } catch (error) {
    console.error("Erro ao buscar protocolos:", error);
    res.status(500).json({ message: "Erro ao buscar protocolos" });
}
});


server.get("/ver-contrato", async (req, res) => {
  try { 
      const { cliente_cnpj, protocolo_sigla } = req.query;

      const protocolo = await db.oneOrNone("select sigla from protocolo", [protocolo_sigla]);
      if (!protocolo) {
        return res.status(404).json({ message: "Protocolo não encontrado." });
      }

      const contrato = await db.any(
        "select num_contrato, num_parcelas, preco, dt_assinatura, dt_entrega " +
        "FROM contrato WHERE cliente_cnpj = $1 AND protocolo_num = $2;",
        [cliente_cnpj, protocolo_sigla] 
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


/*
server.post("/incluir-pesquisa", async (req, res) => {
  try {
    const {
      num_contrato,
      dt_assinatura,
      dt_entrega,
      preco,
      num_parcelas,
      cliente_cnpj,
      protocolo_num,
    } = req.body;

    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const responsavel = decoded.identificador;

    await db.none(
      "insert into pesquisa (num_contrato, dt_assinatura, dt_entrega, preco, num_parcelas, cliente_cnpj, protocolo_num, responsavel) values ($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        num_contrato,
        dt_assinatura,
        dt_entrega,
        preco,
        num_parcelas,
        cliente_cnpj,
        protocolo_num,
        responsavel,
      ]
    );

    console.log("Informações de pesquisa adicionadas com sucesso!");
    res.status(200).json({ message: "Informações de pesquisa adicionadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar pesquisa", error);
    res.status(400).json({ message: "Erro ao adicionar pesquisa" });
  }
});
*/

server.post("/incluir-etapa-pesquisa", async (req, res) => {
  try {
    const {
      dt_coleta,
      dt_apl_prod,
      tm_plantas,
      cor_folhas,
      outros_prod,
      clima,
      fase,
      obs,
      psq_contratada,
      num_nos,
      cliente_cnpj,
      protocolo_sigla,
    } = req.body;

    await db.none(
      `insert into etapas_pesquisa 
      (dt_coleta, dt_apl_prod, tm_plantas, cor_folhas, outros_prod, clima, fase, obs, psq_contratada, num_nos, cliente_cnpj, protocolo_sigla) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
      [
        dt_coleta,
        dt_apl_prod,
        tm_plantas,
        cor_folhas,
        outros_prod,
        clima,
        fase,
        obs,
        psq_contratada,
        num_nos,
        cliente_cnpj,
        protocolo_sigla,
      ]
    );

    console.log("Etapa de pesquisa adicionada com sucesso!");
    res.status(200).json({ message: "Etapa de pesquisa adicionada com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar etapa de pesquisa:", error);
    res.status(400).json({ message: "Erro ao adicionar etapa de pesquisa." });
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

