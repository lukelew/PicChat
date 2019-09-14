import {Route, BrowserRouter, Link}from 'react-router-dom';
import './header.scss';

import React from 'react';
import Login from './login';
import Logout from './logout'
import Register from './register';
import { Menu, Dropdown, Icon } from 'antd';

class Header extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      loginState: false,
      name: '',
    };
  }
  componentDidMount() {
    var userInfo= JSON.parse(this.props.userInfo)
    var userStatus= JSON.parse(this.props.userStatus)
      if(userStatus){
        this.setState({
          name: ''+userInfo+'',
          loginState: true
      })
    }
    console.log(userInfo,userStatus)
  }
  componentWillReceiveProps(nextProps){
    var userInfo= JSON.parse(nextProps.userInfo)
    var userStatus= JSON.parse(nextProps.userStatus)
    if(userStatus){
      this.setState({
        name: ''+userInfo+'',
        loginState: true
    })
  }
  }
  menu=(
    <Menu>
        {/* <Menu.Item key="0"> 
          <a href="###">ready use</a>
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="1">
          <Logout></Logout>
        </Menu.Item>
    </Menu>
  );

  render(){
    if (this.state.loginState) {
      return(
        <div id='header'>
          <a href="http://localhost:3000" id="logo">picChat</a>
          <div id='logout'>
              <Dropdown overlay={this.menu} trigger={['click']}>
                  <a id="userInfo" href="###">{this.state.name} <Icon type="down" /></a>
              </Dropdown>
           </div>
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