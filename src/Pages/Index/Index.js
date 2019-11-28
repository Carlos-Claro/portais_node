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

export default class Index extends Component {

  constructor(){
    super();
    this.state = {
                    cidade:{logo:'tp_imoveiscuritiba.gif'},
                    menu:[],
                    bairros:{itens:[],qtde:0},
                    filtro:{
                      quartos:[],
                      vagas:[],
                      tipos:[],
                      tipo_negocio:'venda',
                      bairros:[],
                      cidade:''
                    },
                    imoveis:{itens:[],qtde:0},
                    url:{},
                    tipos: ImoveisTipos(),
                    titulo:'Imóveis ',
                    baseUrl:''
                  };
  }


  componentDidMount(){
    var url = urlParse(this.props.location);
    this.setState({url:url, baseUrl:this.props.location.pathname+this.props.location.search});
  }

  componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(this.state.url) !== JSON.stringify(prevState.url)) {
      this.getCidade(this.state.url.hostname);
    }
    if( JSON.stringify(this.state.cidade) !== JSON.stringify(prevState.cidade) ) {
      this.getFiltroInicial();
    }
    if(JSON.stringify(this.state.filtro) !== JSON.stringify(prevState.filtro)) {
      this.getImoveis();
      this.getTitulo();
    }
    Pubsub.subscribe('set-filtro',(topico, valores) => {
      if(JSON.stringify(this.state.filtro) !== JSON.stringify(valores)) {
        this.setState({filtro:valores});
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
      this.setState({imoveis:res.itens});
    })
    .catch(error => {
      Alert.exibeMensagem('error','Problemas ao retorno imoveis');
    });

  }

  getTitulo() {
    let retorno = 'Imóveis ';
    let url = 'imoveis-';
    if ( this.state.filtro.tipos.length > 0 ){
      let contadorTipo = 0;
      retorno = "";
      url = "";
      this.state.filtro.tipos.map(item => {
        retorno += contadorTipo > 0 ? ", " : "";
        url += contadorTipo > 0 ? "+" : "";
        const tipo = ImoveisTipos(item);
        retorno += tipo[0].plural;
        url += tipo[0].link;
        contadorTipo++;
        return false;
      });
      retorno += " ";
      url += "-";
    }
    if ( this.state.filtro.tipo_negocio !== ""){
      this.state.filtro.tipo_negocio.map(item => {
        if ( item === "venda" ){
          retorno += "à venda ";
        }else if (item === "locacao" ) {
          retorno += "para alugar ";
        }else if (item === "locacao dia" ) {
          retorno += "para temporada ";
        }
        url += item;
        url += "-";
        return false;
      });
    }
    let bairroUrl = '';
    if ( this.state.filtro.bairros.length > 0 ){
      let contadorBairro = 0;
      retorno += "no ";
      this.state.filtro.bairros.map(item => {
        retorno += contadorBairro > 0 ? ", " : "";
        const bairro = this.state.bairros.itens.filter(valor => valor.link === item);
        retorno += bairro[0].nome.toLowerCase();
        retorno += " "
        contadorBairro++;
        return false;
      });
      bairroUrl = "-";
      bairroUrl += this.state.filtro.bairros.join('+');

    }
    if ( this.state.filtro.cidade !== "" ){
      retorno += "em ";
      retorno += this.state.cidade.nome;
      retorno += " - ";
      retorno += this.state.cidade.uf;
      url += this.state.filtro.cidade;
    }
    let complementoUrl = [];
    if ( this.state.filtro.quartos.length > 0 ){
      complementoUrl.push("quartos=" + this.state.filtro.quartos.join());
      retorno += " ";
      retorno += this.state.filtro.quartos.join(' ou ') + " quartos "
    }
    if ( this.state.filtro.vagas.length > 0 ){
      complementoUrl.push("vagas=" + this.state.filtro.vagas.join());
      retorno += " ";
      retorno += this.state.filtro.vagas.join(' ou ') + " vagas de garagem "
    }
    let retornoUrl = "/" + url + bairroUrl;
    retornoUrl += (complementoUrl !== "" ? "?"+complementoUrl.join('&') : '');

    this.props.history.push(retornoUrl);
    this.setState({titulo:retorno,baseUrl:retornoUrl});
  }



  getCidade(host){
    ApiService.GetCidade(host)
      .then(res => {
        let filtro = this.state.filtro;
        filtro.cidade = res.link
        this.setState({cidade:res, menu:res.menu, bairros:res.bairros});
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
        <h1>{this.state.titulo}</h1>
        <Imoveis {...this.state.imoveis} />
        <Footer cidade={this.state.cidade}/>
        </div>
      </Fragment>
    )
  }
}
