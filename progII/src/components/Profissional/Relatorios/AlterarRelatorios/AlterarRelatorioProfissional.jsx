import SideBar from "../../Dashboard Profissional/sidebarProfissional"
import AlterarRelatorio from "./alterarRelatorios"
import DadosRelatorio from "./dadosRelatorio"

function AlterarRelatorioProfissional(){
    return (
        <div>
            <SideBar />
            <AlterarRelatorio />
            <DadosRelatorio />
        </div>
    )

}

export default AlterarRelatorioProfissional;