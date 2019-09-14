import React from 'react';
import Card from './card';
// import { UserConsumer } from '../App';
import './index.scss';

interface topicListState {
	topics: Array<any>
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			topics: []
		}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL+'/topics')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	render() {
		const topicList = this.state.topics.map( topic => {
			return (
				<Card
					key={topic._id}
					picUrl={topic.picUrl} 
					name={topic.createBy.name} 
					createAt={topic.createAt}
					topicId={topic._id}
					replies={topic.replies}
					reacts={topic.reacts}
					yourReact={topic.yourReact ? topic.yourReact : '' }
				/>
			)
		})

		return(<div id="topic_list">{topicList}</div>)
	}
}

export default TopicList;