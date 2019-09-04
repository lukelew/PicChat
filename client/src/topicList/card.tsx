import React from 'react';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';
import './card.scss';
import { Avatar, Icon, Popover } from 'antd';

interface cardProps {
	picUrl: string,
	name: string,
	// createAt: string
}

class Card extends React.Component<cardProps>  {
	render() {

		return(
			<div className="card">
				<div className="user_info">
					<Avatar icon="user"/>
					<strong>{this.props.name}</strong>
					<span className="date">2019-09-13</span>
				</div>
				<img src={this.props.picUrl}/>
				<div className="interact_box">
					<Popover content="test" title="React">
						<Icon type="smile" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '20px' }}/>
					</Popover>
					<Icon type="picture" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '20px' }}/>
				</div>
				<div className="replies">313 replies</div>
				<Link to="/topics_detail">test</Link>
			</div>
		)
	}

}

export default Card;