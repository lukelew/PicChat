
import { Button, Menu, Dropdown, Tag, Icon} from 'antd';
import './index.scss';


interface topicListProps {
	user: object
}

interface topicListState {
	isLoading: boolean,
	sort: number,
	topics: Array<any>,
	tags: string,
	pageSize: number,
	page: number,
	canLoad: boolean
}

class TopicList extends React.Component<topicListProps, topicListState> {
	constructor(props: any){
		super(props);
		this.state = {
			isLoading: true,
			sort: 1,
			topics: [],
			tags: 'From New to Old',
			pageSize: 4,
			page: 0,
			canLoad: true
		}
	}

	showFromNewtoOld = (size: number, page: number, reset: boolean) => {
		this.setState({
			isLoading: true
		})
		if(reset){
			this.setState({
				topics: [],
				page: 0
			})
		}
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=1&size='+size+'&page='+page)
		.then(res => res.json())
		.then(data => {
			this.setState({
				sort: 1,
				topics: [...this.state.topics, ...data],
				tags: 'From New to Old',
				page: this.state.page + 1,
				canLoad: data.length < this.state.pageSize? false : true
			})
		})
	}

	showFromOldtoNew = (size: number, page: number, reset: boolean) => {
		this.setState({
			isLoading: true
		})
		if (reset) {
			this.setState({
				topics: [],
				page: 0
			})
		}
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=2&size='+size+'&page='+page)
		.then(res => res.json())
		.then(data => {
			this.setState({
				sort: 2,
				topics: [...this.state.topics, ...data],
				tags: 'From Old to New',
				page: this.state.page + 1,
				canLoad: data.length < this.state.pageSize? false : true
			})
		})
	}

	showFromLowtoHigh = (size: number, page: number, reset: boolean) => {
		this.setState({
			isLoading: true
		})
		if (reset) {
			this.setState({
				topics: [],
				page: 0
			})
		}
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=3&size='+size+'&page='+page)
		.then(res => res.json())
		.then(data => {
			this.setState({
				sort: 3,
				topics: [...this.state.topics, ...data],
				tags: 'From Low to High',
				page: this.state.page + 1,
				canLoad: data.length < this.state.pageSize? false : true
			})
		})
	}

	showFromHightoLow = (size: number, page: number, reset: boolean) => {
		this.setState({
			isLoading: true
		})
		if (reset) {
			this.setState({
				topics: [],
				page: 0
			})
		}
		fetch(process.env.REACT_APP_API_URL + '/topics?sort=4&size='+size+'&page='+page)
		.then(res => res.json())
		.then(data => {
			this.setState({
				sort: 4,
				topics: [...this.state.topics, ...data],
				tags: 'From High to Low',
				page: this.state.page + 1,
				canLoad: data.length < this.state.pageSize? false : true
			})
		})
	}
	
	loadMore = (sort: number) => {
		switch (sort) {
			case 1:
				this.showFromNewtoOld(this.state.pageSize, this.state.page, false)
				break;
			case 2:
				this.showFromOldtoNew(this.state.pageSize, this.state.page, false)
				break;
			case 3:
				this.showFromLowtoHigh(this.state.pageSize, this.state.page, false)
				break;
			case 4:
				this.showFromHightoLow(this.state.pageSize, this.state.page, false)
				break;
			default:
				break;
		}
	}


	componentDidMount() {
		this.showFromNewtoOld(this.state.pageSize, this.state.page, true)
	}

	render() {
		const currentUser = this.props.user;
		const recentMenu = (
			<Menu>
				<Menu.Item key="1" onClick={ ()=>this.showFromNewtoOld( this.state.pageSize, 0, true) }>New to Old</Menu.Item>
				<Menu.Item key="2" onClick={ ()=>this.showFromOldtoNew( this.state.pageSize, 0, true) }>Old to New</Menu.Item>
			</Menu>
		)

		const popluarMenu = (
			<Menu>
				<Menu.Item key="1" onClick={() => this.showFromLowtoHigh( this.state.pageSize, 0, true) }>Low to High</Menu.Item>
				<Menu.Item key="2" onClick={() => this.showFromHightoLow( this.state.pageSize, 0, true)}>High to low</Menu.Item>
			</Menu>
		)

		const topicList = this.state.topics.map( topic => {
			return (
					<Card
						user={currentUser}
						key={topic._id}
						smallPicUrl={topic.smallPicUrl} 
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

		return (
			<React.Fragment>
				<div className="topic_list_tab">
					<div className="sort_buttons">
						<Dropdown overlay={recentMenu}>
							<Button ><Icon type="calendar" />Recency</Button>
						</Dropdown>
						<Dropdown overlay={popluarMenu}>
							<Button className="popularity"><Icon type="fire" />Popularity</Button>
						</Dropdown>
					</div>
					<div className="sort_feedback">
						<span className="sort">Sort By:</span>
						<Tag color="gold">{this.state.tags}</Tag>
					</div>
				</div>
				{this.state.isLoading && 
					(<div className="loading">
						<Spin size="large" tip="Loading..." />
					</div>)
				
				}
				<div id="topic_list">{topicList}</div>
				{this.state.canLoad &&
					<Button id="load_more" onClick={() => this.loadMore(this.state.sort)}>Loading more...</Button>
				}
				{!this.state.canLoad &&
					<div className="nomore">
						<Icon style={{fontSize: '34px' }} type="build" />
						<p>More pictures are coming</p>
					</div>
				}
			</React.Fragment>
		)
		
	}
}

export default TopicList;