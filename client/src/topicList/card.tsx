import React from 'react';
import { Link }from 'react-router-dom';
import { Avatar, Icon } from 'antd';
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
	yourReact: any
}

interface cardState {
	reacts: Array<any>
}


class Card extends React.Component<cardProps, cardState>  {
	state ={
		reacts: this.props.reacts
	}

	updateReacts = (newReact: any)=> {
		let exist = false;
		let index = 0;
		let updatedReacts = this.state.reacts;
		for (let i = 0; i < this.state.reacts.length; i++){
			let react = this.state.reacts[i];
			if (react._id == newReact._id) {
				exist = true;
				updatedReacts[i].emoji = newReact.emoji;
			}
		}
		if(exist){
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

	render() {

		return(
			<div className="card">
				<div className="user_info">
					<Avatar style={{ backgroundColor: '#95de64' }} icon="user"/>
					<strong>{this.props.name}</strong>
					<span className="date">{this.props.createAt.substr(0,10)}</span>
				</div>
				<div className="img_box">
					<Link to={`/topics_detail/${this.props.topicId}`}>
						<img src={this.props.picUrl}/>
					</Link>
					{this.state.reacts.length >0 &&
						<div className="reacts_box">
							{this.state.reacts.map( react => {
								return (
									<span key={react._id}><MyIcon type={'icon-' + react.emoji}/></span>
								)
							})}
						</div>
					}
				</div>
				<ReactPanel topicId={this.props.topicId} yourReact={this.props.yourReact} updateReacts={() => this.updateReacts}/>
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