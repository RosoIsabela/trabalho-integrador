import Configuracoes from "./configuracoes"
import SideBar from "../Dashboard Profissional/sidebarProfissional"
import PerfilSobre from "../Configuracoes/perfilSobreProfissional"

function ConfiguracoesProfissional() {
    return (
        <div>
            <SideBar />
            <Configuracoes />
            <PerfilSobre />
        </div>
    )
}


export default ConfiguracoesProfissional