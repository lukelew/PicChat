import React from 'react';
import { Icon, Popover } from 'antd';
import Emoji from './emoji';
import './index.scss';

interface EmojiListProps {
	reactTo: string,
	yourReact: string
}

interface EmojiListState {
	yourReact: string,
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

	render() {
		return (
			<div className="emoji_box">
			{this.state.types.map( emoji => {
				return (
					<Emoji key={emoji} reactTo={this.props.reactTo} type={emoji} isActive={this.state.yourReact == emoji ? 'isActive' : ''}/>
				)
			})}
			</div>
		)
	}
}

export default EmojiList;