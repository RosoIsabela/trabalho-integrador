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
const usuario = "teste";
const senha = "123";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/sulagro`);

const server = express();

// Configuração de CORS
const corsOptions = {
  origin: "http://localhost:5173", // Permite requisições do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configuração do express-session
server.use(
  session({
    secret: "alguma_frase_muito_doida_pra_servir_de_SECRET",
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
      usernameField: "username",
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
      secretOrKey: "seu_segredo",
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
  const { email, password } = req.body;

  try {
    // Busca o usuário no banco de dados
    const user = await db.oneOrNone(
      "SELECT email, senha FROM colaborador WHERE email = $1;",
      [email]
    );

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    // Verifica a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    // Gera o token JWT
    const token = jwt.sign({ email: user.email }, "seu_segredo", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para criar um colaborador
server.post("/create-colaborador", async (req, res) => {
	const saltRounds = 10; // Número de rounds para o salt
	try {
	  // Extração dos dados do corpo da requisição
	  const {
		cpf,
		nome_completo,
		email,
		celular,
		cargo,
		logradouro,
		bairro,
		cidade,
		cep,
		permissao,
		horario,
		senha,
	  } = req.body;
  
	  // Geração do salt e do hash da senha
	  const salt = bcrypt.genSaltSync(saltRounds);
	  const hashedSenha = bcrypt.hashSync(senha, salt);
  
	  // Inserção no banco de dados
	  await db.none(
		"INSERT INTO colaborador (cpf, nome_completo, email, celular, cargo, logradouro, bairro, cidade, cep, permissao, horario, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
		[
		  cpf,
		  nome_completo,
		  email,
		  celular,
		  cargo,
		  logradouro,
		  bairro,
		  cidade,
		  cep,
		  permissao,
		  horario,
		  hashedSenha, // Salva o hash da senha no banco
		]
	  );
  
	  console.log("Colaborador criado com sucesso!");
	  res.status(200).json({ message: "Colaborador criado com sucesso!" });
	} catch (error) {
	  console.error("Erro ao criar colaborador:", error);
	  res.status(400).json({ message: "Erro ao criar colaborador" });
	}
  });
  

// Inicialização do servidor
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
