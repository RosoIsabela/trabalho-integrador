import '../../Cliente/VerContrato/selectsContratoCliente.css'
import Linha from "../../../assets/Line 29.png";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';

function SelectsContratoProfissional() {
    const [cliente, setCliente] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [dados, setDados] = useState({
        contrato: '',
        protocolo: '',
        parcelas: '',
        custo: '',
        dataContrato: '',
        dataEntrega: ''
    });

    useEffect(() => {
        if (cliente && protocolo) { // Só faz a requisição se ambos os campos estiverem preenchidos
            const chave = `${cliente}-${protocolo}`;
            fetch(`/contrato-profissional?cliente=${chave}`)
                .then(response => response.json())
                .then(data => setDados(data))
                .catch(error => console.error('Erro ao buscar dados:', error));
        }
    }, [cliente, protocolo]);

    return (
        <div>
            <div className="contrato__options">
                <div className="div__buttons">
                    <select className="contrato__selectBox" name="selectCliente" defaultValue="opcao" onChange={(e) => setCliente(e.target.value)}> 
                        <option value="opcao" disabled>Selecione o Cliente</option>
                        <option value="empresaX">Empresa X</option>
                        <option value="empresaY">Empresa Y</option>
                        <option value="empresaZ">Empresa Z</option>
                    </select>

                    <select className="contrato__selectBox" name="selectProtocolo" defaultValue="opcao" onChange={(e) => setProtocolo(e.target.value)}>
                        <option value="opcao" disabled>Selecione o Protocolo</option>
                        <option value="12345">12345 - Cultivar</option>
                        <option value="09876">09876 - Nutrição</option>
                        <option value="10293">10293 - Solo</option>
                    </select>

                    <Link className="ajustando__links" to="/cadastrar-contrato">
                        <button className="contrato__button" id="ajuste__corButton">
                            Cadastrar Contrato
                            <div className="icons__button">
                                <ArrowRight />
                            </div>
                        </button>
                    </Link>
                </div>
                
                <div className="box__branca">
                    <form className="DadosDoContrato">
                        <p>Contrato</p>
                        <input className="inputs__DadosContrato" type="text" value={dados.contrato} readOnly/>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Protocolo</p>
                        <input className="inputs__DadosContrato" type="text" value={dados.protocolo} readOnly/>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Número de Parcelas</p>
                        <input className="inputs__DadosContrato" type="text" value={dados.parcelas} readOnly/>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Custo</p>
                        <input className="inputs__DadosContrato" type="text" value={dados.custo} readOnly/>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Data do Contrato</p>
                        <input className="inputs__DadosContrato" type="date" value={dados.dataContrato} readOnly/>
                        <img src={Linha} alt="linha horizontal" />

                        <p>Data de Entrega do Relatório Final</p>
                        <input className="inputs__DadosContrato" type="date" value={dados.dataEntrega} readOnly/>
                        <img src={Linha} alt="linha horizontal" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SelectsContratoProfissional