import { useState } from 'react';
import SideBarProfissional from './sidebarProfissional';
import HomeProfissional from './homeProfissional';
import SelectsProfissional from './selectsProfissional';
import CardsTopProfissional from './cardsTopProfissional';

function DashboardProfissional() {
    
    const [cliente, setCliente] = useState(''); 
    const [contrato, setContrato] = useState(''); 

    return (
        <div>
            <SideBarProfissional />
            <HomeProfissional />

          
            <SelectsProfissional 
                cliente={cliente} 
                setCliente={setCliente} 
                contrato={contrato} 
                setContrato={setContrato} 
            />
          
            <CardsTopProfissional 
                cliente={cliente} 
                contrato={contrato} />
            
        </div>
    );
}

export default DashboardProfissional;
