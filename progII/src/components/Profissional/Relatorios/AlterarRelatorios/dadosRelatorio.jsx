import "../../Contrato/CadastrarContrato/dadosContrato.css";
import { MagnifyingGlass, Wrench } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';

const DadosRelatorios = () => {
    const [contratos, setContratos] = useState([]);
    const [fase, setFase] = useState('');
    const [dadosRelatorio, setDadosRelatorio] = useState({
        contrato: '',
        tamanho: '',
        coloracao: '',
        produtos: '',
        nos: '',
        clima: '',
        dataColeta: '',
        dataAplicacao: '',
        descricao: '',
    });
    const [error, setError] = useState('');

    const fases = [
        { id: 'fase1', nome: '1º Etapa' },
        { id: 'fase2', nome: '2º Etapa' },
        { id: 'fase3', nome: '3º Etapa' },
        { id: 'fase4', nome: '4º Etapa' },
        { id: 'fase5', nome: '5º Etapa' },
    ];

    useEffect(() => {
        fetch('http://localhost:4000/contratos')
            .then((response) => response.json())
            .then((data) => setContratos(data))
            .catch((error) => console.error("Erro ao buscar contratos:", error));

    }, []);

    const buscarRelatorio = (e) => {
        e.preventDefault();
        // Verificar fase e contrato foram selecionados
        if (fase && dadosRelatorio.contrato) {
            fetch(`http://localhost:4000/relatorios/${fase}/${dadosRelatorio.contrato}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        setError('Relatório não encontrado.');
                    } else {
                        const relatorioData = data[0];
                        setDadosRelatorio({
                            ...dadosRelatorio,
                            tamanho: relatorioData.tm_plantas || '',
                            coloracao: relatorioData.cor_folhas || '',
                            produtos: relatorioData.outros_prod || '',
                            nos: relatorioData.num_nos || '',
                            clima: relatorioData.clima || '',
                            dataColeta: relatorioData.dt_coleta || '',
                            dataAplicacao: relatorioData.dt_apl_prod || '',
                            descricao: relatorioData.obs || '',
                        });
                        setError(''); // Limpar mensagem de erro se o relatório for encontrado
                    }
                })
                .catch(error => {
                    setError('Erro ao buscar dados do relatório.');
                    console.error('Erro ao buscar dados do relatório:', error);
                });
        } else {
            setError('Por favor, selecione uma fase e contrato.');
        }
    };

    const alterarRelatorio = async (e) => {
        e.preventDefault();
    
        // Validação de campos obrigatórios
        if (!dadosRelatorio.tamanho || !dadosRelatorio.coloracao || !dadosRelatorio.nos || !dadosRelatorio.clima || !dadosRelatorio.dataColeta) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
    
        const processData = (value) => (value === "" ? null : value);
    
        try {
            const response = await fetch(`http://localhost:4000/alterar-relatorio/${fase}/${dadosRelatorio.contrato}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dtColeta: dadosRelatorio.dataColeta,
                    dtAplicacao: processData(dadosRelatorio.dataAplicacao),
                    tamanho: dadosRelatorio.tamanho,
                    corFolhas: dadosRelatorio.coloracao,
                    outrosProdutos: processData(dadosRelatorio.produtos),
                    numeroNos: dadosRelatorio.nos,
                    clima: dadosRelatorio.clima,
                    observacao: processData(dadosRelatorio.descricao),
                }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao salvar os dados!');
            }
    
            alert('Relatório atualizado com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao atualizar relatório.');
            console.error('Erro ao atualizar relatório:', error);
        }
    };
    

    return (
        <div className="div__mestre">
            <div className="div__superior">
                <div className="divAdicionarPDF">
                    <label className="p__cadastro3">Para Alterar Relatório</label>
                    <select
                        className="contrato__selectBox2"
                        name="selectFase"
                        value={fase}
                        onChange={(e) => setFase(e.target.value)}
                    >
                        <option value="" disabled>Selecione a Fase</option>
                        {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>
                                {fase.nome}
                            </option>
                        ))}
                    </select>

                    <select
                        className="contrato__selectBox2"
                        name="selectContrato"
                        value={dadosRelatorio.contrato}
                        onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, contrato: e.target.value })}
                    >
                        <option value="" disabled>Selecionar Contrato</option>
                        {contratos.map((contrato) => (
                            <option key={contrato.num_contrato} value={contrato.num_contrato}>
                                {contrato.num_contrato}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="div__botoes" onSubmit={buscarRelatorio}>
                    <button className="button__cadastrar" type="submit">
                        Buscar
                        <div className="icons__button3">
                            <MagnifyingGlass />
                        </div>
                    </button>
                </form>

                <form className="div__botoes" onSubmit={alterarRelatorio}>
                    <button className="button__alterar" type="submit">
                        Atualizar Relatório
                        <div className="icons__button3">
                            <Wrench />
                        </div>
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>

            </div>

            <div className="box__branca">
                <form className="DadosDaPesquisa">
                    <div className="div__Pesquisa1">
                        <label className="label__InserirDados" htmlFor="tamanhoInput">Tamanho médio das plantas</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="tamanhoInput"
                            name="tamanho"
                            placeholder="Digite aqui"
                            value={dadosRelatorio.tamanho}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, tamanho: e.target.value })}
                            required
                        />

                        <label className="label__InserirDados" htmlFor="coloracaoInput">Coloração das folhas</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="coloracaoInput"
                            name="coloracao"
                            placeholder="Digite aqui"
                            value={dadosRelatorio.coloracao}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, coloracao: e.target.value })}
                            required
                        />
                    
                        <label className="label__InserirDados" htmlFor="produtosInput">Outros produtos aplicados</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="produtosInput"
                            name="produtos"
                            placeholder="Digite aqui"
                            value={dadosRelatorio.produtos}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, produtos: e.target.value })}
                            required
                        />
                    
                        <label className="label__InserirDados" htmlFor="nosInput">Número de nós</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="nosInput"
                            name="nos"
                            placeholder="Digite aqui"
                            value={dadosRelatorio.nos}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, nos: e.target.value })}
                            required
                        />
                    
                        <label className="label__InserirDados" htmlFor="climaInput">Clima</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="climaInput"
                            name="clima"
                            placeholder="Digite aqui"
                            value={dadosRelatorio.clima}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, clima: e.target.value })}
                            required
                        />
                    </div>

                    <div className="div__Pesquisa2">
                        <label className="label__InserirDados" htmlFor="dataColetaInput">Data de coleta</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="dataColetaInput"
                            placeholder="dd/mm/aaaa"
                            name="dataColeta"
                            value={dadosRelatorio.dataColeta}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, dataColeta: e.target.value })}
                            required
                        />

                        <label className="label__InserirDados" htmlFor="dataAplicacaoInput">Data de aplicação do produto</label>
                        <input
                            className="input__InserirText"
                            type="text"
                            id="dataAplicacaoInput"
                            name="dataAplicacao"
                            placeholder="dd/mm/aaaa"
                            value={dadosRelatorio.dataAplicacao}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, dataAplicacao: e.target.value })}
                            required
                        />

                        <label className="label__InserirDados" htmlFor="descricaoInput">Descrição</label>
                        <textarea
                            className="textarea__InserirText"
                            id="descricaoInput"
                            name="descricao"
                            value={dadosRelatorio.descricao}
                            onChange={(e) => setDadosRelatorio({ ...dadosRelatorio, descricao: e.target.value })}
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DadosRelatorios;
