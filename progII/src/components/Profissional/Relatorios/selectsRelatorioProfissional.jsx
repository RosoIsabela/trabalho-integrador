import '../../Cliente/VerContrato/selectsContratoCliente.css';
import { ArrowRight, Eraser, MagnifyingGlass, Wrench } from "@phosphor-icons/react";
import Linha from "../../../assets/Line 29.png";
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

function SelectsRelatoriosProfissional() {
    const [clientes, setClientes] = useState([]);
    const [protocolos, setProtocolos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [dados, setDados] = useState({});
    const [fase, setFase] = useState('');

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

        fetch('http://localhost:4000/protocolos')
            .then((response) => response.json())
            .then((data) => setProtocolos(data))
            .catch((error) => console.error("Erro ao buscar protocolos:", error));
    }, []);

    // Função para buscar os dados da pesquisa baseado no cliente e protocolo
    const buscarRelatorio = () => {
        if (cliente && protocolo) {
            fetch(`http://localhost:4000/ver-pesquisa?cliente_cnpj=${cliente}&protocolo_sigla=${protocolo}`)
                .then(response => response.json())
                .then(data => {
                    if (data.pesquisa && data.pesquisa.length === 1) {
                        const pesquisaData = data.pesquisa[0];
                        const formatData = (date) => new Date(date).toISOString().split('T')[0]; // Converte para AAAA-MM-DD
                        setDados({
                            tamanho: pesquisaData.tm_plantas || '',
                            coloracao: pesquisaData.cor_folhas || '',
                            produtos: pesquisaData.outros_prod || '',
                            nos: pesquisaData.num_nos || '',
                            clima: pesquisaData.clima || '',
                            contrato: pesquisaData.contrato || '',
                            data_coleta: pesquisaData.dt_coleta ? formatData(pesquisaData.dt_coleta) : '',
                            data_aplicacao: pesquisaData.dt_apl_prod ? formatData(pesquisaData.dt_aplicacao) : '',
                            descricao: pesquisaData.obs || '',
                        });
                        setError('');
                    } else {
                        setError('Dados da pesquisa não encontrados.');
                    }
                })
                .catch(error => {
                    setError('Erro ao buscar os dados da pesquisa.');
                    console.error('Erro ao buscar dados da pesquisa:', error);
                });
        } else {
            setError('Por favor, selecione um cliente e um protocolo.');
        }
    };

    return (
        <div>
            <div className="contrato__options">
                <div className="div__buttons">
                    <select
                        className="contrato__selectBox"
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
                        className="contrato__selectBox"
                        name="selectProtocolo"
                        value={protocolo} 
                        onChange={(e) => setProtocolo(e.target.value )}
                    >
                        <option value="" disabled>Selecione o Protocolo</option>
                        {protocolos.map((protocolo) => (
                            <option key={protocolo.sigla} value={protocolo.sigla}>
                                {protocolo.tipo}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="contrato__selectBox"
                        name="selectFase"
                        value={fases}
                        onChange={(e) => setFase(e.target.value)}
                    >
                        <option value="">Selecione a Fase</option>
                        {fases.map((fase) => (
                        <option key={fase.id} value={fase.id}>
                            {fase.nome}
                        </option>
                        ))}
                    </select>

                    <button type="button" className="contrato__button2" onClick={buscarRelatorio}>
                        Ver Relatório
                        <div className="icons__button3">
                            <MagnifyingGlass />
                        </div>
                    </button>

                    <button type="button" className="contrato__button3">
                        Alterar
                        <div className="icons__button3">
                            <Wrench />
                        </div>
                    </button>

                    <button className="button__excluir" type="button" >
                        Excluir
                        <div className="icons__button2">
                            <Eraser />
                        </div>
                    </button>

                    <Link className="ajustando__links" to="/incluir-pesquisa">
                        <button className="contrato__button" id="ajuste__corButton">
                            Incluir dados da Pesquisa
                            <div className="icons__button">
                                <ArrowRight />
                            </div>
                        </button>
                    </Link>
                </div>

                <div className="box__branca">
                    <form className="DadosDaPesquisa">
                        <div className="div__Pesquisa1">
                            <p>Tamanho médio das plantas</p>
                            <p className="p_dadosDaPesquisa">{dados.tamanho}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Coloração das folhas</p>
                            <p className="p_dadosDaPesquisa">{dados.coloracao}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Outros produtos aplicados</p>
                            <p className="p_dadosDaPesquisa">{dados.produtos}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Número médio de nós</p>
                            <p className="p_dadosDaPesquisa">{dados.nos}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Clima</p>
                            <p className="p_dadosDaPesquisa">{dados.clima}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />
                        </div>

                        <div className="div__Pesquisa2">
                            <p>Pesquisa Contratada</p>
                            <p className="p_dadosDaPesquisa">{dados.contrato}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Data da Coleta</p>
                            <p className="p_dadosDaPesquisa">{dados.data_coleta}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Data da Aplicação</p>
                            <p className="p_dadosDaPesquisa">{dados.data_aplicacao}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />

                            <p>Descrição</p>
                            <p className="p_dadosDaPesquisa">{dados.descricao}</p>
                            <img className="alinhar__linha" src={Linha} alt="linha horizontal" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SelectsRelatoriosProfissional;