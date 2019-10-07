import React from 'react';
import { Avatar, Icon, Dropdown, Menu, message} from 'antd';
import ReactPanel from '../emoji';
import UploadBox from "../addTopic/uploadImage";
import './index.scss';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '/iconfont.js'
});

interface replyPros {
    loginUser: any,
    topicId: string,
    originalPicUrl: string,
    name: string,
    avatar: number,
    createAt: string,
    replies: Array<any>,
    replyTo: string,
    yourReact: any,
    reacts: Array<any>
}

interface replyState {
    reacts: Array<any>,
    visible: boolean,
    showUploadModalReply: boolean
}

class Subreplies extends React.Component<replyPros, replyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reacts: this.props.reacts,
            visible: false,
            showUploadModalReply: false
        }
    }

    updateReacts = (newReact: any) => {
        let exist = false;
        let updatedReacts = this.state.reacts;
        for (let i = 0; i < this.state.reacts.length; i++) {
            let react = this.state.reacts[i];
            if (react._id === newReact._id) {
                exist = true;
                updatedReacts[i].emoji = newReact.emoji;
            }
        }
        if (exist) {
            this.setState({
                reacts: updatedReacts
            })
        }
        else {
            this.setState(currentState => ({
                reacts: [...currentState.reacts, newReact]
            }))
        }
    }

    deleteReacts = (deleteId: string) => {
        var updatedReact = this.state.reacts;
        for (let i = 0; i < updatedReact.length; i++) {
            if (updatedReact[i]._id === deleteId) {
                updatedReact.splice(i, 1);
                this.setState({
                    reacts: updatedReact
                })
                return
            }
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    showModalReply = () => {
        if (this.state.reacts.length > 0)
		{
			message.error('You can\'t change this picture because it has reacts');
			return false;
		}

        this.setState({
            showUploadModalReply: true
        });
    }; 

    handleCancelUploadReply = () => {
        this.setState({
            showUploadModalReply: false
        });
    };

    handleDeleteTopic = () => {
        const currentTopic = {
            topic_id: this.props.topicId
        }
        if(this.props.replies.length == 0) {
            fetch(process.env.REACT_APP_API_URL + '/topics/', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(currentTopic)
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success'){
                    message.success('Delete Successfully!')
                    var jump = setTimeout(function () { window.location.reload() }, 2000);
                }
                
            })
        }
        else{
            //message.error('You can\'t delete this topic')
            var url = process.env.REACT_APP_API_URL +'/topics';
			var post_data = {
			  originalPicUrl: 'https://picchatbucket.s3-ap-southeast-2.amazonaws.com/content-removal.jpg',
			  smallPicUrl: 'https://picchatbucket.s3-ap-southeast-2.amazonaws.com/content-removal.jpg', 
			  topic_id: this.props.topicId};

			  fetch(url, {
				method:'PUT',
				body: JSON.stringify(post_data),
				headers: new Headers({
					'Content-Type': 'application/json'
				  })
				}).then(res=>res.json()).then(
					data=>{
				message.success('Image was replaced with placeholder, because it contaied replies.');
				var jump = setTimeout(function () { window.location.reload()}, 2000);
			}
			  )
        }

    }

    render() {
        const settingMenu = (
            <Menu>
                <Menu.Item onClick={() => this.showModalReply()}>
                    <Icon type="redo" />Update
				</Menu.Item>
                <Menu.Item onClick={() => this.handleDeleteTopic()}>
                    <Icon type="delete" />Delete
				</Menu.Item>
            </Menu>
        )
        
        return(
            <div className="level3" key={this.props.topicId}>
                <div className="basic_info">
                    <div className="header_panel">
                        <div className="user_info">
                            <Avatar src={'../avatars/' + this.props.avatar + '.png'} />
                            <div className="name_date">
                                <strong>{this.props.name}</strong>
                                <span className="date">posted on {this.props.createAt.substr(0, 10)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="replyto">
                        <span></span>
                        <em>{this.props.replyTo}</em>
                        <strong>Reply to</strong>
                    </div>
                </div>
                
                <div className="img_box">
                    <img src={this.props.originalPicUrl} />
                    {this.state.reacts.length > 0 &&
                        <div className="reacts_box">
                            {this.state.reacts.map(react => {
                                return (
                                    <span key={react._id}><MyIcon type={'icon-' + react.emoji} /></span>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="button_box">
                    {this.props.loginUser.name === this.props.name && 
                        <div className="settings">
                            <Dropdown overlay={settingMenu} placement="bottomCenter">
                                <Icon type="more" />
                            </Dropdown>
                        </div>
                    }
                    <ReactPanel topicId={this.props.topicId} yourReact={this.props.yourReact} updateReacts={() => this.updateReacts} deleteReacts={() => this.deleteReacts} />
                    <Icon
                        className="add_reply"
                        type="picture"
                        theme="twoTone"
                        twoToneColor="#1890ff"
                        style={{ fontSize: '24px' }}
                        onClick={this.showModal} />
                    <UploadBox showModal={this.state.visible}
                        hideModal={this.handleCancel}
                        boxHeader="Upload new picture to reply on topic"
                        topicId={this.props.topicId} />

                    <UploadBox 
						   showModal={ this.state.showUploadModalReply } 
						   hideModal={ this.handleCancelUploadReply }
						   boxHeader="Update picture"
						   topicId={ this.props.topicId }
						   update={ true }/>
                </div>

                
            </div>
        )
    }
}

export default Subreplies;