import React, {Component,Fragment} from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Pubsub from 'pubsub-js';

export default class Filtro extends Component {

  constructor(props){
    super(props);
    this.state = {
      quartos:this.props.filtro.quartos,
      vagas:this.props.filtro.vagas,
      tipos:this.props.filtro.tipos,
      tipo_negocio:this.props.filtro.tipo_negocio,
      bairros:this.props.filtro.bairros,
      cidade:this.props.filtro.cidade,
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(this.props.filtro) !== JSON.stringify(prevProps.filtro)) {
      this.setState(
        {
          quartos:this.props.filtro.quartos,
          vagas:this.props.filtro.vagas,
          tipos:this.props.filtro.tipos,
          tipo_negocio:this.props.filtro.tipo_negocio,
          bairros:this.props.filtro.bairros,
          cidade:this.props.filtro.cidade,
        }
      );
    }
    Pubsub.subscribe('atualiza-filtro',(topico, info) => {
      switch(info.filtroTipo){
        case 'bairros':
          this.setState({bairros:info.selecionados})
          break;
        case 'tipos':
          this.setState({tipos:info.selecionados})
          break;
        case 'quartos':
          const temq = this.state.quartos.filter(item => parseInt(info.selecionado) === item);
          let quartos = [];
          if ( temq.length > 0 ){
            quartos = this.state.quartos.filter(item => parseInt(info.selecionado) !== item);
          }else{
            quartos = this.state.quartos.concat(parseInt(info.selecionado));
          }
          this.setState({quartos:quartos})
          break;
        case 'vagas':
          const temv = this.state.vagas.filter(item => parseInt(info.selecionado) === item);
          let vagas = [];
          if ( temv.length > 0 ){
            vagas = this.state.vagas.filter(item => parseInt(info.selecionado) !== item);
          }else{
            vagas = this.state.vagas.concat(parseInt(info.selecionado));
          }
          this.setState({vagas:vagas})
          break;
        case 'tipo_negocio':
          this.setState({tipo_negocio:info.selecionados})
          break;
        default:

          break;
      }
      Pubsub.publish('set-filtro',this.state)
    });
  }

  pesquisa(e){
    e.preventDefault();
    Pubsub.publish('set-filtro',this.state)
  }

  render(){
    return(
      <Fragment>
        <section>
          <div className="row">
            <form onSubmit={this.pesquisa.bind(this)} className="col s12">
              <div className="row">
                <FiltroSelect name="tipos" titulo="Tipos" valores={this.props.tipos} selecionados={this.state.tipos} />
                <FiltroSelect name="bairros" titulo="Bairros" valores={this.props.bairros} selecionados={this.state.bairros} />
                <FiltroCheckbox name="quartos" titulo="Quartos" valores={[1,2,3,4]} selecionados={this.state.quartos} />
                <FiltroCheckbox name="vagas" titulo="Vagas de garagem" valores={[1,2,3,4]} selecionados={this.state.vagas} />
                <input type="submit" name="envio" value="Pesquisar" className="btn" />
              </div>
              </form>
            </div>
          </section>
      </Fragment>

    )
  }
}

class FiltroCheckbox extends Component {

  filtro(e){
    e.preventDefault();
    Pubsub.publish('atualiza-filtro',{filtroTipo:e.target.name, selecionado:e.target.value});
  }

  render(){
    console.log(this.props.selecionados);
    const options = this.props.valores.map((item) => {
      let s = this.props.selecionados.indexOf(item);
      var opt = "";
      const key = `${this.props.name}-${item}`;
      if (s >= 0){
        opt = <p className="col s3" key={key}><label htmlFor={key}>
        <input
          id={key}
          ref={input => this[`campoInput-${item}`] = input}
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
          ref={input => this[`campoInput-${item}`] = input}
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

class FiltroSelect extends Component {

  constructor(){
    super();
    this.campo = false;
  }

  filtro(e){
    e.preventDefault();
    const selecionados = this.campo.getSelectedValues()
    Pubsub.publish('atualiza-filtro',{filtroTipo:this.props.name,selecionados})
  }

  componentDidUpdate(prevProps,prevState){
    this.campo = M.FormSelect.init(this.selectInput);
  }

  render(){
    const options = this.props.valores.map((item) => {
      let opt = <option key={item.link} value={item.link} >{item.nome}</option>;
      return opt;
    })
    return(
      <div key={`${this.props.name}Div`} className="input-field col s12">
        <select
          key={`${this.props.name}Select`}
          name={this.props.name}
          type="select"
          multiple
          onChange={this.filtro.bind(this)}
          value={this.props.selecionados} ref={input => this.selectInput = input} >
          <option value="" key={`${this.props.name}-sem-valor`} >Escolha seus {this.props.titulo}</option>
          {options}
        </select>
        <label>Selecione o {this.props.titulo} de imóvel</label>
      </div>
    )
  }
}
