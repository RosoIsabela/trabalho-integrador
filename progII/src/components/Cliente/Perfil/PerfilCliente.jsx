import SideBar from "../DashBoard Cliente/sidebar"
import Perfil from "./perfil"
import DadosCliente from "./dadosCliente"


function PerfilCliente(){
    return (
        <div>
            <SideBar />
            <Perfil />
            <DadosCliente />
        </div>
    )
}



export default PerfilCliente