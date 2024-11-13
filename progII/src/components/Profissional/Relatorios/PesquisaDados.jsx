import { Image } from "@phosphor-icons/react";
import './PesquisaDados.css';

function PesquisaDados(){
    return (
        <div className="container">
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="clienteSelect">
                            <option value="" disabled selected>Selecionar Cliente</option>
                            <option value="cliente1">cliente1</option>
                            <option value="cliente2">cliente2</option>
                            <option value="cliente3">cliente3</option>
                            <option value="cliente4">cliente4</option>
                            <option value="cliente5">cliente5</option>
                            <option value="cliente6">cliente6</option>
                        </select>
                    </div>
                </nav>

                <div className="inputsContainers">
                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="tamanhoInput">Tamanho médio das plantas</label>
                        <input className="input__InserirText" type="text" id="tamanhoInput" placeholder="Digite aqui"/>
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="coloracaoInput">Coloração das folhas</label>
                        <input className="input__InserirText" type="text" id="coloracaoInput" placeholder="Digite aqui"/>
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="produtosInput">Outros produtos aplicados</label>
                        <input className="input__InserirText" type="text" id="produtosInput" placeholder="Digite aqui"/>
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="nosInput">Número médio de nós</label>
                        <input className="input__InserirText" type="text" id="nosInput" placeholder="Digite aqui"/>
                    </div>
                </div>
            </div>

            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="cultivarSelect">
                            <option value="" disabled selected>Protocolo</option>
                            <option value="cultivar1">Cultivar</option>
                            <option value="cultivar2">Folicular</option>
                            <option value="cultivar3">Semente</option>
                            <option value="cultivar4">Nutrição</option>
                            <option value="cultivar5">Solo</option>
                        </select>
                    </div>
                </nav>
                    
                <div className="inputsDate">
                    <label className="label__InserirDados" htmlFor="dateInput">Data da Coleta</label>
                    <input className="input__InserirDados" type="date" id="dateInput" value="2024-12-23"/>
                </div>

                <div className="inputsDate">
                    <label className="label__InserirDados" htmlFor="dateInput">Data da Aplicação</label>
                    <input className="input__InserirDados" type="date" id="dateInput" value="2024-12-23"/>
                </div>

                <label className="label__InserirDados" htmlFor="photoInput">Anexar Fotos</label>

                <div className="fotoContainer">
                    <input className="input__InserirFoto" type="file" id="FotoInput" multiple/> {/*onChange={handleFileChange}*/}

                    <button className="anexarFoto">Anexar</button>

                    <div className="fotosAnexadas">
                        <h3><Image/>Fotos anexadas:</h3>
                        <ul>
                            foto1.jpg
                        </ul>
                    </div>
                </div>

                <button className="saveButton">Salvar</button>
            </div>
                
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="faseSelect">
                            <option value="" disabled selected>Fase</option>
                            <option value="fase1">1</option>
                            <option value="fase2">2</option>
                            <option value="fase3">3</option>
                            <option value="fase4">4</option>
                        </select>
                    </div>
                </nav>

                <label className="label__InserirDados" htmlFor="descricao">Descrição</label>
                <div className="inputsNote">
                    <input className="input__InserirText" type="text" id="nosInput" placeholder="Nota técnica:"/>
                </div>
            </div>
        </div>
    )
}


export default PesquisaDados;