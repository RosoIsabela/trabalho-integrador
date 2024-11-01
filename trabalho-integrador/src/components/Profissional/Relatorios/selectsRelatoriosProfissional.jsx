import '../../Cliente/VerContrato/selectsContratoCliente.css';
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react";
import { Link } from 'react-router-dom'; 

function SelectsRelatoriosProfissional() {
    return (
        <div>
            <div className="contrato__options">
                <div className="div__buttons">
                    <select className="contrato__selectBox" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Selecione o Cliente</option>
                        <option value="protocolo1">Empresa X</option>
                        <option value="protocolo2">Empresa Y</option>
                        <option value="protocolo3">Empresa Z</option>
                    </select>

                    <select className="contrato__selectBox" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Selecione o Protocolo</option>
                        <option value="protocolo1">12345 - Cultivar</option>
                        <option value="protocolo2">09876 - Nutrição</option>
                        <option value="protocolo3">01928 - Solo</option>
                    </select>

                    <select className="contrato__selectBox" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Qual etapa deseja?</option>
                        <option value="protocolo1">1º Etapa</option>
                        <option value="protocolo2">2º Etapa</option>
                        <option value="protocolo3">3º Etapa</option>
                    </select>

                    <button className="contrato__button">
                        Baixar Relatório
                        <div className="icons__button">
                            <DownloadSimple />
                        </div>
                    </button>

                    <Link className="ajustando__links" to="/incluir-pesquisa">
                        <button className="contrato__button" id="ajuste__corButton">
                            Incluir dados da Pesquisa
                            <div className="icons__button">
                                <ArrowRight />
                            </div>
                        </button>
                    </Link>
                </div>

                <div className="box__branca"></div>
            </div>
        </div>
    )
}

export default SelectsRelatoriosProfissional;
