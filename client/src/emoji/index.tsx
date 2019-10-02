import React from 'react';
import { Icon, Popover, message } from 'antd';
import './index.scss';

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '/iconfont.js'
});

interface ReactPanelProps {
	topicId: string,
	yourReact: any,
	updateReacts: any,
	deleteReacts: any
}
interface ReactPanelState {
	yourReact: any,
	types: Array<string>
}

class ReactPanel extends React.Component<ReactPanelProps, ReactPanelState>{
	constructor(props: any) {
		super(props);
		this.state = {
			yourReact: this.props.yourReact,
			types: ['a', 'baiyan', 'aixin', 'daxiao', 'fadai', 'ganga', 'hanyan', 'liulei', 'xiaochulei', 'shengqi', 'feiwen', 'huaixiao', 'santiaoxian', 'yiwen', 'siliao']
		}
	}

	updateReacts = this.props.updateReacts();
	deleteReacts = this.props.deleteReacts();

	componentDidUpdate(prevReact: ReactPanelProps){
		if (this.props.yourReact !== prevReact.yourReact) {
			this.setState({
				yourReact: this.props.yourReact
			})
		}	
	}

	reactToTopic = (to: string, emoji: string) => {
		const curReact = this.state.yourReact;
		// add new react
		if (!curReact) {
			const data = {
				topic_id: to,
				emoji: emoji
			}
			fetch(process.env.REACT_APP_API_URL + '/reacts', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(data => {
				// User hasn't logged in yet
				if (data.status === 'failure'){
					message.error('You need to login to react');
				}
				// Already logged in 
				else{
					this.setState({
						yourReact: {
							_id: data.newReact._id,
							emoji: emoji
						}
					})
					this.updateReacts(data.newReact);
					message.success('React Successfully');
				}
				
			})
		}
		// delete the react
		else if (curReact.emoji === emoji ) {
			const data = {
				react_id: curReact._id
			}
			fetch(process.env.REACT_APP_API_URL + '/reacts', {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(data => {
				this.setState({
					yourReact: ""
				})
				this.deleteReacts(data.deleteId);
				message.success('React Deleted Successfully');
			})
		}
		// update current react
		else {
			const data = {
				react_id: curReact._id,
				emoji: emoji
			}
			fetch(process.env.REACT_APP_API_URL + '/reacts', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(data => {
				// User hasn't logged in yet
				if (data.status === 'failure') {
					console.log('not login yet');
				}
				else{
					this.setState({
						yourReact: {
							_id: data.newReact._id,
							emoji: emoji
						}
					})
					this.updateReacts(data.newReact);
					message.success('React Updated Successfully');
				}
				
			})
		}
	}

	render() {
		const EmojiList = (
			<div className="emoji_box">
				{this.state.types.map(emoji => {
					return (
						<span key={emoji} className={this.state.yourReact.emoji === emoji ? 'isActive' : ''} onClick={() => this.reactToTopic(this.props.topicId, emoji)}>
							<MyIcon type={'icon-' + emoji} />
						</span>
					)
				})}
			</div>
		)

		return (
			<Popover title="React" content={EmojiList} placement="bottom">
				<Icon className="add_react" type="smile" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '24px' }} />
			</Popover>
		)
	}
}

export default ReactPanel;