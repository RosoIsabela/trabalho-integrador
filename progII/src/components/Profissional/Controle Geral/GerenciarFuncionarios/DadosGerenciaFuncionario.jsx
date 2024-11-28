import './DadosGerenciaFuncionario.css';
import Linha from "../../../../assets/Line 29.png"
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';

function DadosGerenciaFuncionario(){
    const [colaboradores, setColaboradores] = useState([]);
    const [colaborador, setColaborador] = useState('');
    const [error, setError] = useState('');
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        cpf: '',
        cargo: '',
        celular: '',
        horario: '',
    });
    

    useEffect(() => {
        fetch('http://localhost:4000/colaboradores')
            .then((response) => response.json())
            .then((data) => setColaboradores(data))
            .catch((error) => console.error("Erro ao buscar colaboradores:", error));

    }, []);

    // Função para buscar os dados do usuario baseado no cliente
    const buscarUsuarios = () => {
        if (colaborador) {
            fetch(`http://localhost:4000/buscar_funcionario?search=${colaborador}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'encontrado' && data.data.length === 1) {
                        const usuarioDados = data.data[0];
                        setDados({
                            nome: usuarioDados.nome || '',
                            email: usuarioDados.email || '',
                            cpf: usuarioDados.cpf || '',
                            cargo: usuarioDados.cargo || '',
                            celular: usuarioDados.celular || '',
                            horario: usuarioDados.horario || '',
                        });
                        setError('');
                    } else if (data.status === 'não encontrado') {
                        setError('Nenhum colaborador encontrado.');
                    } else {
                        setError('Mais de um colaborador encontrado. Por favor, refine sua busca.');
                    }
                })
                .catch(error => {
                    setError('Erro ao buscar dados do colaborador.');
                    console.error('Erro ao buscar dados do colaborador:', error);
                });
        } else {
            setError('Por favor, selecione ou insira um termo válido.');
        }
    };

    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro">Visualizar Usuários</label>
                    <label className="p__cadastro2">Cadastrados</label>

                    <select
                        className="contrato__selectBox"
                        name="selectColaborador"
                        value={colaborador}
                        onChange={(e) => setColaborador(e.target.value)}
                    >
                        <option value="" disabled>Selecione o Usuário</option>
                        {colaboradores.map((colaborador) => (
                            <option key={colaborador.cpf} value={colaborador.cpf}>
                                {colaborador.nome}
                            </option>
                        ))}
                    </select>

                    <button type="button" className="ver_usuarios" onClick={buscarUsuarios}>
                        Ver Dados do Usuário
                        <div className="icons__button3">
                            <MagnifyingGlass />
                        </div>
                    </button>

                </div> 
            </div>

           <div className="box__branca">
                <form className="dadosDoFuncionario" >
                    <p>Nome</p>
                    <p className="p__infoCinza">{dados.nome}</p>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Email</p>
                    <p className="p__infoCinza">{dados.email}</p>
                    <img src={Linha} alt="linha horizontal" />

                    <p>CPF</p>
                    <p className="p__infoCinza">{dados.cpf}</p>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Cargo</p>
                    <p className="p__infoCinza">{dados.cargo}</p>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Celular</p>
                    <p className="p__infoCinza">{dados.celular}</p>
                    <img src={Linha} alt="linha horizontal" />

                    <p>Horário de Trabalho </p>
                    <p className="p__infoCinza">{dados.horario}</p>
                    <img src={Linha} alt="linha horizontal" />
                </form>
            </div>
        </div>
   )
}

export default DadosGerenciaFuncionario