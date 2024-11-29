import "../../Contrato/CadastrarContrato/dadosContrato.css";
import Linha from "../../../../assets/Line 29.png";
import { useState, useEffect } from 'react';

const DadosRelatorios = () => {
    const [clientes, setClientes] = useState([]);
    const [contratos, setContratos] = useState([]);
    const [listaRelatorios, setListaRelatorios] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolo] = useState('');
    const [fase, setFase] = useState('');
    const [dadosRelatorio, setDadosRelatorio] = useState({
        contrato: '',
        tamanho: '',
        coloracao: '',
        produtos: '',
        nos: '',
        clima: '',
        dataColeta: '',
        dataAplicacao: '',
        descricao: '',
    });
    const [error, setError] = useState('');

    const fases = [
        { id: 'fase1', nome: '1º Etapa' },
        { id: 'fase2', nome: '2º Etapa' },
        { id: 'fase3', nome: '3º Etapa' },
        { id: 'fase4', nome: '4º Etapa' },
        { id: 'fase5', nome: '5º Etapa' },
    ];

    useEffect(() => {
        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));

        fetch('http://localhost:4000/contratos')
            .then((response) => response.json())
            .then((data) => setContratos(data))
            .catch((error) => console.error("Erro ao buscar contratos:", error));

        fetch('http://localhost:4000/relatorios')
            .then((response) => response.json())
            .then((data) => setListaRelatorios(data))
            .catch((error) => console.error("Erro ao buscar relatórios:", error));
    }, []);


    const buscarRelatorio = (e) => {
        e.preventDefault();
        if (cliente && fase && contrato) {
            fetch(`http://localhost:4000/ver-relatorio?cliente_cnpj=${cliente}&protocolo_sigla=${protocolo}`)
                .then(response => response.json())
                .then(data => {
                    if (data.relatorio && data.relatorio.length === 1) {
                        const relatorioData = data.relatorio[0];
                        setDadosRelatorio({
                            contrato: relatorioData.num_contrato || '',
                            tamanho: relatorioData.tm_plantas || '',
                            coloracao: relatorioData.cor_folhas || '',
                            produtos: relatorioData.outros_prod || '',
                            nos: relatorioData.num_nos || '',
                            clima: relatorioData.clima || '',
                            dataColeta: relatorioData.dt_coleta || '',
                            dataAplicacao: relatorioData.dt_apl_prod || '',
                            descricao: relatorioData.obs || '',
                        });
                        setError('');
                    } else {
                        setError('Relatório não encontrado.');
                    }
                })
                .catch(error => {
                    setError('Erro ao buscar dados do relatório.');
                    console.error('Erro ao buscar dados do relatório:', error);
                });
        } else {
            setError('Por favor, selecione um cliente e um protocolo.');
        }
    };

    const alterarRelatorio = (e) => {
        e.preventDefault();
        if (cliente && fase && dadosRelatorio.contrato) {
            fetch(`http://localhost:4000/alterar-relatorio/${cliente}/${fase}/${dadosRelatorio.contrato}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dtColeta: dadosRelatorio.dataColeta,
                    dtAplicacao: dadosRelatorio.dataAplicacao,
                    tamanho: dadosRelatorio.tamanho,
                    corFolhas: dadosRelatorio.coloracao,
                    outrosProdutos: dadosRelatorio.produtos,
                    numeroNos: dadosRelatorio.nos,
                    clima: dadosRelatorio.clima,
                    observacao: dadosRelatorio.descricao,
                    contrato: dadosRelatorio.contrato,
                }),
            })
            .then((response) => response.json())
            .then(() => {
                setError('');
                alert('Relatório atualizado com sucesso!');
            })
            .catch((error) => {
                setError('Erro ao atualizar relatório.');
                console.error('Erro ao atualizar relatório:', error);
            });
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro3">Para Alterar Relatório</label>

                    <select
                        className="contrato__selectBox2"
                        name="selectCliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                    >
                        <option value="" disabled>Selecione o Cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.cnpj} value={cliente.cnpj}>
                                {cliente.razao_social}
                            </option>
                        ))}
                    </select>

                    <select
                        className="contrato__selectBox2"
                        name="selectFase"
                        value={fase}
                        onChange={(e) => setFase(e.target.value)}
                    >
                        <option value="" disabled>Selecione a Fase</option>
                        {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>
                                {fase.nome}
                            </option>
                        ))}
                    </select>

                    <select
                        className="contrato__selectBox2"
                        name="selectContrato"
                        value={dadosRelatorio.contrato}
                        onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, contrato: e.target.value })}
                    >
                        <option value="" disabled>Selecionar Contrato</option>
                        {contratos.map((contrato) => (
                            <option key={contrato.num_contrato} value={contrato.num_contrato}>
                                {contrato.num_contrato}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="div__botoes" onSubmit={buscarRelatorio}>
                    <button className="button__cadastrar" type="submit">
                        Buscar
                    </button>
                </form>

                <form className="div__botoes" onSubmit={alterarRelatorio}>
                    <button className="button__alterar" type="submit">
                        Atualizar Relatório
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>

            <div className="box__branca">
                <form className="DadosDaPesquisa">
                    <div className="div__Pesquisa1">
                        <p>Tamanho médio das plantas</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.tamanho}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Coloração das folhas</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.coloracao}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Outros produtos aplicados</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.produtos}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Número médio de nós</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.nos}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />
                    </div>

                    <div className="div__Pesquisa2">
                        <p>Clima</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.clima}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Data da Coleta</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.dataColeta}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Data da Aplicação</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.dataAplicacao}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                        <p>Descrição</p>
                        <p className="p_dadosDaPesquisa">{dadosRelatorio.descricao}</p>
                        <img className="alinhar__linha" src={Linha} alt="linha horizontal" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DadosRelatorios;
