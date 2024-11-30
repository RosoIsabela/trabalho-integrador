import React, { useState, useEffect } from 'react';
import './selectsCliente.css';

function SelectsCliente({ setContratoSelecionado }) {
    const [listaContratos, setListaContratos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    setListaContratos(data);
                }
            })
            .catch(() => {
                setError('Erro ao buscar contratos.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleContratoChange = (event) => {
        setContratoSelecionado(event.target.value); 
    };

    return (
        <div className="div__selects">
            {error && <div className="error">{error}</div>}
            <select
                className="selectsBoxs"
                name="select"
                defaultValue=""
                onChange={handleContratoChange}
                disabled={loading || listaContratos.length === 0}
            >
                <option value="" disabled>
                    {loading ? 'Carregando contratos...' : 'Selecione o contrato'}
                </option>
                {listaContratos.map((contrato) => (
                <option key={contrato.num_contrato} value={contrato.num_contrato}>
        {'Contrato ' + contrato.num_contrato}  
    </option>
))}
            </select>
        </div>
    );
}

export default SelectsCliente;
