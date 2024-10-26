import logoEmpresa from '../assets/logoSulagro.png'
import {HouseLine} from 'phosphor-react'
import {PencilLine} from 'phosphor-react'
import {FileText} from 'phosphor-react'
import {CloudArrowUp} from 'phosphor-react'
import {Gear} from 'phosphor-react'
import {SignOut} from 'phosphor-react'

function Sidebar() {
    return (
        <div className="sidebar">
            <img className="logo" src={logoEmpresa} alt="imagem com referência a uma planta com horizonte laranja e outros detalhes em verde." />
            <h1 className="SulAgro">Sul Agro</h1>

            <button id="sidebarButton">
                <p>
                    <HouseLine/>
                    Home
                </p>
            </button>

            <button id="sidebarButton">
                <p>
                    <PencilLine/>
                    Ver Contrato
                </p>
            </button>

            <button id="sidebarButton">
                <p> 
                    <FileText/>
                    Relatórios
                </p>
            </button>
            
            <button id="sidebarButton">
                <p>
                    <CloudArrowUp/>
                    Registrar
                </p>
            </button>
        
        
            <button id="sidebarButton">
                <p>
                    <Gear/>
                    Configurações
                </p>
            </button>
        
        
            <button id="sidebarButtonClose">
                <p>
                    <SignOut/>
                    Sair
                </p>
            </button>
            
        </div>
    );
}

export default Sidebar;
