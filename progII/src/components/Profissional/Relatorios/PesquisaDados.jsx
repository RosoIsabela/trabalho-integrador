import { Image } from "@phosphor-icons/react";
import './PesquisaDados.css';
import axios from "axios";

const PesquisaDados = () => {
    const [formData, setFormData] = useState({
        cod : "",
        dt_coleta : "",
        dt_apl_prod : "",
        tm_plantas : "",
        cor_folhas : "",
        outros_prod : "",
        clima : "",
        fase : "",
        obs : "",
        psq_contratada : "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.cpf || !formData.nome_completo || !formData.email) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        console.log("Dados enviados:", formData);

        try {
            const response = await axios.post("http://localhost:4000/create-");
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="clienteSelect" name="cliente" required>
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
                        <input className="input__InserirText" type="text" id="tamanhoInput" name="tamanho" placeholder="Digite aqui" required />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="coloracaoInput">Coloração das folhas</label>
                        <input className="input__InserirText" type="text" id="coloracaoInput" name="coloracao" placeholder="Digite aqui" required />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="produtosInput">Outros produtos aplicados</label>
                        <input className="input__InserirText" type="text" id="produtosInput" name="produtos" placeholder="Digite aqui" required />
                    </div>

                    <div className="inputsPesquisa">
                        <label className="label__InserirDados" htmlFor="nosInput">Número médio de nós</label>
                        <input className="input__InserirText" type="text" id="nosInput" name="nos" placeholder="Digite aqui" required />
                    </div>
                </div>
            </div>

            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="cultivarSelect" name="cultivar" required>
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
                    <input className="input__InserirDados" type="date" id="dateInput" name="data_coleta" defaultValue="2024-12-23" required />
                </div>

                <div className="inputsDate">
                    <label className="label__InserirDados" htmlFor="dateInput">Data da Aplicação</label>
                    <input className="input__InserirDados" type="date" id="dateInput" name="data_aplicacao" defaultValue="2024-12-23" required />
                </div>

                <label className="label__InserirDados" htmlFor="photoInput">Anexar Fotos</label>

                <div className="fotoContainer">
                    <input className="input__InserirFoto" type="file" id="FotoInput" name="fotos" multiple />
                    <button className="anexarFoto" type="button">Anexar</button>

                    <div className="fotosAnexadas">
                        <h3><Image /> Fotos anexadas:</h3>
                        <ul>
                            foto1.jpg
                        </ul>
                    </div>
                </div>

                <button className="saveButton" type="submit">Salvar</button>
            </div>
                
            <div className="colunas">
                <nav className="TopBarPesquisa">
                    <div>
                        <select id="faseSelect" name="fase" required>
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
                    <input className="input__InserirText" type="text" id="descricao" name="descricao" placeholder="Nota técnica:" />
                </div>
            </div>
        </form>
    );
}


export default PesquisaDados;