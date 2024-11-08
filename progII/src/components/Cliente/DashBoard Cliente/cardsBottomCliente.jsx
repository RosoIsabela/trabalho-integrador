import './cardsBottomCliente.css'
import graficoPizza from '../../../assets/graficoempizza.png'

function CardsBottomCliente() {
    return (
        <div className="div__boxsPI2">
            <div className="box4__protocolo">
                <p className="">Andamento do Protocolo (%)</p>

                <div >
                    <img className="image-container" src={graficoPizza} alt="grafico andamento da pesquisa"/>
                </div>
                
            </div>
            

            <div className="box5__pesquisa">
                <p className="titulo__pesquisa">Andamento Da Pesquisa</p>

                <div className="checkbox__container">
                    <label className="checkbox__label">
                        <input type="checkbox" />
                        <p className="p__checkbox">Avaliações Pré Plantio</p>
                    </label>

                    <label className="checkbox__label">
                        <input type="checkbox" />
                        <p className="p__checkbox">Avaliação de Protocolo</p>
                    </label>

                    <label className="checkbox__label">
                        <input type="checkbox" />
                        <p className="p__checkbox">Avaliações de Colheita</p>
                    </label>

                    <label className="checkbox__label">
                        <input type="checkbox" />
                        <p className="p__checkbox">Componentes de Rendimento</p>
                    </label>

                    <label className="checkbox__label">
                        <input type="checkbox" />
                        <p className="p__checkbox">Relatório Final disponível</p>
                    </label>
                </div>
            </div>
        </div>
    )
}


export default CardsBottomCliente