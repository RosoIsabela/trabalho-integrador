import '../VerContrato/selectsContratoCliente.css'
import { DownloadSimple } from "@phosphor-icons/react";

function SelectsRelatoriosCliente() {
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

                    <select className="contrato__selectBox" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Qual etapa deseja?</option>
                        <option value="protocolo1">1º Etapa</option>
                        <option value="protocolo2">2º Etapa</option>
                        <option value="protocolo3">3º Etapa</option>
                    </select>
                </div>
                
                <div className="box__branca"></div>
  
            </div>
        </div>
    )
}

export default SelectsRelatoriosCliente