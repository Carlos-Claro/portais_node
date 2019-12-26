import React, {Component,Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Pubsub from 'pubsub-js';

import Checkbox from '../../uteis/input/Checkbox';
import Button from '../../uteis/input/Button';
import Select from '../../uteis/input/Select';

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
                <Select name="coluna" titulo="Ordenação" valores={[{link:'ordem',nome:'Ordem'},{link:'preco-max',nome:'Preço Max'},{link:'preco-min',nome:'Preço Min'}]} selecionados={this.state.coluna}/>
                <Select name="tipos" titulo="Tipos" valores={this.props.tipos} selecionados={this.state.tipos} multiple/>
                <Select name="bairros" titulo="Bairros" valores={this.props.bairros} selecionados={this.state.bairros} multiple/>
                <Checkbox name="quartos" titulo="Quartos" valores={[1,2,3,4]} selecionados={this.state.quartos} />
                <Checkbox name="vagas" titulo="Vagas de garagem" valores={[1,2,3,4]} selecionados={this.state.vagas} />
                <input type="submit" name="envio" value="Pesquisar" className="btn" />
              </div>
              </form>
            </div>
          </section>
          <Button/>
      </Fragment>

    )
  }
}
