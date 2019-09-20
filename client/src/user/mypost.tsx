import React from 'react';
import Card from '../topicList/card';
import './index.scss';

interface MyPostsState {
    topics: Array<any>
}

class MyPosts extends React.Component<{}, MyPostsState> {
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
                    key={topic._id}
                    picUrl={topic.picUrl}
                    name={topic.createBy.name}
                    createAt={topic.createAt}
                    topicId={topic._id}
                    replies={topic.replies}
                    reacts={topic.reacts}
                    yourReact={'empty'}
                />
            )
        })

        return ( <div id="user_topic_list">{topicList}</div> )
    }
}

export default MyPosts;