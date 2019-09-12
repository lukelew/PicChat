import React from 'react';
import { Icon, Popover } from 'antd';
import Emoji from './emoji';
import './index.scss';

interface EmojiListProps {
	reactTo: string,
	yourReact: any
}

interface EmojiListState {
	yourReact: any,
	types: Array<string>
}

class EmojiList extends React.Component<EmojiListProps, EmojiListState> {
	constructor(props:any){
		super(props);
		this.state = {
			yourReact: this.props.yourReact,
			types: ['a','baiyan','aixin','daxiao','fadai','ganga','hanyan','liulei','xiaochulei','shengqi','feiwen','huaixiao','santiaoxian','yiwen','siliao']
		}
	}

	reactToTopic = (to:string, type:string) => {
		const curReact = this.props.yourReact;
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
				})
		}
	}

	render() {
		return (
			<div className="emoji_box">
			{this.state.types.map( emoji => {
				return (
					<Emoji clickHandler={this.reactToTopic} key={emoji} reactTo={this.props.reactTo} type={emoji} isActive={this.state.yourReact.emoji == emoji ? 'isActive' : ''}/>
				)
			})}
			</div>
		)
	}
}

export default EmojiList;