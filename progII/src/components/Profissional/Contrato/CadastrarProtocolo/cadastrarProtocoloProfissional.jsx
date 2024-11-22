import SideBar from "../../Dashboard Profissional/sidebarProfissional"
import CadastrarProtocolo from "./cadastrarProtocolo"
import DadosProtocolo from "./dadosProtocolo"


function CadastrarProtocoloProfissional(){
    return (
        <div>
            <SideBar />
            <CadastrarProtocolo />
            <DadosProtocolo />
        </div>
    )

}

export default CadastrarProtocoloProfissional;