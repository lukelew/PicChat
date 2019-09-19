import React from 'react';
import { Menu, Icon } from 'antd';
import './index.scss';


class UserPanelMenu extends React.Component {


    render() {

        return (
            <Menu 
                id="user_panel_menu"
                defaultSelectedKeys={['1']}
                theme="light"
                mode="inline"
            >
                <Menu.Item key="1"><Icon type="picture" /><span>My posts</span></Menu.Item>
                <Menu.Item key="2"><Icon type="notification" /><span>Notifications</span></Menu.Item>
                <Menu.Item key="3"><Icon type="setting" /><span>Settings</span></Menu.Item>
                <Menu.Item key="4"><Icon type="logout" /><span>Logout</span></Menu.Item>
            </Menu>
        )
    }
}

export default UserPanelMenu;