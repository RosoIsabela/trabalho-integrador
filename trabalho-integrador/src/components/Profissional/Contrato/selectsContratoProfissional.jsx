import '../../Cliente/VerContrato/selectsContratoCliente.css'
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react";
import { Link } from 'react-router-dom'; 

function SelectsContratoProfissional() {
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

                    <button className="contrato__button">
                        Baixar Contrato
                        <div className="icons__button">
                            <DownloadSimple />
                        </div>
                    </button>

                    <Link className="ajustando__links" to="/cadastrar-contrato">
                        <button className="contrato__button" id="ajuste__corButton">
                            Cadastrar Contrato
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

export default SelectsContratoProfissional