import React from 'react';
import { List, Avatar, Empty, Icon } from 'antd';
import './index.scss';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '/iconfont.js'
});

interface NotificationState {
    notifications: Array<any>
}

class Notification extends React.Component<{}, NotificationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/notifications/toUser')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    notifications: data
                })
            })
    }

    render() {
        if(this.state.notifications.length>0){
            return (
                <React.Fragment>
                    <h2>Notifications</h2>
                    <div id="notifications">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.notifications}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={'../avatars/' + item.from.avatar + '.png'} />}
                                        title={'You have a new ' + item.type}
                                        description={
                                            <React.Fragment>
                                                <strong className="from">{item.from.name}</strong><p className="text">{'has reacted to your picture with '}</p><MyIcon type={'icon-' + item.content} />
                                            </React.Fragment>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </React.Fragment>
            )
        }
        else{
            return (
                <React.Fragment>
                    <h2>Notifications</h2>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You have no notifications yet" />
                </React.Fragment>
            ) 
        }
        
    }
}

export default Notification;