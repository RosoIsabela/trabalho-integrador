import '../../Cliente/DashBoard Cliente/sidebar.css';
import logoEmpresa from '../../../assets/logoSulagro.png';
import { HouseLine, PencilLine, FileText, Gear, Cardholder, SignOut } from "@phosphor-icons/react";
import { Link, useNavigate } from 'react-router-dom';

function SideBarProfissional() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin', 
            });

            if (response.ok) {
                navigate("/tela-login-principal");
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de comunicação com o servidor:', error);
        }
    };

    return (
        <div className="sidebar">
            <img className="logo" src={logoEmpresa} alt="imagem com referência a uma planta com horizonte laranja e outros detalhes em verde." />
            <p className="SulAgro">SulAgro</p>
            <p className="subTitle">Profissional</p>

            <div>
                <button className="sidebarButton">
                    <p className="sidebarP">
                        <HouseLine />
                    </p>
                    <Link className="link__buttonSidebar" to="/dashboard-profissional">Home</Link>
                </button>

                <button className="sidebarButton">
                    <p className="sidebarP">
                        <PencilLine />
                    </p>
                    <Link className="link__buttonSidebar" to="/contrato-profissional">Contrato</Link>
                </button>

                <button className="sidebarButton">
                    <p className="sidebarP"> 
                        <FileText />
                    </p>
                    <Link className="link__buttonSidebar" to="/relatorios-profissional">Relatórios</Link>
                </button>


                <button className="sidebarButton">
                    <p className="sidebarP">
                        <Cardholder />
                    </p>
                    <Link className="link__buttonSidebar" to="/controle-geral">Controle Geral</Link>
                </button>
            
            
                <button className="sidebarButton">
                    <p className="sidebarP">
                        <Gear />
                    </p>
                    <Link className="link__buttonSidebar" to="/configuracoes-profissional">Configurações</Link>
                </button>
            </div>     

            {/* Corrigido o ícone de Logout e o evento de onClick */}
            <div className="sidebarDivClose">
                <button className="sidebarButtonClose" onClick={handleLogout}>
                    <p className="sidebarP">
                        <SignOut />
                    </p>
                    <span className="link__buttonSidebar">Sair</span>
                </button>
            </div>
        </div>
    );
}

export default SideBarProfissional;
