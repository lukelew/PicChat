import React from 'react';
import { Icon, Popover } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/iconfont.js'
});

interface emojiProps {
	reactTo: string,
	type: string,
	isActive: string,
	clickHandler: any
}

class Emoji extends React.Component<emojiProps> {
	render() {
		return (

			<span className={this.props.isActive} onClick={() => this.props.clickHandler(this.props.reactTo, this.props.type)}>
				<MyIcon type={'icon-' + this.props.type}/>
			</span>
		)
	}
}

export default Emoji;