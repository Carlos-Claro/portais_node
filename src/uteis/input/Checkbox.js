import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Pubsub from 'pubsub-js';

export default class Checkbox extends Component {

  constructor(){
    super();
    this.campoInput = []
  }

  filtro(e){
    e.preventDefault();
    Pubsub.publish('atualiza-filtro',{filtroTipo:this.campoInput[e.target.value].name, selecionado:this.campoInput[e.target.value].value});
  }

  shouldComponentUpdate(nextProps,nextState){
    if( JSON.stringify(this.props.selecionados) !== JSON.stringify(nextProps.selecionados) ) {
      return true;
    }
    return false;
  }

  render(){
    const options = this.props.valores.map((item) => {
      let s = [];
      if (this.props.selecionados.length > 0){
        s = this.props.selecionados.filter(i => item === i);
      }
      var opt = "";
      const key = `${this.props.name}-${item}`;
      if (s.length > 0){
        opt = <p className="col s3" key={key}><label htmlFor={key}>
        <input
          id={key}
          ref={input => this.campoInput[item] = input}
          name={this.props.name}
          onClick={this.filtro.bind(this)}
          type="checkbox"
          value={item}
          checked="checked" />
        <span>{item}</span></label></p>;
      }else{
        opt = <p className="col s3" key={key}><label htmlFor={key}>
        <input
          id={key}
          ref={input => this.campoInput[item] = input}
          name={this.props.name}
          onClick={this.filtro.bind(this)}
          type="checkbox"
          value={item} />
        <span>{item}</span></label></p>;
      }
      return opt;
    })
    return(
      <div className="input-field col s12">
        <p>Selecione {this.props.titulo}</p>
        {options}
      </div>
    )
  }
}
