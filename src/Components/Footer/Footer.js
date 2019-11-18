import React from 'react';

const Footer = props => {
  console.log(props.cidade);
  return(
    <footer>
      <p>
        {props.cidade.sobre}
      </p>
    </footer>
  )
}
export default Footer;
