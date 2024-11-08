import SideBar from "../DashBoard Cliente/sidebar";
import Configuracoes from "./configuracoes";
import PerfilSobre from "./perfilSobreCliente"

function ConfiguracoesCliente() {
    return (
        <div>
            <SideBar />
            <Configuracoes />
            <PerfilSobre />
        </div>
    );
}


export default ConfiguracoesCliente