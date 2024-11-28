import '../../Cliente/VerContrato/selectsContratoCliente.css';
import Linha from "../../../assets/Line 29.png";
import { ArrowRight, Eraser, MagnifyingGlass, Wrench } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SelectsContratoProfissional() {
    const [clientes, setClientes] = useState([]);
    const [protocolos, setProtocolos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [dados, setDados] = useState({
        contrato: '',
        dataContrato: '',
        dataEntrega: '',
        custo: '',
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
    }, []);

    // Função para buscar os dados do contrato baseado no cliente e protocolo
    const buscarContrato = () => {
        if (cliente && protocolo) {
            fetch(`http://localhost:4000/ver-contrato?cliente_cnpj=${cliente}&protocolo_sigla=${protocolo}`)
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
            setError('Por favor, selecione um cliente e um protocolo.');
        }
    };

    // Envio de dados (Caso necessário)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/cadastrar-contrato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    num_contrato: dados.contrato,
                    protocolo_num: protocolo,
                    num_parcelas: dados.parcelas,
                    preco: dados.custo,
                    dt_assinatura: dados.dataContrato,
                    dt_entrega: dados.dataEntrega,
                    cliente_cnpj: cliente
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


    const DeleteContrato = async (e) => {
        e.preventDefault();
      
        try {
            const response = await fetch(`http://localhost:4000/excluir-contrato/${dados.contrato}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (!response.ok) {
                throw new Error("Erro ao excluir contrato");
            }
      
            alert("Contrato excluído com sucesso!");

            // Limpa todos os campos do contrato
            setDados({
                contrato: '',
                dataContrato: '',
                dataEntrega: '',
                custo: '',
                parcelas: '',
            });
        
        } catch (error) {
            console.error("Erro ao excluir contrato:", error);
            alert("Erro ao excluir o contrato. Tente novamente."); 
        }
    };

    return (
        <div>
            {error && <div className="error">{error}</div>} {/* Displaying error message if any */}
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

                    <button type="button" className="contrato__button2" onClick={buscarContrato}>
                        Ver contrato
                        <div className="icons__button3">
                            <MagnifyingGlass />
                        </div>
                    </button>

                    <Link className="ajustando__links" to="/alterar-contrato">
                        <button type="button" className="contrato__button3">
                            Alterar
                            <div className="icons__button3">
                                <Wrench />
                            </div>
                        </button>
                    </Link>

                    <button className="button__excluir" type="button" onClick={DeleteContrato}>
                        Excluir
                        <div className="icons__button2">
                            <Eraser />
                        </div>
                    </button>

                    <Link className="ajustando__links" to="/cadastrar-contrato">
                        <button className="contrato__button" id="ajuste__corButton">
                            Cadastrar Contrato
                            <div className="icons__button">
                                <ArrowRight />
                            </div>
                        </button>
                    </Link>
                </div>
                
                <div className="box__branca">
                    <form className="DadosDoContrato" onSubmit={handleSubmit}>
                        <p>Contrato</p>
                        <p className="p_dadosDoContrato">{dados.contrato}</p>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Número de Parcelas</p>
                        <p className="p_dadosDoContrato">{dados.parcelas}</p>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Custo</p>
                        <p className="p_dadosDoContrato">{dados.custo}</p>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Data do Contrato</p>
                        <p className="p_dadosDoContrato">{dados.dataContrato}</p>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Data de Entrega do Relatório Final</p>
                        <p className="p_dadosDoContrato">{dados.dataEntrega}</p>
                        <img src={Linha} alt="linha horizontal" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SelectsContratoProfissional;
