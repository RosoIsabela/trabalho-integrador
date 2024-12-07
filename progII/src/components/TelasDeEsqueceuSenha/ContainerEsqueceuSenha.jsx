import { useState } from 'react';
import { Link } from 'react-router-dom';

function ContainerEsqueceuSenha() {
    const [email, setEmail] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/tela-esqueceu-senha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, identificador, novasenha: novaSenha }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensagem("Senha atualizada com sucesso!");
            } else {
                setMensagem(data.message || "Erro ao atualizar a senha.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            setMensagem("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Esqueceu sua Senha</p>
            <form className="input__login" onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    id="identificador"
                    name="identificador"
                    placeholder="CPF ou CNPJ"
                    required
                    value={identificador}
                    onChange={(e) => setIdentificador(e.target.value)}
                />
                <input
                    type="password"
                    id="novaSenha"
                    name="novaSenha"
                    placeholder="Nova Senha"
                    required
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
                <button className="button__login" type="submit">Enviar</button>
            </form>

            {mensagem && <p className="mensagem">{mensagem}</p>}

            <span className="pVoltar">Deseja Voltar?</span>{" "}
            <Link className="esqueceu__senha" to="/tela-login-principal">Login</Link>
        </div>
    );
}

export default ContainerEsqueceuSenha;
