import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Avatar, Icon, Popover, Empty } from 'antd';
import Replies from './replies';
import './index.scss';
import ReactPanel from '../emoji';

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '/iconfont.js'
});

interface getIdProps {
	id: string
}

interface topicProps extends RouteComponentProps<getIdProps>{
	
}

interface replies {
	_id: string,
	originalPicUrl: string,
	createBy: any,
	name: string,
	avatar: number,
	createAt: string,
	replies: Array<any>,
}

interface detailState {
	id: string,
	name: string,
	avatar: number,
	originalPicUrl: string,
	createAt: string,
	replies: Array<replies>,
	reacts: Array<any>,
	yourReact: object
}

class TopicDetail extends React.Component< topicProps, detailState> {
	constructor(props: topicProps){
		super(props);
		this.state = {
			id: '',
			name: '',
			avatar: 1,
			originalPicUrl: '',
			createAt: '',
			replies: [],
			reacts: [],
			yourReact: {}
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
	
	componentDidMount(){
		fetch(process.env.REACT_APP_API_URL+'/topics/single?id='+ this.props.match.params.id)
			.then(res => res.json())
			.then(data => {
				const curTopic = data;
				this.setState({
					id: curTopic._id,
					name: curTopic.createBy.name,
					avatar: curTopic.createBy.avatar,
					originalPicUrl: curTopic.originalPicUrl,
					createAt: curTopic.createAt,
					replies: curTopic.replies,
					reacts: curTopic.reacts,
					yourReact: curTopic.yourReact
				})
			})
	}

	render() {
		const repliesList = this.state.replies.map( reply => {
			return (
				<Replies
					key={reply._id}
					originalPicUrl={reply.originalPicUrl}
					name={reply.createBy.name}
					avatar={reply.createBy.avatar}
					replies={reply.replies}
					createAt={reply.createAt}
				>
				</Replies>

			)
		})


		return (
			<React.Fragment>
				<div id="topic_detail">
					<div id="author_info">
						<Avatar src={'../avatars/' + this.state.avatar + '.png'}/>
						<strong>{this.state.name}</strong>
						<span className="date">posted on {this.state.createAt.substr(0,10)}</span>
					</div>
					<div id="main_pic">
						<img src={this.state.originalPicUrl}/>
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
					<ReactPanel topicId={this.state.id} yourReact={this.state.yourReact} updateReacts={() => this.updateReacts} />
				</div>

				<div id="replies_list">
					<h2>Replies</h2>
					{repliesList.length == 0 && 
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There is no reply yet" />
					}
					{repliesList}
				</div>
			</React.Fragment>
		)
	}
}

export default TopicDetail;