import './dadosContrato.css';
import Linha from "../../../../assets/Line 29.png";
import { useState, useEffect } from 'react';

function DadosContrato() {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState('');
    const [dados, setDados] = useState({
        contrato: '',
        dataContrato: '',
        dataEntrega: '',
        custo: '',
        protocolo: '',
        parcelas: '',
    });

    useEffect(() => {
        fetch('http://localhost:4000/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));
    }, []);

    //função para enviar os dados do contrato
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/incluir-pesquisa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, //passa o token para identificar o responsável
                },
                body: JSON.stringify({
                    num_contrato: dados.contrato,
                    dt_assinatura: dados.dataContrato,
                    dt_entrega: dados.dataEntrega,
                    preco: dados.custo,
                    num_parcelas: dados.parcelas,
                    cliente_cnpj: cliente,
                    protocolo_num: dados.protocolo,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar os dados!');
            }
            alert('Informações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao salvar as informações. Tente novamente.');
        }
    };

    //função para selecionar o cliente
    const handleClienteSelect = (e) => {
        setCliente(e.target.value);
    };

    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro">Para Cadastrar OU</label>
                    <label className="p__cadastro2">Para Excluir</label>

                    <select
                        className="contrato__selectBox"
                        name="selectCliente"
                        defaultValue="opcao"
                        onChange={handleClienteSelect}
                    >
                        <option value="opcao" disabled>Selecione o Cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.cnpj} value={cliente.cnpj}>
                                {cliente.razao_social}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="div__botoes" onSubmit={handleSubmit}>
                    <button className="button__cadastrar" type="submit">Cadastrar</button>
                    <button className="button__excluir">Excluir</button>
                </form>
            </div>

            <div className="box__branca">
                <form className="DadosDoContrato">
                    <p>Contrato</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="text" 
                        placeholder="código do contrato" 
                        value={dados.contrato || ''} 
                        onChange={(e) => setDados({ ...dados, contrato: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Protocolo</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="text" 
                        value={dados.protocolo || ''} 
                        onChange={(e) => setDados({ ...dados, protocolo: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Número de Parcelas</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="text" 
                        value={dados.parcelas || ''} 
                        onChange={(e) => setDados({ ...dados, parcelas: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Custo</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="text" 
                        value={dados.custo || ''} 
                        onChange={(e) => setDados({ ...dados, custo: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data do Contrato</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="date" 
                        value={dados.dataContrato || ''} 
                        onChange={(e) => setDados({ ...dados, dataContrato: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data de Entrega do Relatório Final</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="date" 
                        value={dados.dataEntrega || ''} 
                        onChange={(e) => setDados({ ...dados, dataEntrega: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />
                </form>
            </div>
        </div>
    );
}

export default DadosContrato;
