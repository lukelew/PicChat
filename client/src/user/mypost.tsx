import React from 'react';
import Card from '../topicList/card';
import { Empty } from 'antd';
import './index.scss';

interface MyPostsProps {
    user: any
}

interface MyPostsState {
    topics: Array<any>
}

class MyPosts extends React.Component<MyPostsProps, MyPostsState> {
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
        const topicList = this.state.topics.map(topic => {
            return (
                <Card
                    user={this.props.user}
                    key={topic._id}
                    smallPicUrl={topic.smallPicUrl}
                    name={topic.createBy.name}
                    avatar={topic.createBy.avatar}
                    createAt={topic.createAt}
                    topicId={topic._id}
                    replies={topic.replies}
                    reacts={topic.reacts}
                    yourReact={'empty'}
                />
            )
        })

        return ( 
            <React.Fragment>
                <h2>My Posts</h2>
                <div id="user_topic_list">
                    {topicList.length == 0 &&
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You haven't posted any topics" />
                    }
                    {topicList}
                </div> 
            </React.Fragment> 
        )
    }
}

export default MyPosts;