import React, {Component,Fragment} from 'react';

import { Carousel } from 'react-responsive-carousel';

import Img from 'react-image';
import PreLoader from '../PreLoader/PreLoader';


import 'materialize-css/dist/css/materialize.min.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import LinkWrapper from '../../uteis/LinkWrapper';

import Formulario from '../Formulario/Formulario';

export default class ImovelItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      images:[],
      galeria:'',

    };
    this.elemento = false;
  }

  shouldComponentUpdate(nextProps,nextState){
    if(
      JSON.stringify(this.props) !== JSON.stringify(nextProps)
      || JSON.stringify(this.state.images) !== JSON.stringify(nextState.images)
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.props.images.length);
    if ( this.props.images.length > 0 ){
      const images = this.props.images.map(image =>
        {
          return (
            <div key={image.id}>
              <img src={image.arquivo.replace('destaque','vitrine')} alt={image.titulo}/>
              <p className="legend">{image.titulo}</p>
            </div>
          )
        }
      );
      this.setState({images});
    }
  }


  render(){
    console.log(this.props);
    return(
      <Fragment>
        <h1>{`${this.props._id} - ${this.props.nome}`}</h1>
        <div className="row" >
          <div className="col s12 x6">
            /*https://www.npmjs.com/package/react-responsive-carousel*/
            <Carousel showArrows={true} >
              {this.state.images}
            </Carousel>
          </div>
          <div className="col s12 x6">
            <Formulario idImovel={this.props.id} idEmpresa={this.props.id_empresa}/>
          </div>
        </div>
        <div className="row">
          <div className="col s12 x6">
            <p>{this.props.descricao}</p>
          </div>
          <div className="col s12 x6">
          </div>
        </div>
        <div className="row">
        </div>
      </Fragment>
      )
  }
}
