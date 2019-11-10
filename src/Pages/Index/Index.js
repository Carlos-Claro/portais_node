import React, { Component, Fragment } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './Index.css';

import Header from '../../Components/Header/Header';
import Menu from '../../Components/Menu/Menu';
import Filtro from '../../Components/Filtro/Filtro';
import Footer from '../../Components/Footer/Footer';


export default class Index extends Component {

  render(){
    return (
      <Fragment>
        <div className="container">
          <Header />
          <Menu />
          <Filtro />
          <Footer />
        </div>
      </Fragment>
    )
  }
}
