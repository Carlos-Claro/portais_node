import React, { Component, Fragment } from 'react';
import urlParse from '../../uteis/urlParse';
import Pubsub from 'pubsub-js';

import './Index.css';


import Menu from '../../Components/Menu/Menu';
import Filtro from '../../Components/Filtro/Filtro';
import Footer from '../../Components/Footer/Footer';
import Imoveis from '../../Components/Imoveis/Imoveis';
import Alert from '../../uteis/Alert';

import ApiService from '../../uteis/ApiService'
import ImoveisTipos from '../../uteis/ImoveisTipos';
import FiltroUtil from '../../uteis/FiltroUtil';

import 'materialize-css/dist/css/materialize.min.css';
import '../../css/principal.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Index extends Component {

  constructor(){
    super();
    this.state = {
                    cidade:{logo:'tp_imoveiscuritiba.gif'},
                    menu:[],
                    bairros:{itens:[],qtde:0},
                    filtro:{
                      quartos:[4],
                      vagas:[2,3],
                      tipos:["apartamento","casa"],
                      tipo_negocio:'venda',
                      bairros:['abranches','uberaba'],
                      cidade:'curitiba_pr'
                    },
                    imoveis:{itens:[],qtde:0},
                    url:{},
                    tipos: ImoveisTipos()
                  };
  }


  componentDidMount(){
    var url = urlParse(this.props.location);
    this.setState({url:url});

  }

  componentDidUpdate(nextProps, nextState){
    if(JSON.stringify(this.state.url) !== JSON.stringify(nextState.url)) {
      this.getCidade(this.state.url.hostname);
    }
    if(JSON.stringify(this.state.bairros) !== JSON.stringify(nextState.bairros)) {
      this.getFiltroInicial();
    }
    if(JSON.stringify(this.state.filtro) !== JSON.stringify(nextState.filtro)) {
      this.getImoveis();
    }
    Pubsub.subscribe('set-filtro',(topico, valores) => {
      if(JSON.stringify(this.state.filtro) !== JSON.stringify(valores)) {
        this.setState({filtro:valores})
      }
    })
  }

  getFiltroInicial(){
    const valor = FiltroUtil(true, {url:this.state.url, cidade:this.state.cidade, bairros:this.state.bairros});
    this.setState({filtro:valor})
  }

  getImoveis(){
    ApiService.ListaImoveis(FiltroUtil(false,this.state.filtro))
    .then(res => {
      this.setState({imoveis:res});
    })
    .catch(error => {
      Alert.exibeMensagem('error','Problemas ao retorno imoveis');
    });

  }

  getCidade(host){
    ApiService.GetCidade(host)
      .then(res => {
        let filtro = this.state.filtro;
        filtro.cidade = res.link
        this.setState({cidade:res, menu:res.menu, bairros:res.bairros, filtro:filtro});
      })
      .catch(error => {
        Alert.exibeMensagem('error','Não foi possivel conectar ao banco de dados, tentaremos novamente em 5s');
      });
  }

  render(){
    return (
      <Fragment>
        <div className="container">
        <Menu logo={this.state.cidade.topo} menu={this.state.menu} cidadeLink={this.state.cidade.link} cidadeNome={this.state.cidade.nome}/>
        <Filtro bairros={this.state.bairros.itens} tipos={this.state.tipos} filtro={this.state.filtro}/>
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <Imoveis {...this.state.imoveis} />
        </ReactCSSTransitionGroup>
        <Footer cidade={this.state.cidade}/>
        </div>
      </Fragment>
    )
  }
}
