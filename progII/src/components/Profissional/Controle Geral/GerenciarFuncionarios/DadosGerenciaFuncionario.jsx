import './DadosGerenciaFuncionario.css';
import Linha from "../../../../assets/Line 29.png"

function DadosGerenciaFuncionario(){
   return (
       <div className="div__mestre">
           <div className="div__superior">
               <p className="button__listar">Listar todos os Clientes</p>

               <div className="divAdicionarPDF">
                   <label className="p__cadastro">Para Cadastrar OU</label>
                   <label className="p__cadastro2">Para Excluir</label>

                   <select className="button__box" name="select" defaultValue="opcao">
                       <option value="opcao" disabled>Selecione o Cliente</option>
                       <option value="cliente1">Fulano de Tal</option>
                       <option value="cliente2">Ciclano de Tal</option>
                       <option value="cliente3">Sei la de Tal</option>
                   </select>

                   <div className="div__botoes">
                       <p className="button__cadastrar">Alterar</p>
                       <p className="button__excluir">Excluir</p>
                   </div>
               </div> 
           </div>

           <div className="box__branca">
               <div className="dadosDoFuncionario">
                   <p>Nome</p>
                   <p className="p__infoCinza">Fulano de Tal</p>
                   <img src={Linha} alt="linha horizontal" />

                   <p>Email</p>
                   <p className="p__infoCinza">fulanodetal@gmail.com</p>
                   <img src={Linha} alt="linha horizontal" />

                   <p>CPF</p>
                   <p className="p__infoCinza">XXX.XXX.XXX-XX</p>
                   <img src={Linha} alt="linha horizontal" />

                   <p>Cargo</p>
                   <p className="p__infoCinza">Coordenador de Equipe</p>
                   <img src={Linha} alt="linha horizontal" />

                   <p>Celular</p>
                   <p className="p__infoCinza">(XX) 9 XXXXXXXX</p>
                   <img src={Linha} alt="linha horizontal" />

                   <p>Horário de Trabalho </p>
                   <p className="p__infoCinza">Das Xh até as Xh</p>
                   <img src={Linha} alt="linha horizontal" />
               </div>
           </div>
       </div>
   )
}

export default DadosGerenciaFuncionario