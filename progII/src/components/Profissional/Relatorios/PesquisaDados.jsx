import { useState, useEffect } from 'react';
import './PesquisaDados.css';

const PesquisaDados = () => {
    const [contratos, setContratos] = useState([]);  
    const [formData, setFormData] = useState({
        cultivar: "",
        fase: "opcao",
        tamanho: "",
        coloracao: "",
        produtos: "",
        nos: "",
        data_coleta: "",
        data_aplicacao: "",
        descricao: "",
        clima: "",
        contrato: "opcao",
    });

    const fases = [
        { id: 'fase1', nome: '1º Etapa' },
        { id: 'fase2', nome: '2º Etapa' },
        { id: 'fase3', nome: '3º Etapa' },
        { id: 'fase4', nome: '4º Etapa' },
        { id: 'fase5', nome: '5º Etapa' },
    ];


    useEffect(() => {
        fetch('http://localhost:4000/contratos')
            .then((response) => response.json())
            .then((data) => setContratos(data))
            .catch((error) => console.error("Erro ao buscar contratos:", error));
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
                    contrato: formData.contrato,
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

    //função para selecionar o contrato
    const handleContratoSelect = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            contrato: value,
        }));
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select
                            id="contratoSelect"  
                            name="contrato"  
                            defaultValue="opcao"
                            value={formData.contrato}
                            onChange={handleContratoSelect} 
                        >
                            <option value="opcao" disabled>Selecionar Contrato</option>
                            {contratos.map((contrato) => (
                            <option key={contrato.num_contrato} value={contrato.num_contrato}>  
                                {contrato.num_contrato} 
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
                            id="faseSelect"
                            name="fase"
                            value={formData.fase}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione a Fase</option>
                            {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>
                                {fase.nome}
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
                    
                <div className="inputsDate">
                    <label className="label__InserirDados" id="dateInput_Nome" htmlFor="dateInput">Data da Coleta</label>
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
                    <label className="label__InserirDados" id="dateInput_Nome" htmlFor="dateInput">Data da Aplicação</label>
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
            </div>
                
            <div className="colunas">
                <label className="label__InserirDados"  htmlFor="descricao">Descrição</label>
                <div  className="inputsNote">
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

                <button className="saveButton" type="submit">Salvar</button>
            </div>
        </form>
    );
};

export default PesquisaDados;
