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
    };
  }

  componentDidUpdate(nextProps, nextState){
    if(JSON.stringify(this.props.filtro) !== JSON.stringify(nextProps.filtro)) {
      this.setState({
        quartos:nextProps.filtro.quartos,
        vagas:nextProps.filtro.vagas,
        tipos:nextProps.filtro.tipos,
        tipo_negocio:nextProps.filtro.tipo_negocio,
        bairros:nextProps.filtro.bairros,

      })
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
          this.setState({quartos:info.selecionados})
          break;
        case 'vagas':
          this.setState({vagas:info.selecionados})
          break;
        case 'tipo_negocio':
          this.setState({tipo_negocio:info.selecionados})
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

  constructor(){
    super();
    this.checked = [];
  }

  filtro(e){
    e.preventDefault();
    console.log(this.campoInput.checked);
    console.log(this.campoInput.value);
    // console.log(tem);
    // const tem = this.checked.filter(check => check !== this.campoInput.value);
    // if( tem == undefined){
    //   this.checked = this.checked.push(this.campoInput.value);
    // }else{
    //   this.checked = tem;
    // }

    console.log(this.checked);
  }

  componentDidUpdate(){

  }

  render(){
    const options = this.props.valores.map((item) => {
      let s = this.props.selecionados.indexOf(item);
      var opt = "";
      if (s >= 0){
        opt = <p><label><input ref={input => this.campoInput = input} name={this.props.name} onClick={this.filtro.bind(this)} type="checkbox" key={item} value={item} checked="checked" /><span>{item}</span></label></p>;
      }else{
        opt = <p><label><input ref={input => this.campoInput = input} name={this.props.name} onClick={this.filtro.bind(this)} type="checkbox" key={item} value={item} /><span>{item}</span></label></p>;
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
    this.campo = [];
  }

  filtro(e){
    e.preventDefault();
    const selecionados = this.campo.getSelectedValues()
    Pubsub.publish('atualiza-filtro',{filtroTipo:this.props.name,selecionados})
  }

  componentDidUpdate(){
    this.campo = M.FormSelect.init(this.selectInput);
  }

  render(){
    const options = this.props.valores.map((item) => {
      let s = this.props.selecionados.indexOf(item.link);
      let opt = "";
      if (s >= 0){
        opt = <option key={item.id} value={item.link} selected >{item.nome}</option>;
      }else{
        opt = <option key={item.id} value={item.link}>{item.nome}</option>;

      }
      return opt;
    })
    return(
      <div className="input-field col s12">
        <select name={this.props.name} type="select" onChange={this.filtro.bind(this)} multiple value={this.props.selecionados} ref={input => this.selectInput = input} >
          <option value="0"  selected>Escolha seus {this.props.titulo}</option>
          {options}
        </select>
        <label>Selecione o {this.props.titulo} de imóvel</label>
      </div>
    )
  }
}
