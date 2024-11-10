import './inputsProfissional.css';

function inputsProfissional() {
    return (
        <div>
            <div>
                <form className="div__inputsP">
                    <div className="boxP1">
                        <input className="inputs__boxsP" id="boxP1" type="text" placeholder="Nome"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP2" type="text" placeholder="Sobrenome"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP3" type="email" placeholder="Email"/>
                    </div>
                    
                    <div>
                        <input className="inputs__boxsP" id="boxP4" type="text" placeholder="Cargo"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP5" type="text" placeholder="CPF"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP6" type="text" placeholder="Cidade"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP7" type="text" placeholder="Estado"/>
                    </div>

                    <div>
                        <select className="inputs__boxsP" id="boxP8" name="select" defaultValue="opcao">
                            <option value="opcao" disabled>Tipo de Permissão</option>
                            <option value="permissao1">Funcionário</option>
                            <option value="permissao2">Coordenador de Equipe</option>
                            <option value="permissao3">Administrador</option>
                        </select>
                    </div>
                    
                    <div>
                        <input className="inputs__boxsP" id="boxP9" type="text" placeholder="Celular"/>
                    </div>

                    <div>
                        <input className="inputs__boxsP" id="boxP10" type="text" placeholder="Horário de Trabalho"/>
                    </div>

                    <button className="button__formP">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default inputsProfissional