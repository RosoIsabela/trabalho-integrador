import './cardsCadastros.css'
import imgCliente from "../../../assets/clientes.png"
import imgFuncionario from "../../../assets/funcionarios.png"

function CardsCadastros() {
    return (
        <div className="container-super">
            <div className="container-superior">
                <div className="geral__cards">
                    <div className="card__cliente">
                        <div className="div__cadastraCliente">
                            <p className="card__title">Cadastrar Cliente</p>
                        </div>

                        <img src={imgCliente} alt="imagem moderna para cadastrar clientes" className="img__cards"/>
                    </div>

                    <div className="card__funcionario">
                        <div className="div__cadastraFuncionario">
                            <p className="card__title">Cadastrar Funcionário</p> 
                            
                        </div>

                        <img src={imgFuncionario} alt="varios usuarios funcionario" className="img__cards"/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardsCadastros