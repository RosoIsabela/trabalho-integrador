import './selectsContratoCliente.css'
import { DownloadSimple } from "@phosphor-icons/react";

function SelectsContratoCliente() {
    return (
        <div>
            <div className="contrato__options">
                <div className="div__buttons">
                    <select className="contrato__selectBox" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Selecione o Protocolo</option>
                        <option value="protocolo1">12345 - Cultivar</option>
                        <option value="protocolo2">09876 - Nutrição</option>
                        <option value="protocolo3">01928 - Solo</option>
                    </select>

                    <button className="contrato__button">
                        Baixar Contrato
                        <div>
                            <DownloadSimple />
                        </div>
                    </button>
                
                </div>
                
                <div className="box__branca"></div>
  
            </div>
        </div>
    )
}

export default SelectsContratoCliente