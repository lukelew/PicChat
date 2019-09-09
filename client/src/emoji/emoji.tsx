import React from 'react';
import { Icon, Popover } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/iconfont.js'
});

interface emojiProps {
	reactTo: string,
	type: string,
	isActive: string
}

class Emoji extends React.Component<emojiProps> {

	onClickHandler = (to: string, type: string) => {
		const data = {
			topic_id: to,
			emoji: type
		}
		fetch('http://localhost:3000/reacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		})
	}

	render() {
		return (
			<span onClick={() => this.onClickHandler(this.props.reactTo, this.props.type)} className={this.props.isActive}>
				<MyIcon type={'icon-' + this.props.type}/>
			</span>
		)
	}
}

export default Emoji;