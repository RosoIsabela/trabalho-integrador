import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardCliente from './components/Cliente/DashBoard Cliente/DashboardCliente';
import DashboardProfissional from './components/Profissional/Dashboard Profissional/DashboardProfissional';
import TelaEsqueceuSenha from './components/TelasDeEsqueceuSenha/TelaEsqueceuSenha';
import TelaLoginPrincipal from './components/TelasDeLogin/TelaLoginPrincipal';
import TelaPrincipal from './components/TelaPrincipal/TelaPrincipal';
import ContratoCliente from './components/Cliente/VerContrato/ContratoCliente';
import RelatoriosCliente from './components/Cliente/VerRelatorios/RelatoriosCliente';
import ConfiguracoesCliente from './components/Cliente/Configuracoes/ConfiguracoesCliente';
import PefilCliente from './components/Cliente/Perfil/PerfilCliente';
import SobreCliente from './components/Cliente/Sobre/SobreCliente';
import ConfiguracoesProfissional from './components/Profissional/Configuracoes/ConfiguracoesProfissional'
import ContratoProfissional from './components/Profissional/Contrato/ContratoProfissional';
import RelatoriosProfissional from './components/Profissional/Relatorios/RelatoriosProfissional';
import ControleGeral from './components/Profissional/Controle Geral/ControleGeral';
import PerfilProfissional from './components/Profissional/Perfil/PerfilProfissional'
import SobreProfissional from './components/Profissional/Sobre/SobreProfissional';
import Pesquisa from './components/Profissional/Relatorios/Pesquisa'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<TelaPrincipal />}
        />


        <Route 
          path="/tela-login-principal" 
          element={<TelaLoginPrincipal />}
        />


        <Route 
          path="/tela-esqueceu-senha" 
          element={<TelaEsqueceuSenha />}
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
          element={<DashboardProfissional />}
        />


        <Route
          path="/relatorios-profissional"
          element={<RelatoriosProfissional />}
        />

        <Route
          path="/incluir-pesquisa"
          element={<Pesquisa />}
        />

        <Route
          path="/controle-geral"
          element={<ControleGeral />}
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
    </Router>
  )
}

export default App