import './selectsProfissional.css'
import { useState, useEffect } from 'react';

function selectsProfissional() {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState('');
    const [contratos, setContratos] = useState([]);
    const [num_contrato, setNumContrato] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/contratos')
            .then((response) => response.json())
            .then((data) => setContratos(data))
            .catch((error) => console.error("Erro ao buscar contratos:", error));

        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));

    }, []);


    return (
        <div className="div__selects">
            <div className="box__ajustes">
                <select
                    className="selectsBoxs2"
                    name="contrato"
                    value={num_contrato} 
                    onChange={(e) => setNumContrato(e.target.value)}
                >
                    <option value="opcao">Selecionar Contrato</option>
                    {contratos.map((contrato) => (
                        <option key={contrato.num_contrato} value={contrato.num_contrato}>
                            {contrato.num_contrato}
                        </option>
                    ))}
                </select>
            </div>

            <div className="box__ajustes">
                <select
                    className="selectsBoxs2"
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
            </div>
        </div>
    )
}


export default selectsProfissional