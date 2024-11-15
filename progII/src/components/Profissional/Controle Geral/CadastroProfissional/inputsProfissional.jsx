import React, { useState } from 'react';
import './inputsProfissional.css';
import axios from "axios";

const InputsProfissional = () => {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        cargo: "",
        cpf: "",
        cidade: "",
        estado: "",
        permissao: "opcao",
        celular: "",
        horario: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // async function create_colab(formData) {

    //     const response = await axios.post("/login", {
    //         username: username,
    //         password: passwd,
    //     });
    

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.cpf || !formData.nome || !formData.email) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }
    
        console.log("Dados enviados:", formData);
    
        try {
            const response = await axios.post("/create-colaborador", formData);
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };
    

    return (
        <div>
            <form className="div__inputsP" onSubmit={handleSubmit}>
                <div className="boxP1">
                    <input
                        className="inputs__boxsP"
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="sobrenome"
                        type="text"
                        placeholder="Sobrenome"
                        value={formData.sobrenome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="cargo"
                        type="text"
                        placeholder="Cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="cpf"
                        type="text"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="cidade"
                        type="text"
                        placeholder="Cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="estado"
                        type="text"
                        placeholder="Estado"
                        value={formData.estado}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select
                        className="inputs__boxsP"
                        id="permissao"
                        value={formData.permissao}
                        onChange={handleChange}
                    >
                        <option value="opcao" disabled>
                            Tipo de Permissão
                        </option>
                        <option value="3">Funcionário</option>
                        <option value="2">Coordenador de Equipe</option>
                        <option value="1">Administrador</option>
                    </select>
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="celular"
                        type="text"
                        placeholder="Celular"
                        value={formData.celular}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className="inputs__boxsP"
                        id="horario"
                        type="text"
                        placeholder="Horário de Trabalho"
                        value={formData.horario}
                        onChange={handleChange}
                    />
                </div>
                <button className="button__formP" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default InputsProfissional;
