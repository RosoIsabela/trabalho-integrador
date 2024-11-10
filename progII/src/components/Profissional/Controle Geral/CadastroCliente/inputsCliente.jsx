import './inputsCliente.css';

function inputsCliente() {
    return (
        <div>
            <div>
                <form className="div__inputsC">
                    <div className="boxC1">
                        <input className="inputs__boxsC" id="boxC1" type="text" placeholder="Nome"/>
                    </div>

                    <div>
                        <input className="inputs__boxsC" id="boxC2" type="text" placeholder="Sobrenome"/>
                    </div>

                    <div>
                        <input className="inputs__boxsC" id="boxC3" type="email" placeholder="Email"/>
                    </div>
                    
                    <div>
                        <input className="inputs__boxsC" id="boxC4" type="text" placeholder="Razão Social"/>
                    </div>

                    <div>
                        <input className="inputs__boxsC" id="boxC5" type="text" placeholder="CPF ou CNPJ"/>
                    </div>

                    <div>
                        <input className="inputs__boxsC" id="boxC6" type="text" placeholder="Cidade"/>
                    </div>

                    <div>
                        <input className="inputs__boxsC" id="boxC7" type="text" placeholder="Estado"/>
                    </div>
                    
                    <div>
                        <input className="inputs__boxsC" id="boxC8" type="text" placeholder="Celular"/>
                    </div>

                    <button className="button__formC">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default inputsCliente