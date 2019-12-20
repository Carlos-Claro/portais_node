import React, {Component,Fragment} from 'react';
import M from 'materialize-css';
import LinkWrapper from '../../uteis/LinkWrapper';
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
      valorMin:this.props.filtro.valorMin,
      valorMax:this.props.filtro.valorMax,
      areaMin:this.props.filtro.areaMin,
      areaMax:this.props.filtro.areaMax,
      coluna:this.props.filtro.coluna,
    };
  }

  shouldComponentUpdate(nextProps,nextState){
    if(
        JSON.stringify(this.props.filtro) !== JSON.stringify(nextProps.filtro)
        || JSON.stringify(this.state) !== JSON.stringify(nextState)
      ) {
      return true;
    }
    return false;
  }

  componentDidMount(){
    Pubsub.subscribe('atualiza-filtro',(topico, info) => {
      switch(info.filtroTipo){
        case 'bairros':
        this.setState({bairros:info.selecionados})
        break;
        case 'tipos':
        this.setState({tipos:info.selecionados})
        break;
        case 'quartos':
        let temq = [];
        if (this.state.quartos.length){
          temq = this.state.quartos.filter(item => parseInt(info.selecionado) === item);
        }
        let quartos = [];
        if ( temq.length > 0 ){
          quartos = temq.push(parseInt(info.selecionado));
        }else{
          quartos = [parseInt(info.selecionado)];
        }
        this.setState({quartos:quartos})
        break;
        case 'vagas':
        let temv = [];
        if (this.state.vagas.length){
          temv = this.state.vagas.filter(item => parseInt(info.selecionado) === item);
        }
        let vagas = [];
        if ( temv.length > 0 ){
          vagas = temv.push(parseInt(info.selecionado));
        }else{
          vagas = [parseInt(info.selecionado)];
        }
        this.setState({vagas:vagas})
        break;
        case 'tipo_negocio':
        this.setState({tipo_negocio:info.selecionados})
        break;
        case 'coluna':
        this.setState({coluna:info.selecionados})
        break;
        default:

        break;
      }
      const data = this.state;
      Pubsub.publish('set-filtro',data)
    });

  }

  componentDidUpdate(prevProps, prevState){
    if ( JSON.stringify(this.props.filtro) !== JSON.stringify(prevProps.filtro) ){
      this.setState({
        quartos:this.props.filtro.quartos,
        vagas:this.props.filtro.vagas,
        tipos:this.props.filtro.tipos,
        tipo_negocio:this.props.filtro.tipo_negocio,
        bairros:this.props.filtro.bairros,
        cidade:this.props.filtro.cidade,
        valorMin:this.props.filtro.valorMin,
        valorMax:this.props.filtro.valorMax,
        areaMin:this.props.filtro.areaMin,
        areaMax:this.props.filtro.areaMax,
        coluna:this.props.filtro.coluna,
      });
    }
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
                <FiltroSelect name="coluna" titulo="Ordenação" valores={[{link:'ordem',nome:'Ordem'},{link:'preco-max',nome:'Preço Max'},{link:'preco-min',nome:'Preço Min'}]} selecionados={this.state.coluna}/>
                <FiltroSelect name="tipos" titulo="Tipos" valores={this.props.tipos} selecionados={this.state.tipos} multiple/>
                <FiltroSelect name="bairros" titulo="Bairros" valores={this.props.bairros} selecionados={this.state.bairros} multiple/>
                <FiltroCheckbox name="quartos" titulo="Quartos" valores={[1,2,3,4]} selecionados={this.state.quartos} />
                <FiltroCheckbox name="vagas" titulo="Vagas de garagem" valores={[1,2,3,4]} selecionados={this.state.vagas} />
                <input type="submit" name="envio" value="Pesquisar" className="btn" />
              </div>
              </form>
            </div>
          </section>
          <ButtonFiltro/>
      </Fragment>

    )
  }
}

class FiltroCheckbox extends Component {

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

class FiltroSelect extends Component {

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

class ButtonFiltro extends Component {

  render(){
    return (
      <Fragment>
      <div>
        <LinkWrapper to="#" data-target="filtro" className="sidenav-trigger active">
        <div class="fixed-action-btn btn-floating btn-large blue">
        <i class="large material-icons">search</i>
        </div>
        </LinkWrapper>
        <div id="filtro" className="sidenav">
        <p>teste</p>
        </div>
      </div>
      </Fragment>
    )
  }
}
