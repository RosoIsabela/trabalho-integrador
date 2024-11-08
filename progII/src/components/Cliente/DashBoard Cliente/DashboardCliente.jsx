import SideBar from './sidebar';
import Home from './home';
import Selects from './selectsCliente'
import CardsTop from './cardsTopCliente'
import CardsBottom from './cardsBottomCliente'

function DashboardCliente() {
    return (
        <div>
            <SideBar />
            <Home />
            <Selects />
            <CardsTop />
            <CardsBottom />
        </div>
    );
}


export default DashboardCliente