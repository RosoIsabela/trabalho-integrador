import React, { useState } from 'react';
import Linha from "../../../../assets/Line 29.png";
import './dadosProtocolo.css';

function DadosProtocolo() {
    const [sigla, setSigla] = useState('');
    const [tipo, setTipo] = useState('');
    const [error, setError] = useState('');

    //unção para enviar os dados do protocolo
    const EnviarProtocolo = async (e) => {
        e.preventDefault();

        if (!sigla || !tipo) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/cadastrar-protocolo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sigla,
                    tipo
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar o protocolo.');
            }

            alert('Protocolo cadastrado com sucesso!');
            setSigla('');
            setTipo('');
            setError(''); // Limpar erro ao cadastrar com sucesso
        } catch (error) {
            console.error('Erro ao cadastrar protocolo:', error);
            alert('Erro ao cadastrar protocolo. Tente novamente.');
        }
    };

    return (
        <div className="div__mestreProtocolo">
            <div className="box__brancaProtocolo">
                <div className="div__alinhamento">
                    <p className="p_cadastrarProtocolo">Cadastrar Protocolo</p>
                </div>

                <form onSubmit={EnviarProtocolo}>
                    <div className="input-container">
                        <label className="label__protocolo" htmlFor="sigla">Sigla</label>
                        <input
                            type="text"
                            id="sigla"
                            value={sigla}
                            onChange={(e) => setSigla(e.target.value)}
                            placeholder="Digite a sigla do protocolo"
                            required
                        />
                    </div>
                    <img className="linha__alinhamento" src={Linha} alt="linha horizontal" />

                    <div className="input-container">
                        <label className="label__protocolo" htmlFor="tipo">Tipo</label>
                        <input
                            id="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            placeholder="Digite o tipo do protocolo"
                            required
                        />
                    </div>
                    <img className="linha__alinhamento" src={Linha} alt="linha horizontal" />

                    <div className="div__alinhamento">
                        <button type="submit" className="submit-button">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DadosProtocolo;
