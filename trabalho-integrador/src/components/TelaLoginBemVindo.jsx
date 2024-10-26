function TelaLoginBemVindo() {
    return (
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Bem-Vindo!</p>
            <form className="input__login" action="login">
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="password" id="password" name="password" placeholder="Senha" required/>
                <button className="button__login" type="submit">Login</button>
            </form>
            <a className="esqueceu__senha" href="#">Esqueceu a senha?</a>
        </div>
    )
}

export default TelaLoginBemVindo