import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router';
import TopicList from '../topicList';
import TopicDetail from '../topicDetail';
import LeaderBoard from '../leaderboard';

const { Sider, Content } = Layout;

class TopicPanel extends React.Component {
    render() {
        return(
            <Layout>
                <Content>
                    <Switch>
                        <Route path="/topics_detail/:id" component={TopicDetail} />
                        <Route path="/" exact component={TopicList} />
                    </Switch>
                </Content>
                <Sider className="leaderboard"><LeaderBoard /></Sider>
            </Layout>
        )
    }
}

export default TopicPanel;