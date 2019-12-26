import React, {Component} from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Pubsub from 'pubsub-js';

export default class Select extends Component {

  constructor(){
    super();
    this.campo = false;
  }

  filtro(e){
    e.preventDefault();
    let selecionados = this.campo.getSelectedValues()
    if ( this.props.multiple === undefined ){
      selecionados = this.selectInput.value;
    }
    Pubsub.publish('atualiza-filtro',{filtroTipo:this.props.name,selecionados})
  }

  componentDidUpdate(prevProps,prevState){
    this.campo = M.FormSelect.init(this.selectInput);
  }

  render(){
    const options = this.props.valores.map((item) => {
      let opt = <option key={`${item.link}-${this.props.name}`} value={item.link} >{item.nome}</option>;
      return opt;
    })
    return(
      <div key={`${this.props.name}Div`} className="input-field col s12">
        <select
          key={`${this.props.name}Select`}
          name={this.props.name}
          type="select"
          onChange={this.filtro.bind(this)}
          value={this.props.selecionados}
          ref={input => this.selectInput = input}
          {...this.props}
          >
          <option value="" key={`${this.props.name}-sem-valor`} >Escolha seus {this.props.titulo}</option>
          {options}
        </select>
        <label>Selecione o {this.props.titulo} de imóvel</label>
      </div>
    )
  }
}
