import './dadosContrato.css'
import Linha from "../../../../assets/Line 29.png"

function DadosContrato(){
    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro">Para Cadastrar OU</label>
                    <label className="p__cadastro2">Para Excluir</label>

                    <select className="button__box" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Selecione o Cliente</option>
                        <option value="cliente1">Fulano de Tal</option>
                        <option value="cliente2">Ciclano de Tal</option>
                        <option value="cliente3">Sei la de Tal</option>
                    </select>
                    {/*
                    <select className="button__box" name="select" defaultValue="opcao">
                        <option value="opcao" disabled>Qual é o Protocolo?</option>
                        <option value="protocolo1">12345 - Cultivar</option>
                        <option value="protocolo2">09876 - Nutrição</option>
                        <option value="protocolo3">01928 - Solo</option>
                    </select>
                    */}
                </div>
                
                <form className="div__botoes">
                    <button className="button__cadastrar">Cadastrar</button>
                    <button className="button__excluir">Excluir</button>
                </form>
                

            </div>

            <div className="box__branca">
                <form className="DadosDoContrato">
                    <p>Contrato</p>
                    <input className="inputs__DadosContrato" type="text" placeholder="Digite aqui"/>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Protocolo</p>
                    <input className="inputs__DadosContrato" type="text" placeholder="Digite aqui"/>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Número de Parcelas</p>
                    <input className="inputs__DadosContrato" type="text" placeholder="Digite aqui"/>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Custo</p>
                    <input className="inputs__DadosContrato" type="text" placeholder="Digite aqui"/>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data do Contrato</p>
                    <input className="inputs__DadosContrato" type="date"/>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Data de Entrega do Relatório Final</p>
                    <input className="inputs__DadosContrato" type="date"/>
                    <img src={Linha} alt="linha horizontal" />
                </form>
            </div>
        </div>
    )
}


export default DadosContrato