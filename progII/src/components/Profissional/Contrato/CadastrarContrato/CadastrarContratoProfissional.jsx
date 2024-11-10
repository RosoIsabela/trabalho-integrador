import SideBar from "../../Dashboard Profissional/sidebarProfissional"
import CadastrarContrato from "./cadastrarContrato"
import DadosContrato from "./dadosContrato"


function CadastrarContratoProfissional(){
    return (
        <div>
            <SideBar />
            <CadastrarContrato />
            <DadosContrato />
        </div>
    )

}

export default CadastrarContratoProfissional