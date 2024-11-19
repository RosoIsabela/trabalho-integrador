import React, { useState } from 'react';
import './inputsProfissional.css';
import axios from "axios";


const InputsProfissional = () => {
    const [formData, setFormData] = useState({
        nome_completo: "",
        cpf: "",
        email: "",
        celular: "",
        cargo: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        cep: "",
        permissao: "opcao",
        horario: "",
        senha: ""
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
            // URL completa do backend para evitar problemas de CORS
            const response = await axios.post("http://localhost:4000/create-colaborador", formData);
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <div>
            <form className="div__inputsP" onSubmit={handleSubmit}>        
                <input
                    className="inputs__boxsP"
                    id="nome_completo"
                    type="text"
                    placeholder="Nome Completo"
                    value={formData.nome_completo}
                    onChange={handleChange}
                />      
                <input
                    className="inputs__boxsP"
                    id="cpf"
                    type="text"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                />             
                <input
                    className="inputs__boxsP"
                    id="email"
                    type="text"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                />               
                <input
                    className="inputs__boxsP"
                    id="celular"
                    type="text"
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={handleChange}
                />
                <input
                    className="inputs__boxsP"
                    id="cargo"
                    type="text"
                    placeholder="Cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                />
                <input
                    className="inputs__boxsP"
                    id="logradouro"
                    type="text"
                    placeholder="Logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                />               
                <input
                    className="inputs__boxsP"
                    id="bairro"
                    type="text"
                    placeholder="Bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                />    
                <input
                    className="inputs__boxsP"
                    id="cidade"
                    type="text"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                />     
                <input
                    className="inputs__boxsP"
                    id="cep"
                    type="text"
                    placeholder="CEP"
                    value={formData.cep}
                    onChange={handleChange}
                />    
                <select
                    className="inputs__boxsP"
                    id="permissao"
                    value={formData.permissao}
                    onChange={handleChange}
                >
                    <option value="opcao" disabled>Tipo de Permissão</option>
                    <option value="3">Funcionário</option>
                    <option value="2">Coordenador de Equipe</option>
                    <option value="1">Administrador</option>
                </select>
                <input
                    className="inputs__boxsP"
                    id="horario"
                    type="text"
                    placeholder="Horário de Trabalho"
                    value={formData.horario}
                    onChange={handleChange}
                />
                <input
                    className="inputs__boxsP"
                    id="senha"
                    type="password"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
                
                <div>
                    <button className="button__formP" type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InputsProfissional;
