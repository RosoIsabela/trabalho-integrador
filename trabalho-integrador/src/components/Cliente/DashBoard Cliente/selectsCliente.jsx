import './selectsCliente.css'

function selectsCliente() {
    return (
        <div className="div__selects">
            <select className="selectsBoxs" name="select" defaultValue="opcao">
                <option value="opcao" disabled>Selecione a Cidade</option>
                <option value="cidade1">Nonoai</option>
                <option value="cidade2">Chapeco</option>
                <option value="cidade3">Bage</option>
            </select>

            <select className="selectsBoxs" name="select" defaultValue="opcao">
                <option value="opcao" disabled>Selecione o Protocolo</option>
                <option value="protocolo1">12345 - Cultivar</option>
                <option value="protocolo2">09876 - Nutrição</option>
                <option value="protocolo3">01928 - Solo</option>
            </select>
        </div>
    )
}


export default selectsCliente