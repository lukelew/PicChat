import React from 'react';
import Card from './card';
import './index.scss';

interface topicListState {
	topics: Array<any>;
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props:any){
		super(props);
		this.state = {
			topics: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/topics')
			.then(res => {
				res.json().then(data => {
					this.setState({
						topics: data
					})
				})
			})
	}

	render() {
		const topiclist = this.state.topics.map( topic => {
			return (
					<Card 
						picUrl={topic.picUrl} 
						name={topic.createBy.name} 
						key={topic._id}>
					</Card>
			)
		})
		return(
			<div id="topic_list">
				{topiclist}
			</div>
		)
	}
}

export default TopicList;