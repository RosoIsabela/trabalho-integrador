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
const senha = "XXXXXX";
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
          "SELECT email, senha FROM colaborador WHERE email = $1;",
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
          "SELECT * FROM colaborador WHERE email = $1;",
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

// Rotas do servidor

// Rota de login
server.post("/tela-login-principal", async (req, res) => {
  const { email, senha } = req.body;

  try {
      // Busca o usuário no banco de dados, incluindo a permissão
    const user = await db.oneOrNone(
          "SELECT email, senha, permissao FROM clientes WHERE email = $1;",
      [email]
    );

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    // Verifica a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

      // Gera o token JWT e inclui a permissão do usuário
      const token = jwt.sign(
          { email: user.email, permissao: user.permissao },
          JWT_SECRET,
          { expiresIn: "2m" }
      );

      res.json({ token});
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para criar um colaborador
server.post("/create-colaborador", async (req, res) => {
  const saltRounds = 10; // Número de rounds para o salt
  try {
      const {
          nome_completo: nome,
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



//rota para criar um cliente
server.post("/create-cliente", async (req, res) => {
  const saltRounds = 10; // Número de rounds para o salt
  try {
      const {
        nome_completo: nome,
        cpf_cnpj,
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
          "INSERT INTO clientes (nome, cpf_cnpj, email, celular, razao_social, cidade, logradouro, bairro, cep, estado, permissao, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
          [
              nome,
              cpf_cnpj,
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

  

// Inicialização do servidor
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


server.post("/logout", function (req, res) {
  req.logout(function (err) {
      if (err) {
          return res.status(500).json({ message: "Erro ao fazer logout" });
      }
      res.status(200).json({ message: "Logout realizado com sucesso" });
  });
});


const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "Token ausente" });
  }

  //verifica token com a chave secreta
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: "Token expirado ou inválido" });
      }

      //se token válido, anexa os dados do usuário à requisição
      req.user = decoded;
      next();
  });
};

module.exports = { authenticateToken };
