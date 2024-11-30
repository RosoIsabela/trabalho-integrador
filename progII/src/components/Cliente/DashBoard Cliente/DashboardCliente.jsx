import React, { useState } from 'react';
import SideBar from './sidebar';
import Home from './home';
import Selects from './selectsCliente';
import CardsTop from './cardsTopCliente';
import CardsBottom from './cardsBottomCliente';

function DashboardCliente() {
    const [contratoSelecionado, setContratoSelecionado] = useState(null); // Estado para o contrato

    return (
        <div>
            <SideBar />
            <Home />
            {/* Passa a função e o contrato selecionado como props */}
            <Selects setContratoSelecionado={setContratoSelecionado} />
            <CardsTop contratoSelecionado={contratoSelecionado} />
            <CardsBottom contratoSelecionado={contratoSelecionado} />
        </div>
    );
}

export default DashboardCliente;
