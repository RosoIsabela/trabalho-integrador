import SideBar from '../Dashboard Profissional/sidebarProfissional';
import IncluirPesquisa from './IncluirPesquisa';
import IncluirPesquisaTitulo from './IncluirPesquisaTitulo';

function Pesquisa() {
    return (
        <div>
            <SideBar />
            <IncluirPesquisaTitulo />
            <IncluirPesquisa />
        </div>
    );
}

export default Pesquisa;
