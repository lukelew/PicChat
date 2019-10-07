import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Avatar, Icon, Empty, Menu, Dropdown, message  } from 'antd';
import Replies from './replies';
import './index.scss';
import ReactPanel from '../emoji';
import UploadBox from '../addTopic/uploadImage';

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '/iconfont.js'
});

interface getIdProps {
	id: string,
}

interface topicProps extends RouteComponentProps<getIdProps>{

}

interface replies {
	_id: string,
	originalPicUrl: string,
	createBy: any,
	name: string,
	avatar: number,
	createAt: string,
	replies: Array<any>,
	reacts: Array<any>,
	yourReact: any
}

interface detailState {
	loginUser: any,
	isLoading: boolean,
	id: string,
	name: string,
	avatar: number,
	originalPicUrl: string,
	createAt: string,
	replies: Array<replies>,
	reacts: Array<any>,
	yourReact: any,
	showUploadModal: boolean
}

class TopicDetail extends React.Component< topicProps, detailState> {
	constructor(props: topicProps){
		super(props);
		this.state = {
			loginUser: {},
			isLoading: true,
			id: '',
			name: '',
			avatar: 1,
			originalPicUrl: '',
			createAt: '',
			replies: [],
			reacts: [],
			yourReact: "",
			showUploadModal: false
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

	updateReacts = (newReact: any) => {
		let exist = false;
		let updatedReacts = this.state.reacts;
		for (let i = 0; i < this.state.reacts.length; i++) {
			let react = this.state.reacts[i];
			if (react._id === newReact._id) {
				exist = true;
				updatedReacts[i].emoji = newReact.emoji;
			}
		}
		if (exist) {
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
	
	deleteReacts = (deleteId: string) => {
		var updatedReact = this.state.reacts;
		for (let i = 0; i < updatedReact.length; i++) {
			if (updatedReact[i]._id === deleteId) {
				updatedReact.splice(i, 1);
				this.setState({
					reacts: updatedReact
				})
				return
			}
		}
	}

	componentDidMount(){
		fetch(process.env.REACT_APP_API_URL+'/topics/single?id='+ this.props.match.params.id)
			.then(res => res.json())
			.then(data => {
				const curTopic = data;
				this.setState({
					isLoading: false,
					id: curTopic._id,
					name: curTopic.createBy.name,
					avatar: curTopic.createBy.avatar,
					originalPicUrl: curTopic.originalPicUrl,
					createAt: curTopic.createAt,
					replies: curTopic.replies,
					reacts: curTopic.reacts,
					yourReact: curTopic.yourReact ? curTopic.yourReact : ""
				})
			})


		fetch(process.env.REACT_APP_API_URL + '/users')
			.then(res => res.json())
			.then(data => {
				if (data.status === 'success') {
					this.setState({
						loginUser: {
							name: data.user.name,
							email: data.user.email,
							id: data.user.id,
							avatar: data.user.avatar,
						}
					})
				}
				else {
					this.setState({
						loginUser: {}
					})
				}
			})
		
	}

	render() {
		const repliesList = this.state.replies.map( reply => {
			return (
				<Replies
					key={reply._id}
					originalPicUrl={reply.originalPicUrl}
					name={reply.createBy.name}
					avatar={reply.createBy.avatar}
					replies={reply.replies}
					createAt={reply.createAt}
					topicId={reply._id}
					reacts={reply.reacts}
					yourReact={reply.yourReact ? reply.yourReact : ''}
				/>

			)
		})

		const settingMenu = (
			<Menu>
				<Menu.Item>
					<Icon type="redo" />Update
				</Menu.Item>
				<Menu.Item>
					<Icon type="delete" />Delete
				</Menu.Item>
			</Menu>
		)

		return (
			<React.Fragment>
				<div id="topic_detail">
					<div className="header_panel">
						<div id="author_info">
							{this.state.isLoading &&
								<div className="loading_box">
									<Icon type="loading" style={{ color: '#1890ff', fontSize: '40px' }} />
								</div>
							}
							{!this.state.isLoading &&
								<React.Fragment>
									<Avatar src={'../avatars/' + this.state.avatar + '.png'} size={40}/>
									<div className="name_date">
										<strong>{this.state.name}</strong>
										<span className="date">posted on {this.state.createAt.substr(0, 10)}</span>
									</div>
								</React.Fragment>
							}
						</div>
						{this.state.loginUser.name === this.state.name &&
							<div className="settings">
								<Dropdown overlay={settingMenu} placement="bottomCenter">
									<Icon type="more" />
								</Dropdown>
							</div>
						}
					</div>
					
					<div id="main_pic">
						{this.state.isLoading &&
							<div className="loading_box">
								<Icon type="loading" style={{ color: '#1890ff', fontSize: '40px' }} />
							</div>
						}
						{!this.state.isLoading &&
							<img src={this.state.originalPicUrl} />
						}
						
						{this.state.reacts.length > 0 &&
							<div className="reacts_box">
								{this.state.reacts.map(react => {
									return (
										<span key={react._id}><MyIcon type={'icon-' + react.emoji} /></span>
									)
								})}
							</div>
						}
					</div>
					<div className="buttons_box">
						<ReactPanel topicId={this.state.id} yourReact={this.state.yourReact} updateReacts={() => this.updateReacts} deleteReacts={() => this.deleteReacts} />
						<Icon className="add_reply" type="picture" theme="twoTone" twoToneColor="#1890ff" style={{ fontSize: '24px' }} onClick={this.showModal}/>
					</div>
				</div>

				<div id="replies_list">
					<h2>Replies</h2>
					{repliesList.length == 0 && 
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There is no reply yet" />
					}
					{repliesList}
				</div>

				<UploadBox showModal={ this.state.showUploadModal } 
						   hideModal={ this.handleCancelUpload }
						   boxHeader="Upload new picture to reply on topic"
						   topicId={this.state.id}/>
			</React.Fragment>
		)
	}
}

export default TopicDetail;