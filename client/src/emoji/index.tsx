import React from 'react';
import { Icon, Popover } from 'antd';
import EmojiList from './list';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/iconfont.js',
});

interface ReactPanelProps {
	topicId: string,
	yourReact: string
}

class ReactPanel extends React.Component<ReactPanelProps>{
	render() {
		return (
			<div className="interact_box">
				<Popover content={<EmojiList reactTo={this.props.topicId} yourReact={this.props.yourReact}/>} title="React" trigger="click">
					<Icon type="smile" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '20px' }}/>
				</Popover>
				<Icon type="picture" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '20px' }}/>
			</div>
		)
	}
}

export default ReactPanel;