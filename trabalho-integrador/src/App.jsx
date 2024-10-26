import './App.css'
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DashboardCliente from './components/DashBoard Cliente/DashboardCliente';
import TelaEsqueceuSenha from './components/TelasDeEsqueceuSenha/TelaEsqueceuSenha';
import TelaLoginPrincipal from './components/TelasDeLogin/TelaLoginPrincipal';
import TelaPrincipal from './components/TelaPrincipal/TelaPrincipal';
import ContratoCliente from './components/VerContrato/ContratoCliente';
import RelatoriosCliente from './components/VerRelatorios/RelatoriosCliente';
import ConfiguracoesCliente from './components/Configuracoes/ConfiguracoesCliente';

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


      </Routes>
    </Router>
=======
import TelaLoginBemVindo from './components/TelaLoginBemVindo'
import TelaLoginLeft from './components/TelaLoginLeft'
import TelaLoginRight from './components/TelaLoginRight'
import Sidebar from './components/sidebar'
import Home from './components/home'


function App() {
  return (
    <>
      
      <TelaLoginLeft />
      <TelaLoginRight />

      {/*
      <Sidebar />
      */}
      
    </>
>>>>>>> 3f2450a37702e1d8a2ebf8bd1287139927e1c965
  )
}

export default App
