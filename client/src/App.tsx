import React from 'react';
import Header from './header';
import TopicList from './topicList';
import TopicDetail from './topicDetail';
import AddTopic from './addTopic';
import './App.scss';
import { BrowserRouter as Router, Route }from 'react-router-dom';

interface currentUser {
	user: {
		name: string,
		email: string,
		id: string,
	},
	status?: boolean
}


class App extends React.Component<{}, currentUser> {
	state: currentUser = {
		user: {
			name: '',
			email: '',
			id: '',
		},
		status: false
	}

	componentDidMount() {
		this.updataFetch()
	}
	componentWillReceiveProps(nextProps: any) {
			this.updataFetch()
	}
	updataFetch(){
		fetch(process.env.REACT_APP_API_URL+'/users')
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
						status: true
					})
				}else{
					this.setState({
						status: false
					})
				}
			})
	}


	render() {
		return (
			<Router>
				<div className="App" id='App'>
					<Header userInfo={JSON.stringify(this.state.user.name)} userStatus={JSON.stringify(this.state.status)}></Header>
					<Route path="/" exact component={TopicList} />
					<Route path="/topics_detail/:id" component={TopicDetail} />
					<AddTopic/>
				</div>
			</Router>
		);
	}

}

 export default App;
