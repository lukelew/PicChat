import {Route, BrowserRouter, Link}from 'react-router-dom';
import './header.scss';
import React from 'react';
import Login from './login';
import Logout from './logout'
import Register from './register';
import { Menu, Dropdown, Icon, Avatar } from 'antd';

class Header extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      loginState: false,
      name: '',
      avatar: ''
    };
  }
  componentDidMount() {
    var userInfo= JSON.parse(this.props.userInfo)
    var userStatus= JSON.parse(this.props.userStatus)
    var avatar = JSON.parse(this.props.avatar)
      if(userStatus){
        this.setState({
          name: ''+userInfo+'',
          loginState: true,
          avatar: ''+avatar+''
      })
    }
    console.log(userInfo,userStatus)
  }
  componentWillReceiveProps(nextProps){
    var userInfo= JSON.parse(nextProps.userInfo)
    var userStatus= JSON.parse(nextProps.userStatus)
    var avatar = JSON.parse(this.props.avatar)
    if(userStatus){
      this.setState({
        name: ''+userInfo+'',
        loginState: true,
        avatar: ''+avatar+''
    });
    }
  }


  menu=(
    <Menu>
      <Menu.Item key="1">
        <Link to="/user"><Icon type="picture" />My posts</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Logout ></Logout>
      </Menu.Item>
    </Menu>
  );


  render(){
    if (this.state.loginState) {
      const url="../avatars/"+this.state.avatar
      return(
        <div id='header'>
          <Link id="logo" to="/">picChat</Link>
          <div id='user_menu'>
          
            <Dropdown overlay={this.menu}>
              <div id="user_info">
              <Avatar size={46} src={url}/>
                {/* <Avatar style={{ backgroundColor: '#95de64' }} icon="user" /> */}
                <span>{this.state.name}</span>
              </div>
            </Dropdown>
           </div>
        </div>
      );
    }
    else{
    return(
        <div id="header">
          <Link id="logo" to="/">picChat</Link>
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