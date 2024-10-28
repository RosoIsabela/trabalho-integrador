import './cardsTopCliente.css'

function CardsTopCliente() {
    return (
        <div className="div__boxsPI">    {/* PI - significa pagina inicial/home*/}
            <div className="box1__tratamentos">
                <p >Nº de tratamentos</p>
                <p className="title__cards">10</p>
            </div>
            
            <div className="box2__custo">
                <p>Custo</p>
                <p className="title__cards">R$2.000</p>
            </div>
            
            <div className="box3__entrega">
                <p className="entrega__titulo">Data de Entrega estimada</p>
                <div className="entrega__data">
                    <p>30 de dezembro, 2025</p>
                </div>
            </div>
            
        </div>
    )
}


export default CardsTopCliente