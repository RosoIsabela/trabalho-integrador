import SideBar from "../DashBoard Cliente/sidebar";
import VerRelatorios from "./verRelatorios";
import SelectsRelatorios from "./selectsRelatoriosCliente"

function RelatoriosCliente() {
    return (
        <div>
            <SideBar />
            <VerRelatorios />
            <SelectsRelatorios />
        </div>
    );
}

export default RelatoriosCliente