import React from 'react';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';
import { Avatar, Icon, Popover } from 'antd';
import ReactPanel from '../emoji';
import './card.scss';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/iconfont.js'
});



interface cardProps {
	picUrl: string,
	name: string,
	topicId: string,
	createAt: string,
	replies: Array<any>,
	reacts: Array<any>,
	yourReact: string
}

class Card extends React.Component<cardProps>  {
	render() {

		return(
			<div className="card">
				<div className="user_info">
					<Avatar icon="user"/>
					<strong>{this.props.name}</strong>
					<span className="date">{this.props.createAt.substr(0,10)}</span>
				</div>
				<div className="img_box">
					<Link to={`/topics_detail/${this.props.topicId}`}>
						<img src={this.props.picUrl}/>
					</Link>
					{this.props.reacts.length >0 &&
						<div className="reacts_box">
							{this.props.reacts.map( react => {
								return (
									<span key={react._id}><MyIcon type={'icon-' + react.emoji}/></span>
								)
							})}
						</div>
					}
				</div>
				<ReactPanel topicId={this.props.topicId} yourReact={this.props.yourReact}/>
				{this.props.replies.length > 0 &&
					<div className="replies">
						<Link to={`/topics_detail/${this.props.topicId}`}>{this.props.replies.length} replies</Link>					
					</div>
				}
			</div>
		)
	}

}

export default Card;