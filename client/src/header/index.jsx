import {Route, BrowserRouter, Link}from 'react-router-dom';
import './header.scss';
import React from 'react';
import Login from './login';
import Logout from './logout'
import Register from './register';
import { Menu, Dropdown, Avatar, Button } from 'antd';

class Header extends React.Component {

    menu=(
        <Menu>
            <Menu.Item key="1">
                <Link to="/user"><Button type="link" icon="picture">My posts</Button></Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/user/notifications"><Button type="link" icon="notification">Notifications</Button></Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/user/setting"><Button type="link" icon="setting">Setting</Button></Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Logout ></Logout>
            </Menu.Item>
        </Menu>
    );


    render(){
        if (this.props.isLogin) {
            const avartarUrl = '../avatars/' + this.props.avatar+'.png'
            return(
            <div id='header'>
                <Link id="logo" to="/">picChat</Link>
                <div id='user_menu'>
                    <Dropdown overlay={this.menu}>
                        <div id="user_info">
                            <Avatar size={46} src={avartarUrl}/>
                            <span>{this.props.userName}</span>
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