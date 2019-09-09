import React from 'react';
import { Avatar, Icon, Popover } from 'antd';
import './index.scss';

interface replyPros {
	picUrl: string,
	name: string,
	replies: Array<any>
}


class Replies extends React.Component<replyPros> {
	render(){
		return(
			<div className="single_reply">
				<div className="user_info">
					<Avatar icon="user"/>
					<strong>{this.props.name}</strong>
					<span className="date">2019-09-13</span>
				</div>
				<div className="img_box">
					<img src={this.props.picUrl}/>
				</div>
			</div>
		)
	}
}


export default Replies;