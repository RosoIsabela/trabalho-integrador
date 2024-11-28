import SideBar from "../../Dashboard Profissional/sidebarProfissional"
import AlterarContrato from "./alterarContrato"
import AlterarDados from "./alterarDados"


function AlterarContratoProfissional(){
    return (
        <div>
            <SideBar />
            <AlterarContrato />
            <AlterarDados />
        </div>
    )

}

export default AlterarContratoProfissional