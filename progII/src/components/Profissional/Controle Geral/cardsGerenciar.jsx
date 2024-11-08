import './cardsGerenciar.css'

function CardsGerenciar() {
    return (
        <div className="container-buttons">
            <div className="geral__gerenciar">
                <button className="cards__gerenciar">
                    <div className="gerenciar__cliente">
                        <p className="title__gerenciar">Gerenciar Clientes<br/>Cadastrados</p>
                    </div>
                </button>

                <button className="cards__gerenciar">
                    <div className="gerenciar__funcionario">
                        <p className="title__gerenciar">Gerenciar Funcionários<br/>Cadastrados</p>
                    </div>
                </button>
            </div>
        </div>
    )
}


export default CardsGerenciar