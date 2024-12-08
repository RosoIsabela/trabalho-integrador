import React, { useState, useEffect } from 'react';
import './cardsTopCliente.css';

function CardsTopCliente({ contratoSelecionado }) {
    const [dados, setDados] = useState({
        dataEntrega: '',
        preco: '', 
        parcelas: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contratoSelecionado) {
            setLoading(true);
            fetch(`http://localhost:4000/contratos-cliente/${contratoSelecionado}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        setError(data.message);
                    } else {
                        setDados({
                            parcelas: data.num_parcelas || '',
                            preco: data.preco || '', 
                            dataEntrega: data.dt_entrega || '',
                        });
                        setError('');
                    }
                })
                .catch(() => {
                    setError('Erro ao buscar dados do contrato.');
                })
                .finally(() => setLoading(false));
        }
    }, [contratoSelecionado]);

    // Data já no formato esperado
    const dataFormatada = dados.dataEntrega || '-';

    // Formatação do preço
    const precoFormatado = dados.preco 
        ? `R$ ${parseFloat(dados.preco).toFixed(2).replace('.', ',')}` 
        : '-';

    return (
        <div className="div__boxsPI">
            {error && <div className="error">{error}</div>}
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <div className="box1__tratamentos">
                        <p>Nº de parcelas</p>
                        <p className="title__cards">{dados.parcelas || '-'}</p>
                    </div>

                    <div className="box2__custo">
                        <p>Preço</p> 
                        <p className="title__cards">{precoFormatado}</p> 
                    </div>

                    <div className="box3__entrega">
                        <p className="entrega__titulo">Data de Entrega estimada</p>
                        <div className="entrega__data">
                            <p>{dataFormatada}</p> 
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CardsTopCliente;
