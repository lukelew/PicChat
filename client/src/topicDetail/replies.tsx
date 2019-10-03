import React from 'react';
import { Avatar, Icon, Popover, Button } from 'antd';
import ReactPanel from '../emoji';
import UploadImage from "../addTopic/uploadImage";
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
	yourReact: any,
	reacts: Array<any>
}

interface replyState {
	reacts: Array<any>,
	visible: boolean
}


class Replies extends React.Component<replyPros, replyState> {
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

	render(){
		const repliesList = this.props.replies.map( reply => {
			return(
				<div className="level3" key={reply._id}>
					<div className="user_info">
						<Avatar src={'../avatars/' + reply.createBy.avatar + '.png'} />
						<strong>{reply.createBy.name}</strong>
						<span className="date">posted on {reply.createAt.substr(0, 10)}</span>

					</div>
					<div className="img_box">
						<img src={reply.originalPicUrl} />
					</div>
					<div className="button_box">
						<ReactPanel topicId={this.props.topicId} yourReact={this.props.yourReact} updateReacts={() => this.updateReacts} deleteReacts={() => this.deleteReacts} />
						<Icon 
							className="add_reply" 
							type="picture" 
							theme="twoTone" 
							twoToneColor="#1890ff" 
							style={{ fontSize: '24px' }} 
							onClick={this.showModal}/>
					</div>
				</div>
			)
		}) 

		return(
			<div className="single_reply">
				<div className="level2">
					<div className="user_info">
						<Avatar src={'../avatars/' + this.props.avatar + '.png'} />
						<strong>{this.props.name}</strong>
						<span className="date">posted on {this.props.createAt.substr(0, 10)}</span>
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
						<UploadImage 
							showModal={ this.state.visible } 
							hideModal={ this.handleCancel } 
							boxHeader="Upload new picture to reply"
							topicId={ this.props.topicId}/>
					</div>
				</div>
				{repliesList}
			</div>
		)
	}
}


export default Replies;