import './TelaLoginLeft.css'
import { Link, useNavigate } from 'react-router-dom';


function TelaLoginBemVindo() {
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault(); // Impede o comportamento padrão do formulario

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:4000/tela-login-principal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);

                if (data.tipo === 'cliente') {
                    navigate("/dashboard-cliente");
                } else if (data.tipo === 'profissional') {
                    navigate("/dashboard-profissional");
                }
            } else {
                alert("Login falhou! Verifique seu email e senha.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }


    return ( 
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Bem-Vindo!</p>
            <form className="input__login" onSubmit={login}>
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="password" id="password" name="password" placeholder="Senha" required/>
                <button type="submit" className="button__login">Entrar</button> 
            </form>
            <Link className="esqueceu__senha" to="/tela-esqueceu-senha">Esqueceu a senha?</Link>
        </div>
    )
}

export default TelaLoginBemVindo