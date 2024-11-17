import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TelaLoginBemVindo() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login
    const [openMessage, setOpenMessage] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [messageSeverity, setMessageSeverity] = useState("success");

    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/tela-login-principal", {
                email: username,
                password: passwd,
            });

            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem("token", response.data.token);

                // Redireciona para a página dashboard-cliente após o login bem-sucedido
                navigate("/dashboard-cliente");

                setIsLoggedIn(true); // Atualiza o estado de login
            } else {
                console.error("Falha na autenticação");
            }
        } catch (error) {
            console.log(error);
            setOpenMessage(true);
            setMessageText("Falha ao logar usuário!");
            setMessageSeverity("error");
        }
    }

    function cancelaLogin() {
        if (username !== "" || passwd !== "") {
            setUsername("");
            setPasswd("");
        }
        setOpenMessage(true);
        setMessageText("Login cancelado!");
        setMessageSeverity("warning");
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    return (
        <div className="bemVindoLogin">
            {isLoggedIn ? (
                <p>Bem-vindo ao sistema!</p> // Exibe mensagem caso o usuário já esteja logado
            ) : (
                <>
                    <p className="titlePrincipal">Bem-Vindo!</p>
                    <form className="input__login">
                        <input
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
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                        />
                        <button type="submit" className="button__login" onClick={enviaLogin}>
                            Entrar
                        </button>
                    </form>
                    <Link className="esqueceu__senha" to="/tela-esqueceu-senha">
                        Esqueceu a senha?
                    </Link>
                </>
            )}
        </div>
    );
}

export default TelaLoginBemVindo;
