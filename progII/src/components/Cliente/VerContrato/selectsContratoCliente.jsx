import '../../Cliente/VerContrato/selectsContratoCliente.css';
import Linha from "../../../assets/Line 29.png";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';

function SelectsContratoCliente() {
    const [protocolos, setProtocolos] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);
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
    fetch('http://localhost:4000/protocolos')
        .then((response) => response.json())
        .then((data) => setProtocolos(data))
        .catch((error) => console.error("Erro ao buscar protocolos:", error));

    fetch('http://localhost:4000/contratos-cliente', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.message) {
            setError(data.message);
        } else {
            setListaContratos(data);
        }
        })
        .catch((error) => {
            setError("Erro ao buscar contratos.");
            console.error("Erro ao buscar contratos:", error);
        });
    }, []);

    const buscarContrato = () => {
        if (protocolo && dados.contrato) {
        fetch(`http://localhost:4000/ver-contrato-cliente?protocolo_sigla=${protocolo}&num_contrato=${dados.contrato}`)
            .then(response => response.json())
            .then(data => {
            if (data.contrato && data.contrato.length === 1) {
                const contractData = data.contrato[0];
                setDados({
                    contrato: contractData.num_contrato || '',
                    parcelas: contractData.num_parcelas || '',
                    custo: contractData.preco || '',
                    dataContrato: contractData.dt_assinatura || '',
                    dataEntrega: contractData.dt_entrega || '',
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
        setError('Por favor, selecione um protocolo e um contrato.');
    }
    };

    return (
        <div>
        {error && <div className="error">{error}</div>}

        <div className="contrato__options">
            <div className="div__buttons">
            <select
                className="contrato__selectBox"
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
                className="contrato__selectBox"
                name="contrato"
                value={dados.contrato}
                onChange={(e) => setDados({ ...dados, contrato: e.target.value })}
            >
                <option value="" disabled>Selecionar Contrato</option>
                    {listaContratos.map((contrato) => (
                <option key={contrato.num_contrato} value={contrato.num_contrato}>
                    {contrato.num_contrato}
                </option>
            ))}
            </select>

            <button type="button" className="contrato__button2" onClick={buscarContrato}>
                Ver contrato
                <div className="icons__button3">
                <MagnifyingGlass />
                </div>
            </button>
        </div>

        <div className="box__branca">
            {dados.contrato && (
            <form className="DadosDoContrato">
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
            )}
        </div>
        </div>
    </div>
    );
}

export default SelectsContratoCliente;
