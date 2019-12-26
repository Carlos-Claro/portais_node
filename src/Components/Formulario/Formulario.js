import React, {Component} from 'react';
import M from 'materialize-css';

export default class Formulario extends Component{

  constructor(props){
    super(props);
    this.instanceTabs = [];
    this.state = {
      error:[],
      titulo:'',
      usuario:{nome:'',email:'',telefone:''},
    };
  }

  componentDidMount(prevProps,prevState){
    const elem = document.querySelector(".tabs");
    this.instanceTabs = M.Tabs.init(elem);
  }

  enviaForm(e){
    e.preventDefault();
    console.log(this.props.id_empresa);
  }

  clickTelefone(e){
    e.preventDefault();
    console.log(this.props.id_empresa);
  }

  render(){
    return(
      <div className="formulario">
        <div className="form-cel row" id="form-cel">
          <ul className="tabs">
            <li className="tab tipo-contato active col s4" data-item="tab-pergunte">
              <a href="#pergunte_imovel" data-toggle="tab"> Dúvidas </a>
            </li>
            <li className="tab tipo-contato col s4" data-item="tab-ligacao">
              <a href="#solicite_ligacao" data-toggle="tab"> Solicite uma ligação </a>
            </li>
            <li className="tab tipo-contato col s4" data-item="tab-simule">
              <a href="#simule_financiamento" data-toggle="tab"> Simule um financiamento </a>
            </li>
          </ul>
          <span className="form-0"></span>
          <form role="form" id="form-cel" onSubmit={this.enviaForm.bind(this)}>
            <div className="active col s12" id="pergunte_imovel">
              <h4>Pergunte sobre este Imóvel</h4>
            </div>
            <div className="col s12" id="simule_financiamento">
              <h4>Simule um Financiamento</h4>
              <div className="row">
                <div className="col s12">
                  <label>Quantidade de parcelas</label>
                  <div className="btn-group" data-toggle="buttons">
                      <label className="btn btn-horario">
                        <input type="checkbox" value="60" className="toggle parcelas" />
                        60 x
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="120" className="toggle parcelas" />
                        120 x
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="180" className="toggle parcelas" />
                        180 x
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="240" className="toggle parcelas" />
                        240 x
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="320" className="toggle parcelas" />
                        320 x
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 coluna">
                    <div className="form-group valor_entrada margin-top-10">
                      <input type="text" name="valor_entrada" className="form-control valor_entrada" placeholder="Valor da entrada" required />
                      <p className="help-block">{this.state.error.valorEntrada}</p>
                      <input type="text" name="valor_entrada" className="form-control valor_entrada" placeholder="Renda mensal" required />
                      <p className="help-block">{this.state.error.rendaMensal}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12" id="solicite_ligacao">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <h4>Solicite uma ligação desta imobiliária</h4>
                  </div>
                </div>
                <div className="row c-bottom-15">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left">
                    <h5>Clique no melhor período para receber ligações</h5>
                    <div className="btn-group" data-toggle="buttons">
                      <label className="btn btn-horario">
                        <input type="checkbox" value="qualquer" className="toggle horario" />
                        Qualquer horário
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="manha" className="toggle horario" />
                        Manhã
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="tarde" className="toggle horario" />
                        Tarde
                      </label>
                      <label className="btn btn-horario">
                        <input type="checkbox" value="noite" className="toggle horario" />
                        Noite
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 coluna">
                  <div className="form-group mensagem_master">
                    <textarea name="mensagem" className="form-control mensagem" placeholder="Escreva sua mensagem" value={`Imóvel referência: ${this.props.referencia}, PI: ${this.props.id} - ${this.state.titulo}`} />
                    <p className="help-block">{this.state.error.mensagem}</p>
                  </div>
                  <div className="form-group email_master">
                    <input type="email" name="email" className="form-control email" placeholder="E-mail de Contato" required value={this.state.usuario.email} />
                    <p className="help-block">{this.state.error.email}</p>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 coluna">
                  <div className="form-group nome_master">
                    <input type="text" name="nome" className="form-control nome" placeholder="Nome Completo" required value={this.state.usuario.nome} />
                    <p className="help-block">{this.state.error.nome}</p>
                  </div>
                  <div className="form-group telefone_master">
                    <input type="text" name="fone" className="form-control fone" placeholder="Telefone 41 1111 1111 " value={this.state.usuario.telefone} />
                    <p className="help-block">{this.state.error.telefone}</p>
                  </div>
                  <div className="form-group"><label>Desejo receber contato por:</label>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                      <label><input type="checkbox" name="telefone" value="1" className="check_telefone pull-left" checked />&nbsp;Telefone</label>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                      <label><input type="checkbox" name="whatsapp" value="1" className="check_whatsapp pull-left" checked="checked" />&nbsp;WhatsApp</label>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                      <label><input type="checkbox" name="comunica-email" value="1" className="check_email pull-left" checked="checked" />&nbsp;Email</label>
                    </div>
                  </div>
                </div>
                <div className="form-group"><button className="btn btn-success envia ladda-button g-recaptcha" data-sitekey={this.state.key} type="submit" data-size="invisible" data-callback="onSubmit"> Contatar Anunciante </button></div>
                <div className="form-group"><label>&nbsp;Ao enviar, você concorda com os <a data-toggle="modal" data-target="#modal-termo" className="termos" href="#">Termos de Uso</a>, <a data-toggle="modal" data-target="#modal-politica" className="termos" href="#">Política de Privacidade</a> e recebimento de sugestões de imóveis.</label></div>
                <ul className="list-unstyled list-inline">
                  <li>
                    <button className="btn btn-form btn-secondary btn-topo ver-telefone"  data-item={this.props.imobiliaria_telefone} onClick={this.clickTelefone.bind(this)} type="button">Ver telefone</button>
                  </li>

                  <li className="dropup">
                    <div className="btn-group btn-vertical">
                      <button type="button" className="btn btn-form hidden-xs whats-desktop  btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-whatsapp"></i> WhatsApp
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a target="_blank" className="btn ver-telefone-whats-lista"  href={`https://web.whatsapp.com/send?phone=+55${this.props.imobiliaria_whatsapp}&text=Gostaria de saber mais sobre o imovel: ${this.state.url}`} >Conversar com a imobiliária</a>
                          </li>
                          <li>
                            <a target="_blank" className="btn compartilha-telefone-whats-lista"  href={`https://web.whatsapp.com/send?text=Conheça esse imóvel: ${this.state.url}`} >Enviar para um amigo</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a type="button"  className="btn btn-form btn-secondary  btn-topo" target="_blank" href="" > + Imóveis <span className="hidden-xs">do anunciante</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}
