import React,{Component,Fragment} from 'react';
import urlParse from '../../uteis/urlParse';

import Menu from '../../Components/Menu/Menu';
import Filtro from '../../Components/Filtro/Filtro';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import Footer from '../../Components/Footer/Footer';
import ImovelItem from '../../Components/Imovel/Imovel';


import ApiService from '../../uteis/ApiService';
import Alert from '../../uteis/Alert';

export default class Imovel extends Component {

  constructor(){
    super();
    this.state = {
      imovel:{},
      url:'',
      baseUrl:'',
      cidade:'',
      menu:[],
    };
  }

  shouldComponentUpdate(nextProps,nextState){
    if(
        JSON.stringify(this.state.url) !== JSON.stringify(nextState.url)
    ||  JSON.stringify(this.state.cidade) !== JSON.stringify(nextState.cidade)
    ||  JSON.stringify(this.state.titulo) !== JSON.stringify(nextState.titulo)
    ||  JSON.stringify(this.state.baseUrl) !== JSON.stringify(nextState.baseUrl)
    ||  JSON.stringify(this.state.imovel) !== JSON.stringify(nextState.imovel)
    ||  JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location)
    ||  JSON.stringify(this.props.match.params) !== JSON.stringify(nextProps.match.params)
    ){
      return true;
    }
    return false;
  }

  componentDidMount(){
    this.getImovel(this.props.match.params.id);
    var url = urlParse(this.props.location);
    this.setState({url:url, baseUrl:this.props.location.pathname+this.props.location.search});
  }

  componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(this.state.url) !== JSON.stringify(prevState.url)) {
      this.getCidade(this.state.url.hostname);
    }
  }

  getImovel(_id){
    ApiService.Imovel(_id)
    .then(res => {
      console.log(res);
      this.setState({imovel:res});
    })
    .catch(error => {
      Alert.exibeMensagem('error','Não foi possivel conectar ao banco de dados, tentaremos novamente em 5s');
    });
  }

  getCidade(host){
    ApiService.GetCidade(host)
    .then(res => {
      this.setState({cidade:res, menu:res.menu});
    })
    .catch(error => {
      Alert.exibeMensagem('error','Não foi possivel conectar ao banco de dados, tentaremos novamente em 5s');
    });
  }

  render(){
    return(
      <Fragment>
        <div className="container">
        <Menu logo={this.state.cidade.topo} menu={this.state.menu} cidadeLink={this.state.cidade.link} cidadeNome={this.state.cidade.nome}/>
        <Breadcrumbs filtro={this.state.filtro}/>
        <ImovelItem {...this.state.imovel} />
        <Footer cidade={this.state.cidade}/>
        </div>
      </Fragment>
    )
  }
}
