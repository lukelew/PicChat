import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router';
import TopicList from '../topicList';
import TopicDetail from '../topicDetail';
import LeaderBoard from '../leaderboard';

const { Sider, Content } = Layout;

interface topicPanelProps {
    user: any
}

class TopicPanel extends React.Component<topicPanelProps> {
    render() {
        return(
            <Layout>
                <Content>
                    <Switch>
                        <Route path="/topics_detail/:id" component={TopicDetail} />
                        <Route path="/" exact render={() => <TopicList user={this.props.user} />} />
                    </Switch>
                </Content>
                <Sider className="leaderboard" breakpoint="lg" collapsedWidth="0" reverseArrow={true} ><LeaderBoard /></Sider>
            </Layout>
        )
    }
}

export default TopicPanel;