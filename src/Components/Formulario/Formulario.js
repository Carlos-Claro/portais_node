import React, {Component} from 'react';


class Formulario extends Component{

  enviaForm(e){
    e.preventDefault();

  }

  render(){
    return(
      <form onSubmit={this.enviaForm.bind(this)}>
      
      </form>
    );
  }
}
