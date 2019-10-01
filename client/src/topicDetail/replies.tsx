import React from 'react';
import { Avatar, Icon, Popover, Button } from 'antd';
import './index.scss';

interface replyPros {
	originalPicUrl: string,
	name: string,
	avatar: number,
	createAt: string,
	replies: Array<any>
}


class Replies extends React.Component<replyPros> {
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
					<Button type="primary">Reply</Button>
				</div>
			</div>
		)
	}
}


export default Replies;