import React from 'react';
import { Icon, Spin } from 'antd';
import './index.scss';

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '/iconfont.js'
});

interface EmojiListProps {
	reactTo: string,
	yourReact: any
}

interface EmojiListState {
	loading: boolean,
	yourReact: any,
	types: Array<string>
}

class EmojiList extends React.Component<EmojiListProps, EmojiListState> {
	constructor(props:any){
		super(props);
		this.state = {
			loading: false,
			yourReact: this.props.yourReact,
			types: ['a','baiyan','aixin','daxiao','fadai','ganga','hanyan','liulei','xiaochulei','shengqi','feiwen','huaixiao','santiaoxian','yiwen','siliao']
		}
	}

	reactToTopic = (to:string, type:string) => {
		const curReact = this.props.yourReact;
		this.setState({
			loading: true
		})
		// add new react
		if (!curReact){
			const data = {
				topic_id: to,
				emoji: type
			}
			fetch(process.env.REACT_APP_API_URL+'/reacts', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json' 
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({
					loading: false
				})
			})
		}
		// update current react
		else{
			const data = {
				react_id: curReact._id,
				emoji: type
			}
			fetch(process.env.REACT_APP_API_URL+'/reacts', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => {
					this.setState({
						yourReact: {
							emoji: type
						}
					})
					console.log(data);
					this.setState({
						loading: false
					})
				})
		}
	}

	render() {
		return (
			<div className="emoji_box">
			{this.state.types.map( emoji => {
				return (
					<span key={emoji} className={this.state.yourReact.emoji === emoji ? 'isActive' : ''} onClick={() => this.reactToTopic(this.props.reactTo, emoji)}>
						<MyIcon type={'icon-' + emoji} />
					</span>
				)
			})}
			</div>
		)
	}
}

export default EmojiList;