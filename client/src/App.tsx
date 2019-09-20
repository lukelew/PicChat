import React from 'react';
import Header from './header';
import TopicPanel from './topic';
import UserPanel from './user';
import AddTopic from './addTopic';
import { Affix, BackTop} from 'antd';
import './App.scss';
import { BrowserRouter as Router, Route, Switch }from 'react-router-dom';

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
				<div className="App" id='App'>
					<Affix>
						<Header userInfo={JSON.stringify(this.state.user.name)} userStatus={JSON.stringify(this.state.isLogin)}></Header>
					</Affix>
					<Switch>
						<Route path="/user" exact component={UserPanel} />
						<Route path="/" component={TopicPanel} />
					</Switch>
					
					<AddTopic/>
					<BackTop />
				</div>
			</Router>
		);
	}

}

 export default App;
