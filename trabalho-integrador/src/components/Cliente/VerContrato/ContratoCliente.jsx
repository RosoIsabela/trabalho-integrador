import SideBar from "../DashBoard Cliente/sidebar";
import VerContrato from "./verContrato";
import SelectsContrato from "./selectsContratoCliente";

function ContratoCliente() {
    return (
        <div>
            <SideBar />
            <VerContrato />
            <SelectsContrato />
        </div>
    );
}

export default ContratoCliente