import { useState } from 'react';
import './inputsCliente.css';
import axios from "axios";

const InputsCliente = () => {
    const [formData, setFormData] = useState({
        nome_completo: "",
        cnpj: "",
        email: "",
        celular: "",
        razao_social: "",
        cidade: "",
        logradouro: "",
        bairro: "",
        estado: "",
        cep: "",
        senha: "",
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

        if (!formData.cnpj || !formData.nome_completo || !formData.email || !formData.razao_social) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const payload = { 
            ...formData,
            permissao: 0
        };

        console.log("Dados enviados:", payload);

        try {
            const response = await axios.post("http://localhost:4000/create-cliente", payload);
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
                    id="nome_completo" 
                    type="text" 
                    placeholder="Nome Completo"
                    value={formData.nome_completo}
                    onChange={handleChange}
                />
                <input 
                    className="boxC2" 
                    id="cnpj" 
                    type="text" 
                    placeholder="CPF/CNPJ"
                    value={formData.cnpj}
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
                    id="celular" 
                    type="text" 
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={handleChange}
                />
                <input 
                    className="boxC5" 
                    id="razao_social" 
                    type="text" 
                    placeholder="Razão Social"
                    value={formData.razao_social}
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
                    id="logradouro" 
                    type="text" 
                    placeholder="Logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                />
                <input 
                    className="boxC8" 
                    id="bairro" 
                    type="text" 
                    placeholder="Bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                />
                <input 
                    className="boxC9" 
                    id="cep" 
                    type="text" 
                    placeholder="CEP"
                    value={formData.cep}
                    onChange={handleChange}
                />
                <input 
                    className="boxC10" 
                    id="estado" 
                    type="text" 
                    placeholder="Estado"
                    value={formData.estado}
                    onChange={handleChange}
                />
                <input 
                    className="boxC11" 
                    id="senha" 
                    type="text" 
                    placeholder="Senha para login do cliente"
                    value={formData.senha}
                    onChange={handleChange}
                />

                <button className="button__formC" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default InputsCliente;
