import React, {Component,Fragment} from 'react';
import Img from 'react-image';
import PreLoader from '../PreLoader/PreLoader';


import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import LinkWrapper from '../../uteis/LinkWrapper';

import Formulario from '../Formulario/Formulario';

export default class ImovelItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      images:[''],
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
    const images = this.props.images.map(image => image.arquivo);
    this.setState({images});
  }

  render(){
    console.log(this.props);
    return(
      <Fragment>
        <h1>{`${this.props._id} - ${this.props.nome}`}</h1>
        <div className="row" ref={elemento => this.elemento = elemento}>
          <div className="col s12">

          </div>
        </div>
        <p>{this.props.descricao}</p>
        <div className="row">

        </div>
      </Fragment>
      )
  }
}
