import './TelaLoginLeft.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function TelaLoginBemVindo() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/tela-login-principal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email":username, "senha":password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                
                //Propriedade 'permissao' do usuário é recebida no payload do token jwt
                //Necessário decodificar o token recebido para acessar a propriedade requerida.
                const payload = jwtDecode(token);
                const permissao = payload?.permissao;

                //redireciona com base no tipo de usuário
                if (parseInt(permissao, 10) === 0) {
                    navigate("/dashboard-cliente");
                } else if (parseInt(permissao, 10) === 1 || parseInt(permissao, 10) === 2 || parseInt(permissao, 10) === 3) {
                    navigate("/dashboard-profissional");
                } else {
                    alert("Tipo de usuário inválido!");
                }
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Login falhou! Verifique suas credenciais.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    }

    return ( 
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Bem-Vindo!</p>
            <form className="input__login" onSubmit={login}>
                <input
                    className="email__login"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit" className="button__login">Entrar</button> 
            </form>
            
        </div>
    );
}

export default TelaLoginBemVindo;