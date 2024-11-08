import '../Perfil/dadosCliente.css'
import './historia.css'
import imgSedeSinop from "../../../assets/sedeSinop.png"
import imgPalestras from "../../../assets/palestrasMinistradas.png"

function Historia() {
    return (
        <div className='container__master'>
            <div className="container__principal">
                <div className="container__p1">
                    <p className="p1_historia">
                        A SulAgro é uma empresa inovadora no setor agrícola, especializada em pesquisa, desenvolvimento e consultoria. Prestamos serviços de análise 
                        detalhada para empresas que buscam otimizar e testar produtos em fase de desenvolvimento. <br />
                        Nosso foco está em fornecer uma visão completa sobre o potencial dos produtos antes mesmo de chegarem às prateleiras. Com uma equipe qualificada, 
                        ajudamos nossos clientes a transformar suas ideias em soluções bem-sucedidas no mercado agrícola.
                    </p>

                    <img src={imgSedeSinop} alt="Area experimental em Sinop" className="img__p1"/>
                </div>

                <div className="container__p1">
                    <img src={imgPalestras} alt="pessoas assistindo a uma palestra feita pela sulagro" className="img__p2"/>

                    <p className="p2_historia"> 
                        Além disso, oferecemos assessoria agronômica para fabricantes e distribuidores, treinamentos especializados e apoio contínuo às equipes de vendas.
                        Fundada em 2017, nossa sede está localizada em Rio dos Índios/RS, com uma filial em Sinop/MT. Contamos atualmente com seis colaboradores, divididos 
                        entre nossas unidades.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Historia