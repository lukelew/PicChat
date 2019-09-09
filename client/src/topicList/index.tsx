import React from 'react';
import Card from './card';
import './index.scss';

interface topicListState {
	topics: Array<any>;
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			topics: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/topics')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	render() {
		const topicList = this.state.topics.map( topic => {
			const yourReact = '';
			topic.reacts.map( (react: string) => {
				console.log(react);
			})

			return (
				<Card
					key={topic._id}
					picUrl={topic.picUrl} 
					name={topic.createBy.name} 
					createAt={topic.createAt}
					topicId={topic._id}
					replies={topic.replies}
					reacts={topic.reacts}
					yourReact='a'
				>
				</Card>
			)
		})
		return(
			<div id="topic_list">
				{topicList}
			</div>
		)
	}
}

export default TopicList;