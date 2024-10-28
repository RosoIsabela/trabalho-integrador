import './perfilSobreCliente.css'
import { Link } from 'react-router-dom';
import { UserCircle, Info } from "@phosphor-icons/react";

function PerfilSobreCliente() {
    return (
        <div>
            <div className="div__infos">
                <Link className="container-links" to="/perfilCliente">
                    <div className="perfil-sobre-container">
                        <UserCircle size={28} />
                        <div className="div__links">
                            <Link className="links__p" to="/perfilCliente">Perfil</Link>
                        </div> 
                    </div>
                </Link>

                <Link className="container-links" to="/sobreCliente">
                    <div className="perfil-sobre-container">
                        <Info size={28} />
                        <div className="div__links">
                            <Link className="links__p" to="/sobreCliente">Sobre a SulAgro</Link>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        
    );
}

export default PerfilSobreCliente