import '../../Cliente/Configuracoes/perfilSobreCliente.css' 
import { Link } from 'react-router-dom';
import { UserCircle, Info } from "@phosphor-icons/react";

function PerfilSobreProfissional() {
    return (
        <div>
            <div className="div__infos">
                <Link className="container-links" to="/perfilProfissional">
                    <div className="perfil-sobre-container">
                        <UserCircle size={28} />
                        <div className="div__links">
                            <Link className="links__p" to="/perfilProfissional">Perfil</Link>
                        </div> 
                    </div>
                </Link>

                <Link className="container-links" to="/sobreProfissional">
                    <div className="perfil-sobre-container">
                        <Info size={28} />
                        <div className="div__links">
                            <Link className="links__p" to="/sobreProfissional">Sobre a SulAgro</Link>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        
    );
}

export default PerfilSobreProfissional