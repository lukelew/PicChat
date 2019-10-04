import React from 'react';
import io from 'socket.io-client';
import Header from './header';
import TopicPanel from './topic';
import UserPanel from './user';
import Footer from './footer';
import { Affix, BackTop, Icon} from 'antd';
import './App.scss';
import { BrowserRouter as Router, Route, Switch }from 'react-router-dom';

interface currentUser {
	user: {
		name: string,
		email: string,
		id: string,
		avatar: string
	},
	isLogin?: boolean
}


class App extends React.Component<{}, currentUser> {
	state = {
		user: {
			name: '',
			email: '',
			id: '',
			avatar:''
		},
		isLogin: false
	}

	componentDidMount() {
		this.updataFetch();
		// var socket = io();
		// socket.on('connection', function (socket: any) {
		// 	console.log('a user connected');
		// });
		// socket.emit('mssg', 'biubiubiu')
	}

	updataFetch=()=>{
		fetch(process.env.REACT_APP_API_URL+'/users')
		.then(res => res.json())
			.then(data => {
				if(data.status === 'success'){
					this.setState({
						user: {
							name: data.user.name,
							email: data.user.email,
							id: data.user.id,
							avatar: data.user.avatar,
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
						<Header userName={this.state.user.name} isLogin={this.state.isLogin} avatar={this.state.user.avatar}></Header>
					</Affix>
					<Switch>
						<Route path="/user" component={UserPanel} />
						<Route path="/" component={TopicPanel} />
					</Switch>					
					<BackTop><div className="ant-back-top-inner"><Icon type="arrow-up" /></div></BackTop>
					<Footer/>
				</div>
			</Router>
		);
	}

}

 export default App;
