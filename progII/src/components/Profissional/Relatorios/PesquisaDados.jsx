import { useState, useEffect } from 'react';
import './PesquisaDados.css';

const PesquisaDados = () => {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolos, setProtocolos] = useState([]);
    const [protocolo, setProtocolo] = useState('');
    const [formData, setFormData] = useState({
        cultivar: "",
        fase: "opcao",
        tamanho: "",
        coloracao: "",
        produtos: "",
        nos: "",
        data_coleta: "2024-12-23",
        data_aplicacao: "2024-12-23",
        descricao: "",
        clima: "",
        psq_contratada: "",
    });

    useEffect(() => {
        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));

        fetch('http://localhost:4000/protocolos')
            .then((response) => response.json())
            .then((data) => setProtocolos(data))
            .catch((error) => console.error("Erro ao buscar protocolos:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/incluir-etapa-pesquisa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dt_coleta: formData.data_coleta,
                    dt_apl_prod: formData.data_aplicacao,
                    tm_plantas: formData.tamanho,
                    cor_folhas: formData.coloracao,
                    outros_prod: formData. produtos,
                    num_nos: formData.nos,
                    clima: formData.clima,
                    fase: formData.fase,
                    obs: formData.descricao,
                    psq_contratada: formData.psq_contratada,
                    cliente_cnpj: cliente,
                    protocolo_sigla: protocolo
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar os dados!');
            }
            alert('Informações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao salvar as informações. Tente novamente.');
        }
    };

    //função para selecionar o cliente
    const handleClienteSelect = (e) => {
        setCliente(e.target.value);
    };

    //função para selecionar o protocolo
    const handleProtocoloSelect = (e) => {
        setProtocolo(e.target.value);
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select
                            id="clienteSelect"
                            name="cod" 
                            value={formData.cod}
                            onChange={handleClienteSelect}
                        >
                            <option value="" disabled>Selecionar Cliente</option>
                            {clientes.map((cliente) => (
                            <option key={cliente.cnpj} value={cliente.cnpj}>
                                {cliente.razao_social}
                            </option>
                            ))}
                        </select>
                    </div>
                </nav>

                <div className="inputsContainers">
                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="tamanhoInput">Tamanho médio das plantas</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="tamanhoInput"
                            name="tamanho"
                            placeholder="Digite aqui"
                            value={formData.tamanho}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="coloracaoInput">Coloração das folhas</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="coloracaoInput"
                            name="coloracao"
                            placeholder="Digite aqui"
                            value={formData.coloracao}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="produtosInput">Outros produtos aplicados</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="produtosInput"
                            name="produtos"
                            placeholder="Digite aqui"
                            value={formData.produtos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="nosInput">Número médio de nós</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="nosInput"
                            name="nos"
                            placeholder="Digite aqui"
                            value={formData.nos}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select
                            id="cultivarSelect"
                            name="cultivar"
                            value={formData.protocolo}
                            onChange={handleProtocoloSelect}
                        >
                            <option value="" disabled selected>Protocolo</option>
                            {protocolos.map((protocolo) => (
                                <option key={protocolo.sigla} value={protocolo.sigla}>
                                    {protocolo.sigla}
                                </option>
                            ))}
                        </select>
                    </div>
                </nav>

                <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="climaInput">Clima</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="climaInput"
                            name="clima"
                            placeholder="Digite aqui"
                            value={formData.clima}
                            onChange={handleChange}
                        />
                </div>

                <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="psq_contratadaInput">Pesquisa Contratada (cod)</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="psq_contratadaInput"
                            name="psq_contratada"
                            placeholder="Digite aqui"
                            value={formData.psq_contratada}
                            onChange={handleChange}
                        />
                </div>
                    
                <div className="inputsDate">
                    <label className="label__InserirDados" htmlFor="dateInput">Data da Coleta</label>
                    <input
                        className="input__InserirDados"
                        type="date"
                        id="dateInput"
                        name="data_coleta"
                        value={formData.data_coleta}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputsDate">
                    <label className="label__InserirDados" htmlFor="dateInput">Data da Aplicação</label>
                    <input
                        className="input__InserirDados"
                        type="date"
                        id="dateInput"
                        name="data_aplicacao"
                        value={formData.data_aplicacao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="saveButton" type="submit">Salvar</button>
            </div>
                
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select
                            id="faseSelect"
                            name="fase"
                            value={formData.fase}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>Fase</option>
                            <option value="fase1">1</option>
                            <option value="fase2">2</option>
                            <option value="fase3">3</option>
                            <option value="fase4">4</option>
                        </select>
                    </div>
                </nav>

                <label className="label__InserirDados" htmlFor="descricao">Descrição</label>
                <div className="inputsNote">
                    <input
                        className="input__InserirText"
                        type="text"
                        id="descricao"
                        name="descricao"
                        placeholder="Nota técnica:"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </form>
    );
};

export default PesquisaDados;
