import "../../Contrato/CadastrarContrato/dadosContrato.css"
import Linha from "../../../../assets/Line 29.png";
import { MagnifyingGlass, Wrench } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';

function AlterarDados() {
    const [clientes, setClientes] = useState([]);
    const [protocolos, setProtocolos] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [dados, setDados] = useState({
        contrato: '',
        dataContrato: '',
        dataEntrega: '',
        custo: '',
        protocolo: '',
        parcelas: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));

        fetch('http://localhost:4000/protocolos')
            .then((response) => response.json())
            .then((data) => setProtocolos(data))
            .catch((error) => console.error("Erro ao buscar protocolos:", error));
        
        fetch('http://localhost:4000/contratos')
            .then((response) => response.json())
            .then((data) => setListaContratos(data))
            .catch((error) => console.error("Erro ao buscar contratos:", error));
    }, []);

    // Função para buscar os dados do contrato baseado no cliente, protocolo e contrato
    const buscarContrato = (e) => {
        e.preventDefault();
        if (cliente && protocolo) {
            fetch(`http://localhost:4000/ver-contrato?cliente_cnpj=${cliente}&protocolo_num=${protocolo}&num_contrato=${dados.contrato}`)
                .then(response => response.json())
                .then(data => {
                    if (data.contrato && data.contrato.length === 1) {
                        const contractData = data.contrato[0];
                        const formatData = (date) => new Date(date).toISOString().split('T')[0]; // Converte para AAAA-MM-DD
                        setDados({
                            contrato: contractData.num_contrato || '',
                            parcelas: contractData.num_parcelas || '',
                            custo: contractData.preco || '',
                            dataContrato: contractData.dt_assinatura ? formatData(contractData.dt_assinatura) : '',
                            dataEntrega: contractData.dt_entrega ? formatData(contractData.dt_entrega) : '',
                        });
                        setError('');
                    } else {
                        setError('Contrato não encontrado.');
                    }
                })
                .catch(error => {
                    setError('Erro ao buscar dados do contrato.');
                    console.error('Erro ao buscar dados do contrato:', error);
                });
        } else {
            setError('Por favor, selecione um cliente, um protocolo e um contrato.');
        }
    };

    const alterarContrato = (e) => {
        e.preventDefault();

        // Verifica se algum campo está vazio
        if (!cliente || !protocolo || !dados.contrato || !dados.dataContrato || !dados.dataEntrega || !dados.custo || !dados.parcelas) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
    
        if (cliente && protocolo && dados.contrato) {
            fetch(`http://localhost:4000/alterar-contrato/${cliente}/${protocolo}/${dados.contrato}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contrato: dados.contrato,
                    dataContrato: dados.dataContrato,
                    dataEntrega: dados.dataEntrega,
                    custo: dados.custo,
                    parcelas: dados.parcelas,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setError('');
                alert('Contrato atualizado com sucesso!');
            })
            .catch((error) => {
                setError('Erro ao atualizar contrato.');
                console.error('Erro ao atualizar contrato:', error);
            });
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro3">Para Alterar</label>

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
                        name="selectProtocolo"
                        value={protocolo}
                        onChange={(e) => setProtocolo(e.target.value)}
                    >
                        <option value="" disabled>Selecione o Protocolo</option>
                        {protocolos.map((protocolo) => (
                            <option key={protocolo.sigla} value={protocolo.sigla}>
                                {protocolo.tipo}
                            </option>
                        ))}
                    </select>

                    <select
                        className="contrato__selectBox2"  
                        name="contrato"  
                        value={dados.contrato}
                        onChange={(e) => setDados({...dados, contrato: e.target.value})}
                        >
                        <option value="" disabled>Selecionar Contrato</option>
                        {listaContratos.map((contrato) => (
                            <option key={contrato.num_contrato} value={contrato.num_contrato}>  
                                {contrato.num_contrato} 
                            </option>
                        ))}
                    </select>
                </div>

                <form className="div__botoes" onSubmit={buscarContrato}>
                    <button className="button__cadastrar" type="submit">
                        Buscar
                        <div className="icons__button3">
                            <MagnifyingGlass />
                        </div>
                    </button>
                </form>

                <form className="div__botoes" onSubmit={alterarContrato}>
                    <button className="button__alterar" type="submit">
                        Atualizar Contrato
                        <div className="icons__button3">
                                <Wrench />
                        </div>
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>

            <div className="box__branca">
                <form className="DadosDoContrato">
                    <p>Contrato</p>
                    <input
                        type="text"
                        className="input_dadosDoContrato"
                        value={dados.contrato}
                        onChange={(e) => setDados({ ...dados, contrato: e.target.value })}
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Número de Parcelas</p>
                    <input
                        type="number"
                        className="input_dadosDoContrato"
                        value={dados.parcelas}
                        onChange={(e) => setDados({ ...dados, parcelas: e.target.value })}
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Custo</p>
                    <input
                        type="text"
                        className="input_dadosDoContrato"
                        value={dados.custo}
                        onChange={(e) => setDados({ ...dados, custo: e.target.value })}
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data do Contrato</p>
                    <input
                        type="date"
                        className="input_dadosDoContrato"
                        value={dados.dataContrato}
                        onChange={(e) => setDados({ ...dados, dataContrato: e.target.value })}
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data de Entrega do Relatório Final</p>
                    <input
                        type="date"
                        className="input_dadosDoContrato"
                        value={dados.dataEntrega}
                        onChange={(e) => setDados({ ...dados, dataEntrega: e.target.value })}
                    />
                    <img src={Linha} alt="linha horizontal" />
                </form>
            </div>
        </div>
    );
}

export default AlterarDados;