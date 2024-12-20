import { useState } from 'react';
import './inputsProfissional.css';
import { Eraser, Wrench, MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import axios from 'axios';

const InputsProfissional = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        celular: '',
        cargo: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        permissao: 'opcao',
        horario: '',
        senha: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [colaboradores, setColaboradores] = useState([]);

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
            alert('Digite o nome ou CPF para buscar!');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/buscar_funcionario?search=${searchQuery}`);
            const { status, data } = response.data; // Desestruturação para acessar status e dados diretamente
    
            if (status === 'encontrado' && data.length === 1) {
                setFormData(data[0]);
            } else if (status === 'encontrado' && data.length > 1) {
                setColaboradores(data);
            } else {
                alert('Nenhum colaborador encontrado!');
            }
        } catch (error) {
            console.error('Erro ao buscar colaboradores:', error);
            alert('Erro ao buscar colaboradores!');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.cpf || !formData.nome || !formData.email || !formData.celular ||!formData.cargo ||!formData.logradouro ||!formData.cidade ||!formData.bairro ||!formData.cep|| !formData.permissao ||!formData.horario ||!formData.senha) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const payload = { 
            ...formData,
            permissao: parseInt(formData.permissao, 10), // Converte permissao para número
        };

        console.log('Dados enviados:', formData);

        try {
            const response = await axios.post('http://localhost:4000/create-colaborador', payload);
            console.log('Resposta do servidor:', response.data);
            alert('Colaborador cadastrado com sucesso!');
            setFormData({
                nome: '',
                cpf: '',
                email: '',
                celular: '',
                cargo: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                permissao: 'opcao',
                horario: '',
                senha: '',
            });
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

   
    const handleAlterar = async () => {
        if (!formData.cpf || !formData.nome || !formData.email || !formData.celular ||!formData.cargo ||!formData.logradouro ||!formData.cidade ||!formData.bairro ||!formData.cep|| !formData.permissao ||!formData.horario ||!formData.senha) {
            alert("O campos obrigatórios não podem estar vazio.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/update-colaborador/${formData.cpf}`, 
                formData // Inclui os dados no corpo da requisição
            );
            console.log("Colaborador atualizado:", response.data);
            alert("Alteração realizada com sucesso!");
        } catch (error) {
            console.error("Erro ao alterar colaborador:", error);
            alert("Erro ao tentar alterar o colaborador.");
        }
    };
    

  // Função para excluir colaborador
  const handleExcluir = async () => {
    if (!formData.cpf) {
        alert("Informe o CPF do colaborador para exclusão.");
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:4000/delete-colaborador/${formData.cpf}`);
        console.log("Colaborador excluído:", response.data);
        alert("Exclusão realizada com sucesso!");
        setFormData({
            nome: '',
            cpf: '',
            email: '',
            celular: '',
            cargo: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            permissao: 'opcao',
            horario: '',
            senha: '',
        });
    } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
        alert("Erro ao tentar excluir o colaborador.");
    }
};

    return (

        <div>
            <div className="div__search">
                    <input
                        className="inputs__boxsP"                         
                        id="search"
                        type="text"
                        placeholder="Digite o nome ou CPF do colaborador"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="button__search" type="submit" onClick={handleSearch}>
                        Buscar
                        <MagnifyingGlass />
                    </button>
                </div>
            
            {/* Formulário de cadastro */}
            <form className="div__inputsP" onSubmit={handleSubmit}>
                <input
                    className="inputs__boxsP"
                    id="nome"
                    type="text"
                    placeholder="Nome Completo"
                    value={formData.nome}
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
                    id="estado"
                    type="text"
                    placeholder="Estado"
                    value={formData.estado}
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
                    <option value="3">Administrador</option>
                    <option value="2">Coordenador de Equipe</option>
                    <option value="1">Funcionário</option>
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
                    <button className="button__formP" type="submit" onClick={handleSubmit}>
                        Cadastrar
                       
                        <UserPlus />
                    </button>
                </div>

                <div>
                    <button className="button__formP alterar" type="button" onClick={handleAlterar}>
                        Alterar
                       
                            <Wrench />
                        
                    </button>
                </div>

                <div>
                    <button className="button__formP deletar" type="button" onClick={handleExcluir}>
                        Excluir
                       
                            <Eraser />
                       
                    </button>
                </div>
            </form>      
        </div>
    );
};

export default InputsProfissional;