import SideBar from "../../Dashboard Profissional/sidebarProfissional"
import CadastroCliente from "./cadastroCliente"
import InputsCliente from "./inputsCliente"


function CadastroDoCliente() {
    return (
        <div>
            <SideBar />
            <CadastroCliente />
            <InputsCliente />
        </div>
    )
}


export default CadastroDoCliente