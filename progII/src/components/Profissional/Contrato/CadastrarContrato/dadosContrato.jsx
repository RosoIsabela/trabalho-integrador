import './dadosContrato.css';
import Linha from "../../../../assets/Line 29.png";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DadosContrato() {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState('');
    const [protocolo, setProtocolos] = useState([]);
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

        fetch('http://localhost:4000/protocolos') 
            .then((response) => response.json())
            .then((data) => setProtocolos(data))
            .catch((error) => console.error("Erro ao buscar protocolos:", error));
    }, []);


    //função para selecionar o cliente
    const handleClienteSelect = (e) => {
        setCliente(e.target.value);
    };

    const SubmitCadastrar = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
          alert('Você precisa estar logado para cadastrar.');
          return;
        }

        console.log("Protocolo Selecionado:", dados.protocolo); 
      
        //validações
        if (!dados.contrato || !dados.dataContrato || !dados.dataEntrega || !dados.custo || !dados.parcelas || !cliente) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
        }
      
        try {
          const response = await fetch('http://localhost:4000/cadastrar-contrato', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, //passa o token para identificar o responsável
            },
            body: JSON.stringify({
              num_contrato: dados.contrato,
              protocolo_num: dados.protocolo,
              num_parcelas: dados.parcelas,
              preco: dados.custo,
              dt_assinatura: dados.dataContrato,
              dt_entrega: dados.dataEntrega,
              cliente_cnpj: cliente
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

                <form className="div__botoes">
                    <button className="button__cadastrar" type="submit" onClick={SubmitCadastrar}>Cadastrar</button>
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
                    <Link className="link_cadastrarProtocolo" to="/cadastrar-protocolo">Cadastrar Protocolo</Link>

                    
                    <select
                        className="inputs__DadosContrato"
                        name="text"
                        value={dados.protocolo || ''} 
                        onChange={(e) => {
                            setDados({ ...dados, protocolo: e.target.value });
                        }}
                    >
                        <option value="" disabled>Selecione o Protocolo</option>
                        {protocolo.map((protocolo) => (
                            <option key={protocolo.sigla} value={protocolo.sigla}>
                                {protocolo.tipo}
                            </option>
                        ))}
                    </select>
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
                        type="text" 
                        placeholder='dd/mm/aaaa'
                        value={dados.dataContrato || ''} 
                        onChange={(e) => setDados({ ...dados, dataContrato: e.target.value })} 
                    />
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data de Entrega do Relatório Final</p>
                    <input 
                        className="inputs__DadosContrato" 
                        type="text"
                        placeholder='dd/mm/aaaa' 
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
