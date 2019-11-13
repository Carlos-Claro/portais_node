import React from 'react';
import Img from 'react-image';

const Header = props => {


    return(
          <header>
            <Img loader={<div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>} className="logo" src={`https://admin.powempresas.com/portais/logos/${props.logo}`}/>
      </header>
        )



}
export default Header;
