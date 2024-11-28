import './selectsProfissional.css';
import { useState, useEffect } from 'react';

function SelectsProfissional({ cliente, setCliente, contrato, setContrato }) {
    const [clientes, setClientes] = useState([]);
    const [contratos, setContratos] = useState([]);

    // Busca os clientes para listar no menu 
    useEffect(() => {
        fetch(`http://localhost:4000/clientes`)
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));
    }, []);

    // Buscaos contratos do cliente selecionado para listar no menu
    useEffect(() => {
        if (cliente) {
            fetch(`http://localhost:4000/contratos/${cliente}`)
                .then((response) => response.json())
                .then((data) => setContratos(data))
                .catch((error) => console.error("Erro ao buscar contratos:", error));
        } else {
            setContratos([]); 
        }
    }, [cliente]);

    return (
        <div className="div__selects">
            <div className="box__ajustes">
                
                <select
                    className="selectsBoxs2"
                    name="selectCliente"
                    value={cliente}
                    onChange={(e) => {
                        setCliente(e.target.value);
                        setContrato(''); 
                    }}
                >
                    <option value="" disabled>Selecione o Cliente</option>
                    {clientes.map((clienteItem) => (
                        <option key={clienteItem.cnpj} value={clienteItem.cnpj}>
                            {clienteItem.razao_social}
                        </option>
                    ))}
                </select>
            </div>

            <div className="box__ajustes">
                
                <select
                    className="selectsBoxs2"
                    name="selectContrato"
                    value={contrato}
                    onChange={(e) => setContrato(e.target.value)}
                    disabled={!cliente} 
                >
                    <option value="" disabled>Selecione o Contrato</option>
                    {contratos.length > 0 ? (
                        contratos.map((contratoItem) => (
                            <option key={contratoItem.num_contrato} value={contratoItem.num_contrato}>
                                Contrato {contratoItem.num_contrato}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Nenhum contrato disponível</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default SelectsProfissional;
