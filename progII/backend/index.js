const express = require('express');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(3003, () => {console.log("servidor rodando hehe")});


const funcionarios = [
    { id: 1, nome: 'Adão', sobrenome: 'Costa', email:  'adaocosta@gmail.com', cargo: 'agrônomo', cpf: '25544910011', cidade: 'Chapecó', estado: 'SC', permissao: 'funcionario', celular: '12345678', horario: '11 às 18'},
    { id: 2, nome: 'Luciane', sobrenome: 'Fonseca', email:  'lucianefonseca@gmail.com', cargo: 'auxiliar de campo', cpf: '23450000149', cidade: 'Chapecó', estado: 'SC', permissao: 'funcionario', celular: '12345678', horario: '11 às 18'}
];

const clientes = [
    {id: 1, nome: 'José', sobrenome: 'Silva', email:  'josesilva@gmail.com', razaoSocial: 'VerdeCampo', cpf: '2345678901', cidade: 'São Paulo', estado: 'SP', permissao: 'cliente', telefone: '12345678'},
    {id: 2, nome: 'Ana', sobrenome: 'Santos', email:  'anasantos@gmail.com', razaoSocial: 'AgroInovação', cpf: '78945612303', cidade: 'Joinville', estado: 'SC', permissao: 'cliente', telefone: '987456321'}
];


//rotas
server.post('/cadastroCliente', (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const razaoSocial = req.body.razaoSocial;
    const cpf = req.body.cpf;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const permissao = req.body.permissao;
    const telefone = req.body.telefone;

    const novoCliente = {
        id: clientes.length + 1, nome, sobrenome, email, razaoSocial, cpf, cidade, estado, permissao, telefone
    };

    clientes.push(novoCliente);

    const resposta = `
        Olá ${nome} ${sobrenome},
        Email: ${email},
        Razão Social: ${razaoSocial},
        CPF: ${cpf},
        Cidade: ${cidade},
        Estado: ${estado},
        Permissão: ${permissao},
        Telefone: ${telefone}
    `;
    
    res.send(resposta);
});

server.post('/cadastroFuncionario', (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email= req.body.email;
    const cargo = req.body.cargo;
    const cpf = req.body.cpf;
    const cidade = req.body.cidade;
    const estado= req.body.estado;
    const permissao = req.body.permissao;
    const celular = req.body.celular;
    const horario = req.body.horario;

    const novoFuncionario = {
        id: funcionarios.length + 1, nome, sobrenome, email, cargo, cpf, cidade, estado, permissao, celular, horario
    };

    funcionarios.push(novoFuncionario);


    const resposta = `
        Olá ${nome} ${sobrenome},
        Email: ${email},
        Cargo: ${cargo},
        CPF: ${cpf},
        Cidade: ${cidade},
        Estado: ${estado},
        Permissão: ${permissao},
        Celular: ${celular},
        Horário : ${horario}
    `;
    
    res.send(resposta);
});



//rota para incluir nova pesquisa
server.post('/registroPesquisa', (req, res) => {
    const tamanho = req.body.tamanho;
    const coloracao = req.body.coloracao;
    const outrosProdutos = req.body.produtos;
    const quantidadeNos = req.body.nos;
    const notaTecnica = req.body.nota;

    const resposta = `
        Tamanho médio das plantas: ${tamanho}m,
        Coloração das folhas: ${coloracao},
        Outros produtos aplicados: ${outrosProdutos},
        Número médio de nós: ${quantidadeNos},
        Nota técnica: ${notaTecnica},
    `;
    
    res.send(resposta);
});

//rota para obter cliente atraves do id, tela perfil do cliente
server.get('/perfilCliente/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === clienteId);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' }); 
    }
});


//rota para obter funcionario atraves do id, tela perfil do funcionario
server.get('/perfilFuncionario/:id', (req, res) => {
    const funcionarioId = parseInt(req.params.id);
    const funcionario = funcionarios.find(f => f.id === funcionarioId);

    if (funcionario) {
        res.json(funcionario);
    } else {
        res.status(404).json({ message: 'Funcionário não encontrado' }); 
    }
});

//rota para obter cliente atraves da razao social, tela gerenciar cliente
server.get('/gerenciarCliente/:razaoSocial', (req, res) => {
    const clienteRzaoSocial = req.params.razaoSocial;

    const cliente = clientes.filter(c => c.razaoSocial === clienteRzaoSocial);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: 'Funcionário não encontrado' }); 
    }
});


//rota para obter funcionario atraves do nome e sobrenome, tela gerenciar funcionario
server.get('/gerenciarFuncionario/:nome/:sobrenome', (req, res) => {
    const funcionarioNome = req.params.nome;
    const funcionarioSobrenome = req.params.sobrenome;

    const funcionario = funcionarios.filter(f => f.nome === funcionarioNome && f.sobrenome === funcionarioSobrenome);

    if (funcionario) {
        res.json(funcionario);
    } else {
        res.status(404).json({ message: 'Funcionário não encontrado' }); 
    }
});


//rota para obter dados da pesquisa, permitindo que o cliente consulte informações (tela dashboard do cliente)
server.get('/dashboardCliente/:cidade/:protocolo', (req, res) => {
    const cidade = req.params.cidade;
    const protocolo = req.params.protocolo;

    const resposta = `
        Cidade: ${cidade},
        Protocolo: ${protocolo},
    `;

    res.send(resposta);
});