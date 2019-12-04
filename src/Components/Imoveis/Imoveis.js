import React, {Component} from 'react';

// import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import LinkWrapper from '../../uteis/LinkWrapper';

export default class Imoveis extends Component {

  shouldComponentUpdate(nextProps,nextState){
    if( JSON.stringify(this.props.itens) !== JSON.stringify(nextProps.itens) ) {
      return true;
    }
    return false;
  }

  render(){
    console.log(this.props);
    return(
      <ul>
        {this.props.itens.map((imovel) => <Imovel imovel={imovel} key={imovel._id}/>)}
      </ul>
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
          <div className="card-content">
            <p>{this.props.imovel.descricao}</p>
          </div>
          <div className="card-action">
            <LinkWrapper to={`/imovel/texto/${this.props.imovel._id}`} >Detalhes</LinkWrapper>
          </div>
        </div>

       </li>
    );
  }
}
