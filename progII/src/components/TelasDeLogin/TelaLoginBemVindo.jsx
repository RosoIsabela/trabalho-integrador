import './TelaLoginLeft.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function TelaLoginBemVindo() {
    const tipoCliente = 'cliente'
    const tipoProfissional = 'profissional'

    const navigate = useNavigate();

    function login() {
        const usuario = {
            "nome": "Isa",
            "tipo": "profissional"
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        //Quando for pegar um usuario usar -> const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (usuario.tipo == tipoCliente){
            navigate("/dashboard-cliente");
        }
        else if (usuario.tipo == tipoProfissional){
            navigate("/dashboard-profissional");
        }
    }


    return ( 
        <div className="bemVindoLogin">
            <p className="titlePrincipal">Bem-Vindo!</p>
            <form className="input__login" action="login">
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <input type="password" id="password" name="password" placeholder="Senha" required/>
                <button onClick={login} className="button__login">Entrar</button> 
            </form>
            <Link className="esqueceu__senha" to="/tela-esqueceu-senha">Esqueceu a senha?</Link>
        </div>
    )
}

export default TelaLoginBemVindo