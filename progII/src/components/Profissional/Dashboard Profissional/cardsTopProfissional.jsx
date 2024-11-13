import './cardsTopProfissional.css'
import lineDivisor from "../../../assets/linePerfil.png";

function CardsTopProfissional() {
    return (
        <div className="div__boxsPIP">    {/* PI - significa pagina inicial/home e P - Profissional*/}
            <div className="box3__entregaP">
                <p className="entrega__tituloP">Data de Entrega estimada do Relatório Final</p>
                <div className="entrega__dataP">
                    <p>30 de dezembro, 2025</p>
                </div>
            </div>
            

            <div className="box5__pesquisaP">
                <p className="titulo__pesquisaP">Andamento Da Pesquisa</p>

                <div className="checkbox__containerP">
                    <label className="checkbox__labelP">
                        <input type="checkbox" />
                        <p className="p__checkboxP">Avaliações Pré Plantio</p>
                    </label>

                    <label className="checkbox__labelP">
                        <input type="checkbox" />
                        <p className="p__checkboxP">Avaliação de Protocolo</p>
                    </label>

                    <label className="checkbox__labelP">
                        <input type="checkbox" />
                        <p className="p__checkboxP">Avaliações de Colheita</p>
                    </label>

                    <label className="checkbox__labelP">
                        <input type="checkbox" />
                        <p className="p__checkboxP">Componentes de Rendimento</p>
                    </label>

                    <label className="checkbox__labelP">
                        <input type="checkbox" />
                        <p className="p__checkboxP">Relatório Final disponível</p>
                    </label>

                    <button className="atualiza-andamentoP">
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