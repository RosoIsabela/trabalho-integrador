import './cardsGerenciar.css'
import { Link } from 'react-router-dom'; 
import GerenciarClientes from './GerenciarClientes/GerenciarClientes';

function CardsGerenciar() {
    return (
        <div className="container-buttons">
            <div className="geral__gerenciar">
                <Link to="/gerenciar-clientes">
                    <button className="cards__gerenciar">
                        <div className="gerenciar__cliente">
                            <p className="title__gerenciar">Gerenciar Clientes<br/>Cadastrados</p>
                        </div>
                    </button>
                </Link>

                <Link to="/gerenciar-funcionarios">
                    <button className="cards__gerenciar">
                        <div className="gerenciar__funcionario">
                            <p className="title__gerenciar">Gerenciar Funcionários<br/>Cadastrados</p>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default CardsGerenciar