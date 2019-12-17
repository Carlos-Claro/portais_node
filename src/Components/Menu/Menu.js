import React, {Component, Fragment} from 'react';
import LinkWrapper from '../../uteis/LinkWrapper';
import PreLoader from '../PreLoader/PreLoader'
import Img from 'react-image';
import M from 'materialize-css';


class MenuItens extends Component {



  render(){

    let itens = this.props.menu.map((item) => {
        return (
            <li key={item.link}>
              <LinkWrapper key={`${item.link}-a`} to="#" className=" black-text text-darken-2" data-target={`dropdown-${item.link}`}>{item.titulo} <i className="material-icons right black-text text-darken-2"></i></LinkWrapper>
              <ul id={`dropdown-${item.link}`} className="">
                <li>
                  <LinkWrapper key={`int-${item.id}`} to={`imoveis-${item.link}-${this.props.cidadeLink}`} className="black-text text-darken-2">{`${item.titulo} Imóveis em ${this.props.cidadeNome}`} <i className="material-icons right black-text text-darken-2"></i></LinkWrapper>
                </li>
                {
                item.itens.map((sub) => {
                  console.log(sub);
                  return(
                    <li key={sub.link}>
                      <LinkWrapper key={sub.link} to={`${item.link}-${sub.link}-${this.props.cidadeLink}`} className="black-text text-darken-2" title={`${item.titulo} ${sub.descricao} em ${this.props.cidadeNome}`}>
                        {sub.descricao}
                      </LinkWrapper>
                    </li>
                  )
                })
                }
              </ul>
            </li>
                )
              })
              console.log(itens);
    return itens;
  }
}


class Menu extends Component {

componentDidUpdate(nextProps,nextState){
  var elem = document.querySelector(".sidenav");
  this.campo = M.Sidenav.init(elem);
}


    render(){
      return(
        <Fragment>
          <header>
            <div className="navbar-fixed">
              <nav className="white">
                <div className="nav-wrapper">
                  <LinkWrapper to={`/imoveis-${this.props.cidadeLink}`} className="brand-logo">
                    <Img loader={<PreLoader />} className="my-1 mx-auto logo" src={`https://admin.powempresas.com/portais/logos/${this.props.logo}`}/>
                  </LinkWrapper>
                  <LinkWrapper to="#" data-target="mobile" className="sidenav-trigger">
                    <i className="material-icons blue-text text-darken-4">menu</i>
                  </LinkWrapper>
                  <ul key="menu" id="nav-mobile" className="right hide-on-med-and-down f-bold">
                    <MenuItens menu={this.props.menu} cidadeLink={this.props.cidadeLink} key={`${this.props.cidadeLink}-menu`} cidadeNome={this.props.cidadeNome} mobile={false}/>
                    <li>
                      <LinkWrapper to="#" className="black-text text-darken-2">Sobre</LinkWrapper>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <ul id="mobile" className="sidenav" >
              <MenuItens menu={this.props.menu} cidadeLink={this.props.cidadeLink} key={`${this.props.cidadeLink}-menu`} cidadeNome={this.props.cidadeNome} mobile={true}/>

            </ul>
          </header>
        </Fragment>
      );
    }

}
export default Menu;
