import {Users, PaperClip, Image} from "@phosphor-icons/react";
import "./IncluirPesquisaDesign.css";

function IncluirPesquisa(){
    return(
        <div>
            <nav className="TopBarPesquisa">
                <div className="clienteSelecionado">
                    Cliente selecionado 
                    <Users/>
                </div>

                <div className="cultivarSelecionado">
                    Cultivar selecionado
                </div>

                <div className="faseSelecionada">
                    Fase selecionada
                </div>
            </nav>

            <div className="inputsContainers">
                <div className="inputsPesquisa">
                    <label htmlFor="tamanhoInput">Tamanho médio das plantas</label>
                    <input type="text" id="tamanhoInput" placeholder="Digite aqui"/>
                </div>

                <div className="inputsPesquisa">
                    <label htmlFor="coloracaoInput">Coloração das folhas</label>
                    <input type="text" id="coloracaoInput" placeholder="Digite aqui"/>
                </div>

                <div className="inputsPesquisa">
                    <label htmlFor="produtosInput">Outros produtos aplicados</label>
                    <input type="text" id="produtosInput" placeholder="Digite aqui"/>
                </div>

                <div className="inputsPesquisa">
                    <label htmlFor="nosInput">Número médio de nós</label>
                    <input type="text" id="nosInput" placeholder="Digite aqui"/>
                </div>
            </div>

            <div className="inputsDate">
                <label htmlFor="dateInput">Data da coleta</label>
                <input type="date" id="dateInput"/>
            </div>

            <div className="inputsPhotos">
                <input type="file" id="FotoInput" multiple/> {/*onChange={handleFileChange}*/}
                <label htmlFor="FotoInput">
                    Anexar Fotos 
                    <PaperClip />
                </label>

                <button className="anexarFoto">Anexar</button>

                <div className="fotosAnexadas">
                    <h3><Image/>Fotos anexadas:</h3>
                    <ul>
                        foto1.jpg
                        {/*
                        {fotos.map((foto, index) => (
                            <li key={index}>{foto}</li>
                        ))}
                        */}
                    </ul>
                </div>

                <div className="inputsNote"></div>
                    <label htmlFor="NotaInput">Nota Técnica:</label>
            </div>
        </div>
    )
}

export default IncluirPesquisa;