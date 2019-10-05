import React from 'react';
import MyPosts from './mypost';
import Notification from './notifications';
import UserPanelMenu from './menu';
import { Layout } from 'antd';
import './index.scss';
import { Route } from 'react-router';

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

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/topics/fromUser')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    topics: data
                })
            })
    }


    render() {

        return(
            <Layout>
                <Sider width={240} style={{ background: '#fff' }}>
                    <Route path="/user" component={UserPanelMenu}></Route>
                </Sider>
                <Content>
                    <div id="user_panel">
                        <Route path="/user" exact render={() => <MyPosts user={this.props.user} />} />
                        <Route path="/user/notifications" component={Notification} />
                    </div>
                </Content>
            </Layout>


        )
    }
}

export default UserPanel;