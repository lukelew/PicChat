import React from 'react';
import Header from './header';
import TopicList from './topicList';
import TopicDetail from './topicDetail';
import AddTopic from './addTopic';
import './App.scss';
import { BrowserRouter as Router, Route }from 'react-router-dom';

// const UserContext = React.createContext({});
// export const UserProvider = UserContext.Provider;
// export const UserConsumer = UserContext.Consumer;

interface currentUser {
	user: {
		name: string,
		email: string,
		id: string
	}
}

class App extends React.Component<{}, currentUser> {
	state: currentUser = {
		user: {
			name: '',
			email: '',
			id: ''
		}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL+'/users')
		.then(res => res.json())
		.then(data => {
			if(data.status == 'success'){
				this.setState({
					user: {
						name: data.user.name,
						email: data.user.email,
						id: data.user.id
					}
				})
			}
		})
	}

	render() {
		return (
			<Router>
				{/* <UserProvider value={this.state.user}> */}
					<div className="App" id='App'>
						<Header></Header>
						<Route path="/" exact component={TopicList} />
						<Route path="/topics_detail/:id" component={TopicDetail} />
						<AddTopic/>
					</div>
				{/* </UserProvider> */}
			</Router>
		);
	}

}

 export default App;
