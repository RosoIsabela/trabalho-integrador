import SideBar from "../../Profissional/Dashboard Profissional/sidebarProfissional";
import Pesquisa from "./Pesquisa";
import PesquisaDados from "./PesquisaDados";

function PesquisaProfissional(){
    return (
        <div>
            <SideBar />
            <Pesquisa />
            <PesquisaDados />
        </div>
    );
}

export default PesquisaProfissional