import React, {Component,Fragment} from 'react';

// import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';


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
      var quarto = <li class="left imovelinfo-car"><i class="material-icons left">hotel</i> {quartos}<p class="remove-margin"> Quartos</p></li>;
    }
    if (banheiros){
      var banheiro = <li class="left imovelinfo-car"><i class="material-icons left">hot_tub</i> {banheiros}<p class="remove-margin"> Banheiro</p></li>;
    }
    if (vagas){
      var vaga = <li class="left imovelinfo-car"><i class="material-icons left">directions_car</i> {vaga} <p class="remove-margin">Vagas</p> </li>;
    }
    if (area_terreno){
      var areaterreno = <li class="left imovelinfo-car"><i class="material-icons left ico-area">map</i>{area_terreno}m² <p class="remove-margin">Área Terreno</p> </li>;
    }

    return (
      <Fragment>
        <ul>
          {quarto}
          {banheiro}
          {vaga}
          {areaterreno}
        </ul>
        <div class="row">
          <div className="col s12">
            <p>{this.props.imovel.descricao}</p>
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

class Imovel extends Component {

  render(){

    return(
       <li key={this.props.imovel.id} className="imovel-lista">
         <div className="card">
          <div className="card-image">
            <img src={this.props.imovel.images[0].arquivo} alt={this.props.imovel.images[0].titulo} />
            <span className="card-title">{this.props.imovel.nome}</span>
          </div>
          <ImovelInfo imovel={this.props.imovel}/>
          <ImovelLinks imovel={this.props.imovel}/>
        </div>
       </li>
    );
  }
}
