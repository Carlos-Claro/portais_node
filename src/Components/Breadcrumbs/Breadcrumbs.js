import React, {Component} from 'react';
import LinkWrapper from '../../uteis/LinkWrapper';

class Breadcrumbs extends Component {



  render(){
    return(
      <nav>
        <div class="nav-wrapper">
          <div class="col s12">
            <a href="#!" class="breadcrumb">Imoveis</a>
            <a href="#!" class="breadcrumb">Tipos</a>
            <a href="#!" class="breadcrumb">localidade</a>
          </div>
        </div>
      </nav>

    )
  }
}
export default Breadcrumbs;
