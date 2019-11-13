import React, { Component, Fragment } from 'react';
import urlParse from '../../uteis/urlParse';

import './Index.css';


import Menu from '../../Components/Menu/Menu';
import Filtro from '../../Components/Filtro/Filtro';
import Footer from '../../Components/Footer/Footer';
import Alert from '../../uteis/Alert';

import ApiService from '../../uteis/ApiService'

import 'materialize-css/dist/css/materialize.min.css';;


export default class Index extends Component {

  constructor(){
    super();
    this.state = {cidade:{}};
  }

  componentDidMount(){
    this.getCidade();
  }

  getCidade(){
    var host = urlParse();
    ApiService.GetCidade(host)
      .then(res => {
        this.setState({cidade:res});
        console.log(this.state.cidade.menu.venda)
        this.state.cidade.menu.map(item => {
          console.log(item.link);

          return item});
      })
      .catch(error => {
        Alert.exibeMensagem('error','Não foi possivel conectar ao banco de dados, tentaremos novamente em 5s');
      });
  }

  render(){
    return (
      <Fragment>
        <div className="container">
          <Menu cidade={this.state.cidade}/>
        </div>
      </Fragment>
    )
  }
}
// <Filtro bairros={this.state.cidade.bairros} tipos={this.state.cidade.menu}/>
// <Footer cidade={this.state.cidade}/>
