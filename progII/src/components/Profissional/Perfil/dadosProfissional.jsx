import { useState, useEffect } from 'react';
import '../../Cliente/Perfil/dadosCliente.css'
import lineDivisor from "../../../assets/linePerfil.png";
import axios from 'axios';

function DadosCliente() {
    //definindo o estado para armazenar os dados do colaborador
    const [colaborador, setColaborador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColaboradorData = async () => {
            try {
                const response = await axios.get('/perfilProfissional', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` //usando o token
                    }
                });
                setColaborador(response.data.colaborador);
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

        fetchColaboradorData();
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
                        <p>{colaborador.nome}</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                
                    
                    <div className="divs__dados">
                        <p>Cargo</p>
                        <p>{colaborador.cargo}</p>
                        
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                    <div className="divs__dados">
                        <p>Email</p>
                        <p>{colaborador.email}</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                    <div className="divs__dados" id="ajuste__div1">   
                        <p>Celular</p>
                        <p>{colaborador.celular}</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>


                    <div className="divs__dados">
                        <p>CPF</p>
                        <p>{colaborador.cpf}</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>

                    <div className="divs__dados" id="ajuste__div2">
                        <p>Horário de Trabalho </p>
                        <p>{colaborador.horario}</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}


export default DadosCliente