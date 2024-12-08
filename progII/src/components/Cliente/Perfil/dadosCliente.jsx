import { useState, useEffect } from 'react';
import './dadosCliente.css'; 
import lineDivisor from "../../../assets/linePerfil.png";
import axios from 'axios';

function DadosCliente() {
    //definindo o estado para armazenar os dados do colaborador
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClienteData = async () => {
            try {
                const response = await axios.get('/perfilCliente', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` //usando o token
                    }
                });
                setCliente(response.data.cliente);
                setLoading(false);
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message || 'Erro ao buscar dados');
                } else if (err.request) {
                    setError('Erro na requisição');
                } else {
                    setError('Erro desconhecido');
                }
                setLoading(false);
            }
        };

        fetchClienteData();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container__master'>
            <div className="container__principal">
                <div className="box__title">
                    <p>Dados Cadastrados</p>
                </div>

                <div className="dados__cliente">
                    <div className="divs__dados">
                        <p>Nome</p>
                        <p>{cliente.nome}</p>
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria" />
                    </div>

                    <div className="divs__dados">
                        <p>Razão Social</p>
                        <p>{cliente.razao_social}</p>
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria" />
                    </div>

                    <div className="divs__dados">
                        <p>Email</p>
                        <p>{cliente.email}</p>
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria" />
                    </div>

                    <div className="divs__dados" id='ajuste__div'>
                        <p>Celular</p>
                        <p>{cliente.celular}</p>
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria" />
                    </div>

                    <div className="divs__dados">
                        <p>CPF ou CNPJ</p>
                        <p>{cliente.cnpj}</p>
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DadosCliente;
