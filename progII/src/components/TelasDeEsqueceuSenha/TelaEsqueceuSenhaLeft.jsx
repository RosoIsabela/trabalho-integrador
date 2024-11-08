import './TelaEsqueceuSenhaLeft.css'
import logoEmpresa from '../../assets/logoSulagro.png'
import imgTelaLogin from '../../assets/imgEsqueceuSenha.png'

function TelaEsqueceuSenhaLeft() {
    return (
        <div className="left">
            <img className="logo__empresa" src={logoEmpresa} alt="logo da empresa"/>
            <p className="titleEmpresa">
                <span className="cor__1">Sul</span><span className="cor__2">Agro</span>    
            </p>
            <img className="imagem__login" src={imgTelaLogin} alt="homem em duvida sobre a senha"/>
        </div>
    )
}

export default TelaEsqueceuSenhaLeft