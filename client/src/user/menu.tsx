import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.scss';

class UserPanelMenu extends React.Component<RouteComponentProps> {
    

    render() {
        return (
            
            <Menu 
                id="user_panel_menu"
                defaultSelectedKeys={['/user']}
                theme="light"
                mode="inline"
                selectedKeys={[this.props.location.pathname]}
            >
                <Menu.Item key="/user">
                    <Link to="/user"><Icon type="picture" /><span>My posts</span></Link>
                </Menu.Item>
                <Menu.Item key="/user/notifications">
                    <Link to="/user/notifications"><Icon type="notification" /><span>Notifications</span></Link>
                </Menu.Item>
                <Menu.Item key="3"><Icon type="setting" /><span>Settings</span></Menu.Item>
            </Menu>
        )
    }
}

export default UserPanelMenu;