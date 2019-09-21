import React from 'react';
import Card from './card';
import { Button, Menu, Dropdown, Tag } from 'antd';
import './index.scss';

interface topicListState {
	sort: number,
	topics: Array<any>,
	tags: string
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			sort: 1,
			topics: [],
			tags: 'From New to Old'
		}
	}

	showFromNewtoOld = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=1')
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 1,
					topics: data,
					tags: 'From New to Old'
				})
			})
	}

	showFromOldtoNew = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=2')
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 2,
					topics: data,
					tags: 'From Old to New'
				})
			})
	}

	showFromLowtoHigh = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=3')
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 3,
					topics: data,
					tags: 'From Low to High'
				})
			})
	}

	showFromHightoLow = () => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=4')
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 4,
					topics: data,
					tags: 'From High to Low'
				})
			})
	}

	componentDidMount() {
		this.showFromNewtoOld()
	}

	render() {
		const recentMenu = (
			<Menu>
				<Menu.Item key="1" onClick={ ()=>this.showFromNewtoOld() }>New to Old</Menu.Item>
				<Menu.Item key="2" onClick={ ()=>this.showFromOldtoNew() }>Old to New</Menu.Item>
			</Menu>
		)

		const popluarMenu = (
			<Menu>
				<Menu.Item key="1" onClick={() => this.showFromLowtoHigh() }>Low to High</Menu.Item>
				<Menu.Item key="2" onClick={() => this.showFromHightoLow()}>High to low</Menu.Item>
			</Menu>
		)
		const topicList = this.state.topics.map( topic => {
			return (
				<Card
					key={topic._id}
					picUrl={topic.picUrl} 
					name={topic.createBy.name} 
					avatar={topic.createBy.avatar}
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
					<span className="sort">Sort By:</span>
					<Dropdown overlay={recentMenu}>
						<Button>Recency</Button>	
					</Dropdown>
					<Dropdown overlay={popluarMenu}>
						<Button>Popularity</Button>
					</Dropdown>
					<Tag color="gold">{this.state.tags}</Tag>
				</div>
				<div id="topic_list">{topicList}</div>
				<Button id="load_more">Loading more...</Button>
			</React.Fragment>
		)
	}
}

export default TopicList;