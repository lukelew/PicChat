import React from 'react';
import MyPosts from './mypost';
import Notification from './notifications';
import Setting from './setting';
import UserPanelMenu from './menu';
import { Layout } from 'antd';
import './index.scss';
import { Route, Redirect } from 'react-router';

const { Sider, Content } = Layout;

interface userPanelProps {
    user: any
}

interface userPanelState {
    topics: Array<any>
}

class UserPanel extends React.Component<userPanelProps, userPanelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            topics: []
        }
    }



    render() {
        if(this.props.user.name){
            return (
                <Layout>
                    <Sider width={240} style={{ background: '#fff' }}>
                        <Route path="/user" component={UserPanelMenu}></Route>
                    </Sider>
                    <Content>
                        <div id="user_panel">
                            <Route path="/user" exact render={() => <MyPosts user={this.props.user} />} />
                            <Route path="/user/notifications" component={Notification} />
                            <Route path="/user/setting" component={Setting} />
                        </div>
                    </Content>
                </Layout>
            )
        }
        else{
            return (<Redirect to="/" />)
        }
        
    }
}

export default UserPanel;