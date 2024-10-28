import '../../Cliente/DashBoard Cliente/sidebar.css';
import logoEmpresa from '../../../assets/logoSulagro.png';
import { HouseLine, PencilLine, FileText, Gear, Cardholder, SignOut} from "@phosphor-icons/react";
import { Link } from 'react-router-dom';


function SideBarProfissional() {
    return (
        <div className="sidebar">
            <img className="logo" src={logoEmpresa} alt="imagem com referência a uma planta com horizonte laranja e outros detalhes em verde."/>
            <p className="SulAgro">SulAgro</p>
            <p className="subTitle">Profissional</p>

            <div>
                <button className="sidebarButton">
                    <p className="sidebarP">
                        <HouseLine/>
                    </p>
                    <Link className="link__buttonSidebar" to="/dashboard-profissional">Home</Link>
                </button>

                <button className="sidebarButton">
                    <p className="sidebarP">
                        <PencilLine/>
                    </p>
                    <Link className="link__buttonSidebar" to="/contrato-profissional">Contrato</Link>
                </button>

                <button className="sidebarButton">
                    <p className="sidebarP"> 
                        <FileText/>
                    </p>
                    <Link className="link__buttonSidebar" to="/relatorios-profissional">Relatórios</Link>
                </button>


                <button className="sidebarButton">
                    <p className="sidebarP">
                        <Cardholder/>
                    </p>
                    <Link className="link__buttonSidebar" to="/controle-geral">Controle Geral</Link>
                </button>
            
            
                <button className="sidebarButton">
                    <p className="sidebarP">
                        <Gear/>
                    </p>
                    <Link className="link__buttonSidebar" to="/configuracoes-profissional">Configurações</Link>
                </button>
            </div>     


            <div className="sidebarDivClose">
                <button className="sidebarButtonClose">
                    <p className="sidebarP">
                        <SignOut className="rotacao__ButtonClose"/>
                    </p>
                    <Link className="link__buttonSidebar" to="/tela-login-principal">Sair</Link>
                </button>
            </div>
        </div>
    );
}

export default SideBarProfissional

