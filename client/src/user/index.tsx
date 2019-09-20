import React from 'react';
import MyPosts from './mypost';
import UserPanelMenu from './menu';
import { Layout } from 'antd';
import './index.scss';
import { Route } from 'react-router';

const { Sider, Content } = Layout;

interface userPanelState {
    topics: Array<any>
}

class UserPanel extends React.Component<{}, userPanelState> {
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
                <Sider width={240} style={{ background: '#fff' }}><UserPanelMenu /></Sider>
                <Content>
                    <div id="user_panel">
                        <h2 id="">User panel</h2>
                        <Route path="/" component={MyPosts}/>
                    </div>
                </Content>
            </Layout>


        )
    }
}

export default UserPanel;