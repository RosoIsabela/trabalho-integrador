import SideBar from "../../Dashboard Profissional/sidebarProfissional";
import TitleGerenciaCliente from "./titleGerenciaCliente";
import DadosGerenciaCliente from "./DadosGerenciaCliente";


function GerenciarClientes() {
    return (
        <div>
            <SideBar />
            <TitleGerenciaCliente />
            <DadosGerenciaCliente />
        </div>
    )
}


export default GerenciarClientes