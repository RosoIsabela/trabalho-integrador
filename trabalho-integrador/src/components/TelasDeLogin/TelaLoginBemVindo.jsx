import './TelaLoginLeft.css'
import { Link } from 'react-router-dom';

function TelaLoginBemVindo() {
    return (
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Bem-Vindo!</p>
            <form className="input__login" action="login">
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="password" id="password" name="password" placeholder="Senha" required/>
                <Link className="button__login" to="/dashboard-cliente">Entrar</Link>
            </form>
            <Link className="esqueceu__senha" to="/tela-esqueceu-senha">Esqueceu a senha?</Link>
        </div>
    )
}

export default TelaLoginBemVindo