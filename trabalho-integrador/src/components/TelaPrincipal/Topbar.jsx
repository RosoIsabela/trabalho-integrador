import './Topbar.css'
import logoEmpresa from '../../assets/logoSulagro.png'
import { User } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';


function Topbar(){
    return (
        <div className="containerTopbar">
            <div className="logoContainer"> 
                <img className="logo__empresa" src={logoEmpresa} alt="Logo da empresa" />
                <p className="titleEmpresa">
                    <span className="cor__1">Sul</span>
                    <span className="cor__2">Agro</span>    
                </p>
            </div>

            <div>
                <p id="topbarP">
                    <User size={30}/>
                    <Link className="topbarP__Login" to="tela-login-principal">Entrar</Link>
                </p>
            </div>

            
        </div>
    );
}

export default Topbar