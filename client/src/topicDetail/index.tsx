import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Avatar, Icon, Popover } from 'antd';
import Replies from './replies';
import './index.scss';

interface getIdProps {
	id: string
}

interface topicProps extends RouteComponentProps<getIdProps>{
	
}

interface replies {
	_id: string,
	picUrl: string,
	createBy: any,
	createAt: string,
	replies: Array<any>
}

interface detailState {
	picUrl: string,
	name: string,
	createAt: string,
	replies: Array<replies>
}

class TopicDetail extends React.Component< topicProps, detailState> {
	constructor(props: topicProps){
		super(props);
		this.state = {
			name: '',
			picUrl: '',
			createAt: '',
			replies: []
		}
	}

	componentDidMount(){
		console.log(process.env.REACT_APP_API_URL)
		fetch(process.env.REACT_APP_API_URL+'/topics?id='+ this.props.match.params.id)
			.then(res => res.json())
			.then(data => {
				const curTopic = data[0];
				this.setState({
					name: curTopic.createBy.name,
					picUrl: curTopic.picUrl,
					createAt: curTopic.createAt,
					replies: curTopic.replies
				})
			})
	}

	render() {
		const repliesList = this.state.replies.map( reply => {
			return (
				<Replies
					key={reply._id}
					picUrl={reply.picUrl}
					name={reply.createBy.name}
					replies={reply.replies}
				>
				</Replies>

			)
		})


		return (
			<React.Fragment>
				<div id="topic_detail">
					<div id="author_info">
						<Avatar icon="user"/>
						<strong>{this.state.name}</strong>
						<span className="date">{this.state.createAt.substr(0,10)}</span>
					</div>
					<div id="main_pic">
						<img src={this.state.picUrl}/>
					</div>
				</div>

				<div id="replies_list">
					<h2>Replies</h2>
					{repliesList}
				</div>
			</React.Fragment>
		)
	}
}

export default TopicDetail;