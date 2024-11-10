import SideBar from "../../Dashboard Profissional/sidebarProfissional";
import TileGerenciaFuncionrio from "./titleGerenciaFuncionario";
import DadosGerenciaFuncionario from "./DadosGerenciaFuncionario";


function GerenciarFuncionario(){
    return (
        <div>
            <SideBar />
            <TileGerenciaFuncionrio />
            <DadosGerenciaFuncionario />
        </div>
    )
}


export default GerenciarFuncionario