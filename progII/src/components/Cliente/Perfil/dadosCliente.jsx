import './dadosCliente.css'
import lineDivisor from "../../../assets/linePerfil.png";

function DadosCliente() {
    return (
        <div className='container__master'>
            <div className="container__principal">
                <div className="box__title">
                    <p>Dados Cadastrados</p>
                </div>

                <div className="dados__cliente">
                    <div className="divs__dados">
                        <p>Nome</p>
                        <p>Fulano de Tal</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                
                    
                    <div className="divs__dados">
                        <p>Razão Social</p>
                        <p>Empresa do Fulano de Tal</p>
                        
                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                    <div className="divs__dados">
                        <p>Email</p>
                        <p>fulanodetal@gmail.com</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                    <div className="divs__dados" id="ajuste__div">   
                        <p>Celular</p>
                        <p>(XX) 9 XXXXXXXX</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>


                    <div className="divs__dados">
                        <p>CPF ou CNPJ</p>
                        <p>XXX.XXX.XXX-XX</p>

                        <img src={lineDivisor} alt="linha divisoria" className="linha-divisoria"/>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}


export default DadosCliente