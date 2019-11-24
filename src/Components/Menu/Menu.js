import React, {Component} from 'react';
import LinkWrapper from '../../uteis/LinkWrapper';
import PreLoader from '../PreLoader/PreLoader'
import Img from 'react-image';


class MenuItens extends Component {
  render(){
    let itens = this.props.menu.map((item) => {
        return (
            <li key={item.id}>
              <LinkWrapper key={item.id} to="#" className="dropdown-trigger black-text text-darken-2" data-target={`dropdown-${item.link}`}>{item.titulo} <i className="material-icons right black-text text-darken-2"></i></LinkWrapper>
              <ul id={`dropdown-${item.link}`} className="dropdown-content">
                <li>
                  <LinkWrapper key={`int-${item.id}`} to={`imoveis-${item.link}-${this.props.cidadeLink}`} className="dropdown-trigger black-text text-darken-2" data-target={`dropdown-${item.link}`}>{`${item.titulo} Imóveis em ${this.props.cidadeNome}`} <i className="material-icons right black-text text-darken-2"></i></LinkWrapper>
                </li>

                {
                    item.itens.map((sub) => {
                        return(
                            <li key={sub.link}>
                              <LinkWrapper key={sub.link} to={`${item.link}-${sub.link}-${this.props.cidadeLink}`} className="text-darken-2">{sub.titulo}</LinkWrapper>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                )
              })

    return itens;
    // return '';
  }
}



class Menu extends Component {

    render(){
      return(
        <header>

          <nav className="white black-text text-darken-2">
            <div className="nav-wrapper">
              <LinkWrapper to={`/imoveis-${this.props.cidadeLink}`} className="brand-logo">
                <Img loader={<PreLoader />} className="logo" src={`https://admin.powempresas.com/portais/logos/${this.props.logo}`}/>
              </LinkWrapper>
              <ul id="nav-mobile" className="right hide-on-med-and-down text-darken-2">
                <MenuItens menu={this.props.menu} cidadeLink={this.props.cidadeLink} key={this.props.cidadeLink} cidadeNome={this.props.cidadeNome}/>
                <li>
                  <LinkWrapper to="#" className="black-text text-darken-2">Sobre</LinkWrapper>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      );
    }

}
export default Menu;
