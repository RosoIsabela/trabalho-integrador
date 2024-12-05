import { useState } from 'react';
import './inputsCliente.css';
import { Eraser, Wrench } from "@phosphor-icons/react";
import axios from "axios";

const InputsCliente = () => {
    const [formData, setFormData] = useState({
        nome: "",
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

    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            alert('Digite o nome, razão social ou CNPJ para buscar!');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/buscar_cliente?search=${searchQuery}`);
            if (response.data.status === 'encontrado' && response.data.data.length === 1) {
                setFormData(response.data.data[0]); // Preenche os campos com os dados encontrados
            } else {
                alert('Nenhum cliente encontrado!');
            }
        } catch (error) {
            alert('Erro ao buscar cliente!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.cnpj || !formData.nome || !formData.email || !formData.razao_social) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/create-cliente", formData);
            alert("Cliente criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar cliente!");
        }
    };

    const handleAlterar = async () => {
        try {
            const response = await axios.put(
                `http://localhost:4000/update-cliente/${formData.cnpj}`, 
                formData 
            );
            console.log("Cliente atualizado:", response.data);
            alert("Alteração realizada com sucesso!");
        } catch (error) {
            console.error("Erro ao alterar cliente:", error);
            alert("Erro ao tentar alterar o cliente.");
        }
    };


    // Função para excluir cliente
const handleExcluir = async () => {
    if (!formData.cnpj) {
        alert("Informe o CNPJ do cliente para exclusão.");
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:4000/delete-cliente/${formData.cnpj}`);
        console.log("Cliente excluído:", response.data);
        alert("Exclusão realizada com sucesso!");
        
        setFormData({
            nome: '',
            cnpj: '',
            email: '',
            celular: '',
            razao_social: '',
            cidade: '',
            logradouro: '',
            bairro: '',
            estado: '',
            cep: '',
            senha: '',
        });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Erro ao tentar excluir o cliente.");
    }
};


    return (
        <div>
            <div className="div__search">
                <input
                    className="inputs__boxsP"
                    id="search"
                    type="text"
                    placeholder="Digite o nome, razão social ou CNPJ do cliente"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="button__search" type="button" onClick={handleSearch}>
                    Buscar
                </button>
            </div>

            <form className="div__inputsC" onSubmit={handleSubmit}>
                <input 
                    className="boxC1" 
                    id="nome" 
                    type="text" 
                    placeholder="Nome Completo"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input 
                    className="boxC2" 
                    id="cnpj" 
                    type="text" 
                    placeholder="CNPJ"
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
                    type="password" 
                    placeholder="Senha para login do cliente"
                    value={formData.senha}
                    onChange={handleChange}
                />

                <button className="button__formC" type="submit">
                    Cadastrar
                </button>
               
                    <button
                        className="button__formC alterar"
                        type="button" onClick={handleAlterar}>
                        Alterar
                    <div className="icons__button3">
                        <Wrench />
                    </div>
                    </button>

                    <button
                        className="button__formC deletar"
                        type="button"
                    onClick={handleExcluir}>
                        Excluir
                    <div className="icons__button2">
                        <Eraser />
                    </div>
                    </button>
                
            </form>
        </div>
    );
};

export default InputsCliente;
