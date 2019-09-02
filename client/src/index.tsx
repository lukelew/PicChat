import React from 'react';
import ReactDOM, { render,} from 'react-dom';
import {Route, BrowserRouter}from 'react-router-dom';
// import {IndexRoute} from 'react-router';
import './index.scss';

import App from './App';

import Register from './header/register'
import Login from './header/login'




// ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={App}>
        </Route>
        {/* <Route component={EnsureLoggedInContainer}>
      <Route path="/test" component={Test} />
      <Route path="/check" component={Check} />
      <Route path="/test/check" component={TestCheck}  />
    </Route> */}
   </BrowserRouter>
), document.querySelector('#root'));