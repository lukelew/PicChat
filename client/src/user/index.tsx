import React from 'react';
import Card from '../topicList/card';
import './index.scss';

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

        return(
            <div id="user_panel">
                <h2 id="">User panel</h2>
                <div id="user_topic_list">
                    {topicList}
                </div>
            </div>
            

        )
    }
}

export default UserPanel;