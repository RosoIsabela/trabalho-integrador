import { Link } from 'react-router-dom';

function ContainerEsqueceuSenha() {
    return (
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Esqueceu sua Senha</p>
            <form className="input__login" action="submit">
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="tel" id="phone" name="phone" placeholder="Telefone" required/>
                <Link className="button__login" to="/tela-login-principal">Enviar</Link>
            </form>

            <span className="pVoltar">Deseja Voltar?</span> <Link className="esqueceu__senha" to="/tela-login-principal">Login</Link>
        </div>
    )
}

export default ContainerEsqueceuSenha