import React from 'react';
import Header from './header';
import TopicList from './topicList';
import TopicDetail from './topicDetail';
import AddTopic from './addTopic';
import LeaderBoard from './leaderboard';
import { Affix, Layout, BackTop} from 'antd';
import './App.scss';
import { BrowserRouter as Router, Route }from 'react-router-dom';

// const UserContext = React.createContext({});
// export const UserProvider = UserContext.Provider;
// export const UserConsumer = UserContext.Consumer;
const { Sider, Content } = Layout;

interface currentUser {
	user: {
		name: string,
		email: string,
		id: string,
	},
	isLogin?: boolean
}


class App extends React.Component<{}, currentUser> {
	state: currentUser = {
		user: {
			name: '',
			email: '',
			id: '',
		},
		isLogin: false
	}

	componentDidMount() {
		this.updataFetch()
	}

	updataFetch=()=>{
		fetch('http://localhost:3000/users')
		// fetch(process.env.REACT_APP_API_URL+'/users')
		.then(res => res.json())
			.then(data => {
				if(data.status == 'success'){
					console.log(data)
					this.setState({
						user: {
							name: data.user.name,
							email: data.user.email,
							id: data.user.id,
						},
						isLogin: true
					})
				}else{
					this.setState({
						isLogin: false
					})
				}
			})
	}

	
	render() {
		return (
			<Router>
				{/* <UserProvider value={this.state.user}> */}
					<div className="App" id='App'>
						<Affix>
							<Header userInfo={JSON.stringify(this.state.user.name)} userStatus={JSON.stringify(this.state.isLogin)}></Header>
						</Affix>
						{/* <Route path="/" exact component={TopicList} /> */}
						<Layout>
							<Content><Route path="/" exact component={TopicList} /></Content>
							<Sider className="leaderboard"><LeaderBoard /></Sider>
						</Layout>
						<Route path="/topics_detail/:id" exact component={TopicDetail} />
						

						<AddTopic/>
						<BackTop />
					</div>
				{/* </UserProvider> */}
			</Router>
		);
	}

}

 export default App;
