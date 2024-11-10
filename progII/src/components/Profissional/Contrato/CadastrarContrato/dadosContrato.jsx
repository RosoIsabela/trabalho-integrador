import './dadosContrato.css'

function DadosContrato(){
    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro">Para Cadastrar</label>
                    <button className="button__box">
                        Adicionar Arquivo PDF
                    </button>
                </div>

                <div className="divAdicionarPDF">
                    <label className="p__cadastro">Para Cadastrar OU</label>
                    <label className="p__cadastro2">Para Excluir</label>

                    <select className="button__box" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Selecione o Cliente</option>
                        <option value="cliente1">Fulano de Tal</option>
                        <option value="cliente2">Ciclano de Tal</option>
                        <option value="cliente3">Sei la de Tal</option>
                    </select>

                    <select className="button__box" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Qual é o Protocolo?</option>
                        <option value="protocolo1">12345 - Cultivar</option>
                        <option value="protocolo2">09876 - Nutrição</option>
                        <option value="protocolo3">01928 - Solo</option>
                    </select>
                </div>
                <div className="div__botoes">
                    <p className="button__cadastrar">Cadastrar</p>
                    <p className="button__excluir">Excluir</p>
                </div>

            </div>

            <div className="box__branca"></div>
        </div>
    )
}


export default DadosContrato