const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const env = require('../.env');

const pgp = require("pg-promise")({});

// conexão com o banco
const usuario = 'daniele';
const senha = 'laranja02';
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/ti`);

const corsOptions = {
    origin: 'http://localhost:5173',  // Ou use '*' para permitir qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: true,   // Isso permite a requisição OPTIONS continuar
    optionsSuccessStatus: 204,
  };


const server = express();
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});

const users = [
    { email: "isa@example.com", password: "isa123", tipo: "cliente" },
    { email: "je@example.com", password: "je123", tipo: "profissional" },
    { email: "dani@example.com", password: "dani123", tipo: "cliente" }
];

// Rota de login
server.post("/tela-login-principal", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    // Verificar se o usuário existe e a senha está correta
    if (!user || password !== user.password) {
        return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    // Gerar token
    const token = jwt.sign({ email: user.email, tipo: user.tipo }, "seu_segredo", { expiresIn: "1h" });

    // Retornar token e tipo de usuário
    res.json({ token, tipo: user.tipo });
});

server.post(
	"/create-colaborador",
	//passport.authenticate("local", { session: false }),
	async (req, res) => {
        debugger;

		// Cria o token JWT
		//const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
		//	expiresIn: "1h",
		//});

        const colabNome = req.body.nome;
        const colabSobrenome = req.body.sobrenome;
        const colabEmail = req.body.email;
        const colabCPF = req.body.cpf;
        const colabCargo = req.body.cargo;
        const colabPer = req.body.permissao;
        const colabCidade = req.body.cidade;
        const colabEstado = req.body.estado;
        const colabCel = req.body.celular;
        const colabHorario = req.body.horario;


        const clientes = await db.one(
			"INSERT INTO colaborador (nome, sobrenome, email, cpf, cargo, permissao, cidade, estado, celular, horario) VALUES ($1,$2,$3, $4, $5, $6, $7, $8, $9, $10);",
              [colabNome, colabSobrenome, colabEmail, colabCPF, colabCargo, colabPer, colabCidade, colabEstado, colabCel, colabHorario,

		]);


		res.json({ message: "Usuário criado com sucesso"});
	},
);