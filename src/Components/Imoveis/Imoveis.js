import React, {Component,Fragment} from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import NumberFormat from 'react-number-format';

// import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import '../../css/imoveis.css';


import nl2br from 'react-nl2br';
import striptags from 'striptags';

import LinkWrapper from '../../uteis/LinkWrapper';

export default class Imoveis extends Component {

  shouldComponentUpdate(nextProps,nextState){
    if( JSON.stringify(this.props.itens) !== JSON.stringify(nextProps.itens) ) {
      return true;
    }
    return false;
  }

  render(){
    return(
      <ul>
        {this.props.itens.map((imovel) => <Imovel imovel={imovel} key={imovel._id}/>)}
      </ul>
      )
  }

}

class ImovelInfo extends Component {
  render(){

    const quartos = this.props.imovel.quartos;
    const banheiros = this.props.imovel.banheiros;
    const vagas = this.props.imovel.vagas;
    const area_terreno = this.props.imovel.area_terreno;

    if (quartos){
      var quarto = <li class="left imovelinfo-car"><i class="material-icons left">hotel</i> {quartos}</li>;
    }
    if (banheiros){
      var banheiro = <li class="left imovelinfo-car"><i class="material-icons left">hot_tub</i> {banheiros}</li>;
    }
    if (vagas){
      var vaga = <li class="left imovelinfo-car"><i class="material-icons left">directions_car</i> {vaga}  </li>;
    }
    if (area_terreno){
      var areaterreno = <li class="left imovelinfo-car" title="Area"><i class="material-icons left ico-area">map</i>{area_terreno}m²  </li>;
    }

    return (
      <Fragment>
        <div>
          <ul>
            {quarto}
            {banheiro}
            {vaga}
            {areaterreno}
          </ul>
        </div>

      </Fragment>
    )
  }
}

class ImovelDescricao extends Component {
  constructor(){
    super();
    this.state = {
      short: true,
      long:false
    };
  }
  aumentaTexto(e){
    e.preventDefault();
    this.setState({short:false,long:true});

  }
  reduzTexto(e){
    e.preventDefault();
    this.setState({short:true,long:false});

  }
  render(){
    return(
      <Fragment>
        <div class="row">
          <div className="col s12">
            <div>
              <p onClick={this.aumentaTexto.bind(this)} className={`texto-descricao ${this.state.short ? 'aberto' : 'fechado'}`}>
                <LinesEllipsis
                  text={striptags(this.props.descricao)}
                  maxLine='3'
                  ellipsis='... '
                  trimRight
                  basedOn='letters'
                  />
                <span className="text-bold">Click e leia mais</span>
              </p>
              <div onClick={this.reduzTexto.bind(this)} className={this.state.long ? 'aberto' : 'fechado'}>
                {nl2br(this.props.descricao)}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

class ImovelLinks extends Component {
  render(){
    const imobiliaria_whatsapp = this.props.imovel.imobiliaria_whatsapp;
    if(imobiliaria_whatsapp){
      var whatsapp = <a href={`https://api.whatsapp.com/send?phone=${imobiliaria_whatsapp}`} >whatsapp</a>;
    }

    return(
      <div className="card-action">
        <LinkWrapper to={`/imovel/texto/${this.props.imovel._id}`} >Detalhes</LinkWrapper>
        {whatsapp}
      </div>
    )
  }
}

class ImovelPreco extends Component{
  render(){
    const preco = () => {
      let retornoPreco = '';
      if ( this.props.imovel.preco_venda ){
        retornoPreco += 'R$';
        retornoPreco += this.props.imovel.preco_venda;
      }
      if ( this.props.imovel.preco_locacao ){
        retornoPreco += 'R$';
        retornoPreco += this.props.imovel.preco_locacao;
      }

      if ( this.props.imovel.preco_locacao_dia ){
        retornoPreco += 'R$';
        retornoPreco += this.props.imovel.preco_locacao_dia;
      }
      return retornoPreco;
    }
    return(
      preco()
    )
  }
}

class Imovel extends Component {

  render(){
    console.log(this.props.imovel);
    return(
       <li key={this.props.imovel.id} className="imovel-lista">
         <div className="card">
          <div className="card-image">
            <img src={this.props.imovel.images[0].arquivo} alt={this.props.imovel.images[0].titulo} />
            <span className="card-title">{this.props.imovel.nome}</span>
          </div>
          <ImovelInfo imovel={this.props.imovel}/>
          <ImovelPreco imovel={this.props.imovel}/>
          <ImovelDescricao descricao={this.props.imovel.descricao}/>
          <ImovelLinks imovel={this.props.imovel}/>
        </div>
       </li>
    );
  }
}
