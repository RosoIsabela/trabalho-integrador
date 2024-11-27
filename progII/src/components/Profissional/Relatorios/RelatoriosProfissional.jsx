import SideBar from "../../Profissional/Dashboard Profissional/sidebarProfissional";
import Relatorios from "./Relatorio";
import SelectsRelatorios from "./selectsRelatorioProfissional"


function RelatoriosProfissional() {
    return (
        <div>
            <SideBar />
            <Relatorios />
            <SelectsRelatorios />
        </div>
    )
}

export default RelatoriosProfissional