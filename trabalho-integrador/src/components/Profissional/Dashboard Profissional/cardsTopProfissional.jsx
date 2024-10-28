import './cardsTopProfissional.css'
import lineDivisor from "../../../assets/linePerfil.png";

function CardsTopProfissional() {
    return (
        <div className="div__boxsPI">    {/* PI - significa pagina inicial/home*/}
            <div className="box3__entrega">
                <p className="entrega__titulo">Data de Entrega estimada do Relatório Final</p>
                <div className="entrega__data">
                    <p>30 de dezembro, 2025</p>
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

                    <button className="atualiza-andamento">
                        <div >
                            <p>Atualizar Andamento</p>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}


export default CardsTopProfissional