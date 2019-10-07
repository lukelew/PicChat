import {Route, BrowserRouter, Link}from 'react-router-dom';
import './header.scss';
import React from 'react';
import Login from './login';
import Logout from './logout'
import Register from './register';
import AddTopic from '../addTopic';
import { Menu, Dropdown, Avatar, Button, Badge } from 'antd';

class Header extends React.Component {
   state = {
        unread: 0
    }

    

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/notifications/unread', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                unread: data.length
            })
        })
    }


    render(){
        const userMenu = (
            <Menu>
                <Menu.Item key="1">
                    <Link to="/user"><Button type="link" icon="picture">My posts</Button></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/user/notifications"><Button type="link" icon="notification">Notifications</Button><Badge count={this.state.unread} /></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/user/setting"><Button type="link" icon="setting">Settings</Button></Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Logout ></Logout>
                </Menu.Item>
            </Menu>
        );

        if (this.props.isLogin) {
            const avartarUrl = '../avatars/' + this.props.avatar+'.png'
            return(
                <div id='header'>
                    <Link id="logo" to="/">picChat</Link>
                    <AddTopic />
                    <div id='user_menu'>
                        <Dropdown overlay={userMenu}>
                            <div id="user_info">
                                <Badge count={this.state.unread} offset={[0,2]} >
                                    <Avatar size={40} src={avartarUrl}/>
                                </Badge>
                                <span className="name">{this.props.userName}</span>
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
                    <AddTopic />
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