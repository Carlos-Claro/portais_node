import React, {Component} from 'react';
import LinkWrapper from '../../uteis/LinkWrapper';
import Img from 'react-image';

class MenuItens extends Component {
  render(){
    console.log(this.props.itens);

    return '';
  }
}

  // let itens = props.itens.map((item) => {
  //   return (
  //     <li>
  //       <LinkWrapper key={item.id} to={item.link} className="dropdown-trigger" data-target={`dropdown-${item.link}`}>{item.titulo}</LinkWrapper>
  //       <ul id={`dropdown-${item.link}`} className="dropdown-content">
  //         {
  //           item.itens.map((sub) => {
  //             return(
  //               <li>
  //                 <LinkWrapper to={`${item.link}-${sub.link}`}>{sub.titulo}</LinkWrapper>
  //               </li>
  //             )
  //           })
  //         }
  //       </ul>
  //     </li>
  //   )
  // })


class Menu extends Component {


    render(){
      return(
        <header>

          <nav className="blue lighten-5">
            <Img loader={
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
                } className="logo" src={`https://admin.powempresas.com/portais/logos/${this.props.cidade.topo}`}/>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <LinkWrapper to="#" className="dropdown-trigger" data-target="dropdown-imoveis">Imóveis</LinkWrapper>
              <ul id="dropdown-imoveis" className="dropdown-content">
                <MenuItens itens={this.props.cidade.menu}/>
              </ul>
            </li>
            <li>
              <LinkWrapper to="#">Sobre</LinkWrapper>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )

    }

}
export default Menu;
