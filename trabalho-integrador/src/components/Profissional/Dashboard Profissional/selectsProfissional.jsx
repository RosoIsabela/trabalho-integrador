import './selectsProfissional.css'

function selectsProfissional() {
    return (
        <div className="div__selects">
            <div className="box__ajustes">
                <select className="selectsBoxs2" name="select" defaultValue="opcao">
                    <option value="opcao" disabled>Selecione a Cidade</option>
                    <option value="cidade1">Nonoai</option>
                    <option value="cidade2">Chapeco</option>
                    <option value="cidade3">Bage</option>
                </select>
            </div>

            <div className="box__ajustes">
                <select className="selectsBoxs2" name="select" defaultValue="opcao">
                    <option value="opcao" disabled>Selecione o Protocolo</option>
                    <option value="protocolo1">12345 - Cultivar</option>
                    <option value="protocolo2">09876 - Nutrição</option>
                    <option value="protocolo3">01928 - Solo</option>
                </select>
            </div>


            <div className="box__ajustes">
                <select className="selectsBoxs2" name="select" defaultValue="opcao">
                    <option value="opcao" disabled>Selecione o Cliente</option>
                    <option value="protocolo1">Empresa X</option>
                    <option value="protocolo2">Empresa Y</option>
                    <option value="protocolo3">Empresa Z</option>
                </select>
            </div>
        </div>
    )
}


export default selectsProfissional