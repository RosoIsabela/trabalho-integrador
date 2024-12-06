import SideBar from "../../Profissional/Dashboard Profissional/sidebarProfissional"
import Controle from "./controle"
import CardsCadastros from "./cardsCadastros"


function ControleGeral() {
    return (
        <div>
            <SideBar />
            <Controle />
            <CardsCadastros />
        </div>
    )
}


export default ControleGeral