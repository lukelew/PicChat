// import {Router,Route} from 'react-router';
import {Route, BrowserRouter}from 'react-router-dom';
import {Link} from 'react-router-dom';
import './header.scss';

import React from 'react';
import Login from './login';
import Logout from './logout'
import Register from './register';

import Check_Login from './checkLogin';
import thunk from 'redux-thunk'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import  reducer  from "../reducer";

//还没写完：未写redux
// const store = createStore(reducer, compose(
//   applyMiddleware(thunk), 
//   window.devToolsExtension ? window.devToolsExtension() : f => f 
// ))

var loginState = false;
// const userName=()=>{
//   this.setState({
//     loginState: this.refs["Login"].getUserName()
//   })
// };
class Header extends React.Component {
  // constructor(){
  //   super();
  //   this.state={
  //     loginState: ''
  //   };
  // }
  render(){
    if (loginState) {
      return(
        <div>
          <a href="http://localhost:3000" id="logo">picChat</a>
          {/* <p>welcome back{this.state.name}</p>  */}
          <BrowserRouter>
           <Link to ="/logout" className="logout">logout</Link>
            <div>
               <Route path="/" component={Logout}/>
            </div>
           </BrowserRouter>
        </div>
      );
    }
    else{
    return(
  <div id="header">
    <a href="http://localhost:3000" id="logo">picChat</a> 

      <div id='login'>
      <BrowserRouter>
        <Link to ="/login" className="login">Login</Link>
        <Link to ="/register" className="register">Register</Link>
        <div>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        </div>
      </BrowserRouter>
      </div>

  </div>
    );
  }
}
}

export default Header;