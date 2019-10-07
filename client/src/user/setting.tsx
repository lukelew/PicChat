import React from 'react';
import { Avatar, Button, message } from 'antd';
import './index.scss';

interface MySettingProps {
    user: any
}

interface MySettingState {
    onChanging: boolean,
    avatar?: number
}

class MySetting extends React.Component<MySettingProps, MySettingState> {
    constructor(props: any) {
        super(props);
        this.state = {
            onChanging: false,
            avatar: this.props.user.avatar
        }
    }

    swtichOnAvatarList = () => {
        this.setState({
            onChanging: !this.state.onChanging
        })
    }

    onChangeAvatar = (key:any) => {
       this.setState({
           avatar: key
       })
    }

    onSubmit = () => {
        const newAvatar = {
            avatar: this.state.avatar
        }
        fetch(process.env.REACT_APP_API_URL + '/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newAvatar)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                message.success('Avatar updated Successfully!')
            }
        })
    }

    render() {
        const avatarList = [];
        for (let i = 1; i <= 16; i++) {
            avatarList.push(<div key={i} onClick={() => this.onChangeAvatar(i)}><Avatar size={64} src={'../avatars/' + i + '.png'}/></div>)
        }

        return (
            <React.Fragment>
                <h2>My Settings</h2>
                <div id="user_setting">
                    <p>Change your avatar:</p>
                    <div className="currentAvatar">
                        <div className="avatar_display" onClick={() => this.swtichOnAvatarList()}>
                            <Avatar className="avatar" size={64} src={'../avatars/' + this.state.avatar + '.png'} />
                        </div>
                        <Button className="save" type="primary" onClick={this.onSubmit}>Save</Button>
                    </div>
                    { this.state.onChanging && 
                        <div className="avatar_list">
                            {avatarList}
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default MySetting;