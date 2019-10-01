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
					<div>
					<Button type="primary" onClick={ this.showModal }>
						Reply
					</Button>
					<UploadImage 
						showModal={ this.state.visible } 
						hideModal={ this.handleCancel } 
						boxHeader="Upload new picture to reply"
						topicId={ this.props.topicId}/>
					</div>
				</div>
			</div>
		)
	}
}


export default Replies;