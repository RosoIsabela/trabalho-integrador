import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import DashboardCliente from './components/Cliente/DashBoard Cliente/DashboardCliente';
import DashboardProfissional from './components/Profissional/Dashboard Profissional/DashboardProfissional';
import TelaLoginPrincipal from './components/TelasDeLogin/TelaLoginPrincipal';
import TelaPrincipal from './components/TelaPrincipal/TelaPrincipal';
import ContratoCliente from './components/Cliente/VerContrato/ContratoCliente';
import RelatoriosCliente from './components/Cliente/VerRelatorios/RelatoriosCliente';
import ConfiguracoesCliente from './components/Cliente/Configuracoes/ConfiguracoesCliente';
import PefilCliente from './components/Cliente/Perfil/PerfilCliente';
import SobreCliente from './components/Cliente/Sobre/SobreCliente';
import ConfiguracoesProfissional from './components/Profissional/Configuracoes/ConfiguracoesProfissional'
import RelatoriosProfissional from './components/Profissional/Relatorios/RelatoriosProfissional';
import ContratoProfissional from './components/Profissional/Contrato/ContratoProfissional';
import ControleGeral from './components/Profissional/Controle Geral/ControleGeral';
import PerfilProfissional from './components/Profissional/Perfil/PerfilProfissional'
import SobreProfissional from './components/Profissional/Sobre/SobreProfissional';
import PesquisaProfissional from './components/Profissional/Relatorios/PesquisaProfissional';
import CadastroDoCliente from './components/Profissional/Controle Geral/CadastroCliente/CadastroDoCliente';
import CadastroDoProfissional from './components/Profissional/Controle Geral/CadastroProfissional/CadastroDoProfissional';
import CadastrarContratoProfissional from './components/Profissional/Contrato/CadastrarContrato/CadastrarContratoProfissional';
import CadastrarProtocoloProfissional from './components/Profissional/Contrato/CadastrarProtocolo/cadastrarProtocoloProfissional';
import AlterarContratoProfissional from './components/Profissional/Contrato/AlterarContrato/AlterarContratoProfissional';
import AlterarRelatorioProfissional from './components/Profissional/Relatorios/AlterarRelatorios/AlterarRelatorioProfissional';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/tela-login-principal");
    }
  }, [navigate]);

  return ( 
      <Routes>
        <Route 
          path="/" 
          element={<TelaPrincipal />}
        />


        <Route 
          path="/tela-login-principal" 
          element={<TelaLoginPrincipal />} 
        />


        {/* Cliente*/}
        <Route 
          path="/dashboard-cliente"
          element={<DashboardCliente />}
        />


        <Route 
          path="/ver-contrato"
          element={<ContratoCliente />}
        />


        <Route 
          path="/ver-relatorios"
          element={<RelatoriosCliente />}
        />


        <Route 
          path="/configuracoes"
          element={<ConfiguracoesCliente />}
        />


        <Route 
          path="/perfilCliente"
          element={<PefilCliente />}
        />


        <Route 
          path="/sobreCliente"
          element={<SobreCliente />}
        />

        {/* Profissional */}
        <Route
          path="/dashboard-profissional"
          element={<DashboardProfissional />}
        />


        <Route
          path="/contrato-profissional"
          element={<ContratoProfissional />}
        />


        <Route
          path="/cadastrar-contrato"
          element={<CadastrarContratoProfissional />}
        />


        <Route
          path="/cadastrar-protocolo"
          element={<CadastrarProtocoloProfissional />}
        />


        <Route
          path="/alterar-contrato"
          element={<AlterarContratoProfissional />}
        />

        
        <Route
          path="/relatorios-profissional"
          element={<RelatoriosProfissional />}
        />        


        <Route
          path="/alterar-relatorios"
          element={<AlterarRelatorioProfissional />}
        />        


        <Route
          path="/incluir-pesquisa"
          element={<PesquisaProfissional />}
        />


        <Route
          path="/controle-geral"
          element={<ControleGeral />}
        />


        <Route
          path="/cadastro-cliente"
          element={<CadastroDoCliente />}
        />


        <Route 
          path="/cadastro-funcionario"
          element={<CadastroDoProfissional />}
        />


        <Route
          path="/configuracoes-profissional"
          element={<ConfiguracoesProfissional />}
        />


        <Route 
          path="/perfilProfissional"
          element={<PerfilProfissional />}
        />


        <Route 
          path="/sobreProfissional"
          element={<SobreProfissional />}
        />

      </Routes>
  )
}

export default App;
