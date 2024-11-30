import './cardsBottomCliente.css';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import moment from 'moment';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function CardsBottomCliente({ contratoSelecionado }) {
    const [maiorFase, setMaiorFase] = useState(0);
    const [dadosPesquisa, setDadosPesquisa] = useState({
        dataColeta: '', 
        tamanhoPlantas: '',
        coloracaoFolhas: '',
        numNos: '',
        clima: '',
    });

    // Busca a maior fase concluída da pesquisa
    useEffect(() => {
        const fetchMaiorFase = async () => {
            try {
                const response = await fetch(`http://localhost:4000/pesquisas/fase-maior/${contratoSelecionado}`);
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

        // busca os dados da última coleta de dados realizada
        const fetchDadosPesquisa = async () => {
            try {
                const response = await fetch(`http://localhost:4000/pesquisas/ultimos-dados/${contratoSelecionado}`);
                const data = await response.json();

                if (data) {
                    setDadosPesquisa({
                        dataColeta: data.data_coleta ? moment(data.data_coleta).format('DD/MM/YYYY') : '', 
                        tamanhoPlantas: data.tamanho_plantas || '',
                        coloracaoFolhas: data.coloracao_folhas || '',
                        numNos: data.num_nos || '',
                        clima: data.clima || '',
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar os últimos dados da pesquisa:', error);
            }
        };

        fetchMaiorFase();
        fetchDadosPesquisa();
    }, [contratoSelecionado]);

    
    const chartData = {
        labels: ['Concluído', 'Pendente'],
        datasets: [
            {
                label: 'Andamento do Protocolo (%)',
                data: [maiorFase * 20, (5 - maiorFase) * 20], 
                backgroundColor: ['#7cb518', '#fb6107'], 
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

  
    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || '';
                        let value = context.raw || 0;
                        return `${label}: ${value}%`;
                    },
                },
            },

            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    return `${value}%`; 
                },
                font: {
                    weight: 'bold',
                    size: 16,
                },
                align: 'center', 
                anchor: 'center',
            },
        },
    };

    return (
        <div className="div__boxsPI2">
            <div className="box4__protocolo">
                <p className="">Andamento do Protocolo (%)</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                    <Pie data={chartData} options={options} />
                </div>
            </div>

            <div className="box5__pesquisa">
                <p className="titulo__pesquisa">Últimos dados coletados:</p>

                <div className="dados__container">
                    <p><strong>Data da coleta:</strong> {dadosPesquisa.dataColeta || '-'}</p>
                    <p><strong>Tamanho médio das plantas:</strong> {dadosPesquisa.tamanhoPlantas || '-'}</p>
                    <p><strong>Coloração das folhas:</strong> {dadosPesquisa.coloracaoFolhas || '-'}</p>
                    <p><strong>Número médio de nós:</strong> {dadosPesquisa.numNos || '-'}</p>
                    <p><strong>Clima:</strong> {dadosPesquisa.clima || '-'}</p>
                </div>
            </div>
        </div>
    );
}

export default CardsBottomCliente;
