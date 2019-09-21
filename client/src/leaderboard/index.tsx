import React from 'react';
import { Icon, List, Avatar } from 'antd'; 
import './index.scss'

interface boardState {
    filter: string,
    userList: Array<any>
}

class LeaderBoard extends React.Component<{}, boardState> {
    state = {
        filter: 'reacts',
        userList: []
    }

    showMostReacts = () => {
        this.setState({
            filter: 'reacts'
        })
        fetch(process.env.REACT_APP_API_URL +'/users/leaderboard?type=mostReacts')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userList: data
                })
            })
    }

    showMostTopics = () => {
        this.setState({
            filter: 'topics'
        })
        fetch(process.env.REACT_APP_API_URL + '/users/leaderboard?type=mostTopics')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userList: data
                })
            })
    }

    componentDidMount(){
        this.showMostReacts()
    }


    render() {
        return(
            <React.Fragment>
                <h3><Icon type="ordered-list" />Leaderboard</h3>
                <div className="filter">
                    <button className={this.state.filter === 'reacts' ? 'isActive' : ''} onClick={this.showMostReacts}><Icon type="smile" /> Reacts</button>
                    <button className={this.state.filter === 'topics' ? 'isActive' : ''} onClick={this.showMostTopics}><Icon type="picture" /> Topics</button>
                </div>
                <List
                    id="leaderboard_list"
                    dataSource={this.state.userList}
                    renderItem={(item: any) => (                
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#95de64' }} icon="user" />}
                                title={item.name}
                                key= {item._id}
                                description={this.state.filter === 'reacts' ? ('React Times: ' + item.reactTimes) : ('Post Topics: ' + item.topicTimes)}
                            />
                        </List.Item>                     
                    )}>

                </List>
            </React.Fragment>
            
        )
    }
}

export default LeaderBoard;