import './inputsCliente.css';
import React, { useState } from 'react';
import axios from "axios";


const InputsCliente = () => {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        razaoSocial: "",
        cpfOUcnpj: "",
        cidade: "",
        estado: "",
        celular: "",
        permissao: "cliente",
        senha:  ""
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

        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.razaoSocial || !formData.cpfOUcnpj) {
             alert("Preencha todos os campos obrigatórios!");
             return;
         }

        console.log("Dados enviados:", formData);

        try {
            // URL completa do backend para evitar problemas de CORS
            const response = await axios.post("http://localhost:4000/create-cliente", formData);
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <div>  
            <form className="div__inputsC" onSubmit={handleSubmit}> 
                <input 
                    className="boxC1" 
                    id="nome" 
                    type="text" 
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                />       
                <input 
                    className="boxC2" 
                    id="sobrenome" 
                    type="text" 
                    placeholder="Sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                />
                <input 
                    className="boxC3" 
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    className="boxC4" 
                    id="razaoSocial" 
                    type="text" 
                    placeholder="Razão Social"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                />
                <input 
                    className="boxC5" 
                    id="cpfOUcnpj" 
                    type="text" 
                    placeholder="CPF ou CNPJ"
                    value={formData.cpfOUcnpj}
                    onChange={handleChange}
                />
                <input 
                    className="boxC6" 
                    id="cidade" 
                    type="text" 
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                />
                <input 
                    className="boxC7" 
                    id="estado" 
                    type="text" 
                    placeholder="Estado"
                    value={formData.estado}
                    onChange={handleChange}
                />
                <input 
                    className="boxC8" 
                    id="celular" 
                    type="text" 
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={handleChange}
                />
                <select
                    className="boxC9"
                    id="permissao"
                    value={formData.permissao}
                    onChange={handleChange}
                >
                    <option value="opcao" disabled>Tipo de Permissão</option>
                    <option value="4">Cliente</option>
                </select>
                <input
                    className="boxC10"
                    id="senha"
                    type="password"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                />

                <button className="button__formC">
                    Cadastrar
                </button>
            </form>
        </div>
        
    )
}

export default InputsCliente;