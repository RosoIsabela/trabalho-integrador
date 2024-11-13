const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const server = express();
server.use(cors());
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