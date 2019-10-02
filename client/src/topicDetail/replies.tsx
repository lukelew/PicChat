import React from 'react';
import { Avatar, Icon, Popover, Button } from 'antd';
import UploadImage from "../addTopic/uploadImage";
import './index.scss';

interface replyPros {
	topicId: string,
	originalPicUrl: string,
	name: string,
	avatar: number,
	createAt: string,
	replies: Array<any>
}

interface replyState {
	visible: boolean
}


class Replies extends React.Component<replyPros, replyState> {
	constructor(props: any) {
        super(props);
        this.state = {
            visible: false
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
					</div>
					<div className="button_box">
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