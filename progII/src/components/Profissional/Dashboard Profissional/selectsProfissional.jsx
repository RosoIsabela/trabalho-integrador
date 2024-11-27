import './selectsProfissional.css'
import { useState, useEffect } from 'react';

function selectsProfissional() {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));

    }, []);


    return (
        <div className="div__selects">
            <div className="box__ajustes">
                <select className="selectsBoxs2" name="select" defaultValue="opcao">
                    <option value="opcao" disabled>Selecione o Contrato</option>
                    <option value="cidade1">1</option>
                    <option value="cidade2">2</option>
                    <option value="cidade3">3</option>
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