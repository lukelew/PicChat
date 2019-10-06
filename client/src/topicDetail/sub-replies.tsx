import React from 'react';
import { Avatar, Icon} from 'antd';
import ReactPanel from '../emoji';
import UploadBox from "../addTopic/uploadImage";
import './index.scss';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '/iconfont.js'
});

interface replyPros {
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
    visible: boolean
}

class Subreplies extends React.Component<replyPros, replyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reacts: this.props.reacts,
            visible: false
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

    render() {
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
                </div>

                
            </div>
        )
    }
}

export default Subreplies;