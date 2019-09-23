import React from 'react';
import Card from './card';
import { Button, Menu, Dropdown, Tag } from 'antd';
import './index.scss';
import { isArray } from 'util';

interface topicListState {
	sort: number,
	topics: Array<any>,
	tags: string,
	pageSize: number,
	page: number
}

class TopicList extends React.Component<{}, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			sort: 1,
			topics: [],
			tags: 'From New to Old',
			pageSize: 3,
			page: 1
		}
	}

	showFromNewtoOld = (size: number, page: number) => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=1&size='+size+'&page='+page)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({
					sort: 1,
					topics: [...this.state.topics, ...data],
					tags: 'From New to Old',
					page: this.state.page + 1
				})
			})
	}

	showFromOldtoNew = (size: number, page: number) => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=2&size='+size+'&page='+page)
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 2,
					topics: [...this.state.topics, ...data],
					tags: 'From Old to New',
					page: this.state.page + 1
				})
			})
	}

	showFromLowtoHigh = (size: number, page: number) => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=3&size='+size+'&page='+page)
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 3,
					topics: [...this.state.topics, ...data],
					tags: 'From Low to High',
					page: this.state.page + 1
				})
			})
	}

	showFromHightoLow = (size: number, page: number) => {
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=4&size='+size+'&page='+page)
			.then(res => res.json())
			.then(data => {
				this.setState({
					sort: 4,
					topics: [...this.state.topics, ...data],
					tags: 'From High to Low',
					page: this.state.page + 1
				})
			})
	}
	
	loadMore = (sort: number) => {
		switch (sort) {
			case 1:
				this.showFromNewtoOld(this.state.pageSize, this.state.page)
				break;
			case 2:
				this.showFromOldtoNew(this.state.pageSize, this.state.page)
				break;
			case 3:
				this.showFromLowtoHigh(this.state.pageSize, this.state.page)
				break;
			case 4:
				this.showFromHightoLow(this.state.pageSize, this.state.page)
				break;
			default:
				break;
		}
	}


	componentDidMount() {
		this.showFromNewtoOld(this.state.pageSize, this.state.page)
	}

	render() {
		const recentMenu = (
			<Menu>
				<Menu.Item key="1" onClick={ ()=>this.showFromNewtoOld( this.state.pageSize, 0) }>New to Old</Menu.Item>
				<Menu.Item key="2" onClick={ ()=>this.showFromOldtoNew( this.state.pageSize, 0) }>Old to New</Menu.Item>
			</Menu>
		)

		const popluarMenu = (
			<Menu>
				<Menu.Item key="0" onClick={() => this.showFromLowtoHigh( this.state.pageSize, 0) }>Low to High</Menu.Item>
				<Menu.Item key="2" onClick={() => this.showFromHightoLow( this.state.pageSize, 0)}>High to low</Menu.Item>
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
				<Button id="load_more" onClick={() => this.loadMore(this.state.sort)}>Loading more...</Button>
			</React.Fragment>
		)
	}
}

export default TopicList;