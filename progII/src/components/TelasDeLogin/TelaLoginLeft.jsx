import './TelaLoginLeft.css'
import logoEmpresa from '../../assets/logoSulagro.png'
import imgTelaLogin from '../../assets/imagemMulherDrone.png'

function TelaLoginLeft() {
    return (
        <div className="left">
            <img className="logo__empresa" src={logoEmpresa} alt="logo da empresa"/>
            <p className="titleEmpresa">
                <span className="cor__1">Sul</span>
                <span className="cor__2">Agro</span>
            </p>
            <img className="imagem__login" src={imgTelaLogin} alt="mulher com um drone"/>
        </div>
    )
}

export default TelaLoginLeft