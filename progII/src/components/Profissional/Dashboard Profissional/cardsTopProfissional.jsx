import './cardsTopProfissional.css';
import { useState, useEffect } from 'react';
import moment from 'moment';

function CardsTopProfissional({ cliente, contrato }) {
    const [dataEntrega, setDataEntrega] = useState('');
    const [maiorFase, setMaiorFase] = useState(0);

    // verifica data de entrega com base no cliente e no contrato selecionado
    useEffect(() => {
        const fetchDataEntrega = async () => {
            try {
                const response = await fetch(`http://localhost:4000/contratos/${cliente}/${contrato}`);
                const data = await response.json();

                if (data?.contrato?.dt_entrega) {
                    const dataFormatada = moment(data.contrato.dt_entrega).format('DD/MM/YYYY');
                    setDataEntrega(dataFormatada);
                } else {
                    setDataEntrega('__/__/____');
                }
            } catch (error) {
                console.error('Erro ao buscar a data de entrega:', error);
                setDataEntrega('__/__/____');
            }
        };

        fetchDataEntrega();
    }, [cliente, contrato]);

    // Atualiza as fases da pesquisa com base no valor máximo de fases cadastrada no banco, também com base no cliente e no contrato
    useEffect(() => {
        const fetchMaiorFase = async () => {
            try {
                const response = await fetch(`http://localhost:4000/pesquisas/fase-maior/${cliente}/${contrato}`);
                const data = await response.json();

                if (data?.maiorFase) {
                    setMaiorFase(Number(data.maiorFase));
                } else {
                    setMaiorFase(0); 
                }
            } catch (error) {
                console.error('Erro ao buscar a maior fase da pesquisa:', error);
                setMaiorFase(0); 
            }
        };

        fetchMaiorFase();
    }, [cliente, contrato]);

   
    const fasesCheckbox = [
        { id: 1, label: 'Avaliações Pré-Plantio' },
        { id: 2, label: 'Avaliação de Protocolo' },
        { id: 3, label: 'Avaliações de Colheita' },
        { id: 4, label: 'Componentes de Rendimento' },
        { id: 5, label: 'Relatório Final disponível' },
    ];

    return (
        <div className="div__boxsPIP">
            <div className="box3__entregaP">
                <p className="entrega__tituloP">Data de Entrega estimada do Relatório Final</p>
                <div className="entrega__dataP">
                    <p>{dataEntrega ?? 'Carregando...'}</p>
                </div>
            </div>

            <div className="box5__pesquisaP">
                <p className="titulo__pesquisaP">Andamento Da Pesquisa</p>

                <div className="checkbox__containerP">
                    {fasesCheckbox.map(({ id, label }) => (
                        <label key={id} className="checkbox__labelP">
                            <input 
                                type="checkbox" 
                                checked={id <= maiorFase} 
                                disabled
                            />
                            <p className="p__checkboxP">{label}</p>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CardsTopProfissional;
