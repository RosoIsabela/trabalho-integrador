import Topbar from "./Topbar"
import imgInicio from "../../assets/imginicio.png"

function TelaPrincipal() {
    return (
        <div>
            <Topbar />

            <img className="imgTelaPrincipal" src={imgInicio} alt="imagem inicial com a frase gerando soluções para seu negócio" />
        </div>
    );
}

export default TelaPrincipal