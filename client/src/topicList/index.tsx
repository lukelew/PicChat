import React from 'react';
import Card from './card';
import { Button, Menu, Dropdown } from 'antd';
import './index.scss';

interface topicListState {
	filter: string,
	topics: Array<any>
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			filter: 'recent',
			topics: []
		}
	}

	showFromNewtoOld = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=1')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	showFromOldtoNew = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=2')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	showFromLowtoHigh = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=3')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	showFromHightoLow = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=4')
			.then(res => res.json())
			.then(data => {
				this.setState({
					topics: data
				})
			})
	}

	componentDidMount() {
		this.showFromNewtoOld()
	}

	render() {
		const recentMenu = (
			<Menu>
				<Menu.Item key="1">New to Old</Menu.Item>
				<Menu.Item key="2">Old to New</Menu.Item>
			</Menu>
		)

		const popluarMenu = (
			<Menu>
				<Menu.Item key="1">Low to High</Menu.Item>
				<Menu.Item key="2">High to low</Menu.Item>
			</Menu>
		)
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

		return(
			<React.Fragment>
				<div className="topic_list_tab">
					<Dropdown overlay={recentMenu}>
						<Button>Recency</Button>	
					</Dropdown>
					<strong>/</strong>
					<Dropdown overlay={popluarMenu}>
						<Button>Popularity</Button>
					</Dropdown>
					
				</div>
				<div id="topic_list">{topicList}</div>
				<Button id="load_more">Loading more...</Button>
			</React.Fragment>
		)
	}
}

export default TopicList;