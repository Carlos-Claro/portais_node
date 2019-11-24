import React, {Component} from 'react';

class Imoveis extends Component {


  render(){
    console.log(this.props.itens);
    return(
      <ul>
        {this.props.itens.map((imovel) => <li key={imovel.id} className="imovel-lista">id imóvel : {imovel.id}, {imovel.nome}</li>)}
      </ul>
      )
  }

}
export default Imoveis;
