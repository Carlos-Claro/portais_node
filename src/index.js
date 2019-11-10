import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './Pages/Index/Index';
import Imovel from './Pages/Imovel/Imovel';
import NotFound from './Pages/NotFound/NotFound';
import * as serviceWorker from './uteis/serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Index}/>
      <Route path="/imovel/:titulo/:id" exact={true} component={Imovel}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
