import React, {Component,Fragment} from 'react';
import LinkWrapper from '../../uteis/LinkWrapper';
import FiltroUtil from '../../uteis/FiltroUtil';


class Breadcrumbs extends Component {
  constructor(props){
    super(props);
    this.state = {itens:[]};
  }

  shouldComponentUpdate(nextProps,nextState){
    if(JSON.stringify(this.props.filtro) !== JSON.stringify(nextProps.filtro)) {
      return true;
    }
    if(JSON.stringify(this.state.itens) !== JSON.stringify(nextState.itens)) {
      return true;
    }
    return false;
  }

  componentDidUpdate(){
    const bread = FiltroUtil('breadcrumbs');
    this.setState({itens:bread})
  }
  render(){
    return(
      <Fragment>
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              {this.state.itens.map(item => <LinkWrapper to={item.link} key={item.link} className="breadcrumb">{item.titulo}</LinkWrapper>)}
            </div>
          </div>
        </nav>
      </Fragment>

    )
  }
}
export default Breadcrumbs;
