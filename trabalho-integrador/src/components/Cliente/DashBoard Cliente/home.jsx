import './home.css'

function home(){
    return(
        <div className="home">
            <p className="TituloHome">Home</p>

            <div className="div__contato">
                <p className="p__duvida">Dúvidas? </p>
                <a className="link__contato" href="https://www.whatsapp.com/?lang=pt_BR" target="_blank">Entre em contato</a>
            </div>
            
        </div>
    )
}

export default home;