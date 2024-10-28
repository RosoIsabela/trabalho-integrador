import SideBar from "../../Profissional/Dashboard Profissional/sidebarProfissional"
import Controle from "./controle"
import CardsCadastros from "./cardsCadastros"
import CardsGerenciar from "./cardsGerenciar"

function ControleGeral() {
    return (
        <div>
            <SideBar />
            <Controle />
            <CardsCadastros />
            <CardsGerenciar />
        </div>
    )
}


export default ControleGeral