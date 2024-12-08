import '../../Cliente/VerContrato/selectsContratoCliente.css';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';
import Linha from "../../../assets/Line 29.png";

function SelectsRelatoriosCliente() {
    const [contratos, setContratos] = useState([]);
    const [num_contrato, setNumContrato] = useState('');
    const [fase, setFase] = useState('');
    const [dados, setDados] = useState({});
    const [error, setError] = useState('');
    
    const fases = [
        { id: 'fase1', nome: '1º Etapa' },
        { id: 'fase2', nome: '2º Etapa' },
        { id: 'fase3', nome: '3º Etapa' },
        { id: 'fase4', nome: '4º Etapa' },
        { id: 'fase5', nome: '5º Etapa' },
    ];

    useEffect(() => {
        // Buscar contratos
        fetch('http://localhost:4000/contratos-cliente', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setContratos(data); 
                }
            })
            .catch((error) => {
                setError("Erro ao buscar contratos.");
                console.error("Erro ao buscar contratos:", error);
            });
    }, []);


    const buscarRelatorio = () => {
        if (num_contrato && fase) {
            fetch(`http://localhost:4000/ver-pesquisa/${num_contrato}/${fase}`)
                .then(response => response.json())
                .then(data => {
                    if (data.pesquisa && data.pesquisa.length === 1) {
                        const pesquisaData = data.pesquisa[0];
                        setDados({
                            tamanho: pesquisaData.tm_plantas || '',
                            coloracao: pesquisaData.cor_folhas || '',
                            produtos: pesquisaData.outros_prod || '',
                            nos: pesquisaData.num_nos || '',
                            clima: pesquisaData.clima || '',
                            data_coleta: pesquisaData.dt_coleta || '',
                            data_aplicacao: pesquisaData.dt_apl_prod || '',
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
            setError('Por favor, selecione um contrato e uma fase.');
        }
    };

    return (
        <div>
            <div className="contrato__options">
                <div className="div__buttons">
                    <select
                        className="contrato__selectBox"
                        name="contrato"
                        value={num_contrato}
                        onChange={(e) => setNumContrato(e.target.value)}
                    >
                        <option value="" disabled>Selecionar Contrato</option>
                        {contratos.map((contrato) => (
                            <option key={contrato.num_contrato} value={contrato.num_contrato}>
                                {contrato.num_contrato}
                            </option>
                        ))}
                    </select>

                    <select
                        className="contrato__selectBox"
                        name="selectFase"
                        value={fase}
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
                    
                    {error && <p className="error-message">{error}</p>}
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
                        </div>

                        <div className="div__Pesquisa2">
                            <p>Clima</p>
                            <p className="p_dadosDaPesquisa">{dados.clima}</p>
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
    );
}

export default SelectsRelatoriosCliente;
