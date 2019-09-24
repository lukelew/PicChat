import React from 'react';
import { Link }from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import ReactPanel from '../emoji';
import UploadBox from '../addTopic/uploadImage';
import './card.scss';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/iconfont.js'
});

interface cardProps {
	picUrl: string,
	name: string,
	avatar: number,
	topicId: string,
	createAt: string,
	replies: Array<any>,
	reacts: Array<any>,
	yourReact: any,
}

interface cardState {
	reacts: Array<any>,
	showUploadModal: boolean
}


class Card extends React.Component<cardProps, cardState>  {
	state ={
		reacts: this.props.reacts,
		showUploadModal: false
	}

	updateReacts = (newReact: any)=> {
		let exist = false;
		let updatedReacts = this.state.reacts;
		for (let i = 0; i < this.state.reacts.length; i++){
			let react = this.state.reacts[i];
			if (react._id === newReact._id) {
				exist = true;
				updatedReacts[i].emoji = newReact.emoji;
			}
		}
		if(exist){
			this.setState({
				reacts: updatedReacts
			})
		}
		else {
			this.setState(currentState => ({
				reacts: [...currentState.reacts, newReact]
			}))
		}
		
		
	}

	showModal = () => {
        this.setState({
          showUploadModal: true
        });
      };  

      handleCancelUpload = () => {
        this.setState({
			showUploadModal: false
        });
      };

	render() {

		return (
			<div className="card">
				<div className="user_info">
					<Avatar src={'../avatars/' + this.props.avatar + '.png'} />
					<strong>{this.props.name}</strong>
					<span className="date">posted on {this.props.createAt.substr(0, 10)}</span>
				</div>
				<div className="img_box">
					<Link to={`/topics_detail/${this.props.topicId}`}>
						<img src={this.props.picUrl} alt={this.props.picUrl}/>
					</Link>
				</div>
				<div className="interact_box">
					{this.state.reacts.length > 0 &&
						<div className="current_reacts">
							{this.state.reacts.map(react => {
								return (
									<span key={react._id}><MyIcon type={'icon-' + react.emoji} /></span>
								)
							})}
						</div>
					}
					<div className="buttons_box">
						<ReactPanel topicId={this.props.topicId} yourReact={this.props.yourReact} updateReacts={() => this.updateReacts} />
						<Icon className="add_reply" type="picture" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '24px' }} onClick={this.showModal}/>
					</div>
				</div>

				{this.props.replies.length > 0 &&
					<div className="replies">
						<Link to={`/topics_detail/${this.props.topicId}`}>{this.props.replies.length} replies</Link>
					</div>
				}

				<UploadBox showModal={ this.state.showUploadModal } 
						   hideModal={ this.handleCancelUpload }
						   boxHeader="Upload new picture to reply on topic"
						   topicId={this.props.topicId}/>
			</div>
		)
	}

}

export default Card;