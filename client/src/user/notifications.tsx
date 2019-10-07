import React from 'react';
import { List, Avatar, Empty, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { thisExpression } from '@babel/types';

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

    getAllNoti = () => {
        fetch(process.env.REACT_APP_API_URL + '/notifications/toUser')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    notifications: data
                })
            })
    }

    componentDidMount() {
        this.getAllNoti()
    }

    markAsRead = (notification_id: string) => {
        const data: any = {
            notification_id: notification_id
        }
        fetch(process.env.REACT_APP_API_URL + '/notifications/markread', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            this.getAllNoti()
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
                                <List.Item className={item.isRead == false ? 'unread' : ''}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={'../avatars/' + item.fromUser.avatar + '.png'} />}
                                        title={'You have a new ' + item.type}
                                        description={
                                            <React.Fragment>
                                                <strong className="from">{item.fromUser.name}</strong>
                                                <p className="text">{'has reacted to your picture with '}</p>
                                                <MyIcon type={'icon-' + item.content} />
                                                <Link to={`/topics_detail/${item.belongTo}`}>Link</Link>
                                                {item.isRead === false &&
                                                    <em onClick={() => this.markAsRead(item._id)}><Icon type="highlight" />Mark as read</em>
                                                }
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