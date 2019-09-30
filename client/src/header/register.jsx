import React from 'react';
import { Redirect } from 'react-router';
import { Button,Form, Icon, Input,Drawer,Avatar,Result} from 'antd';
import './register.scss';
import 'antd/dist/antd.css';
// import Check_Login from './checkLogin'


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            name: '',
            password: '',
            avatar: 1,

            showAvatar: 'none',
            closeAvatar:'',

            confirmDirty: false,
            visible: true,
            cancel: false, //用于关闭页面并返回主页路径
            isRegister: false //用于核对是否注册成功
        };
    }
    
    onClose = () => {
        this.setState({
        visible: false,
        // isRegister: true,
        cancel: true
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      //obtain name and password 
    handleChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    };
    
    handleChangePassword(e){
        this.setState({
            password: e.target.value
        })
    };
    handleChangeName(e){
        this.setState({
            name: e.target.value
        })
    };

    //judge confirm password
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Wrong!Please Confirm Again!');
        } else {
          callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

    //Post_data_register
    postData = () => {
        let url = process.env.REACT_APP_API_URL + '/users/register';
        let post_data = { 
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            avatar: this.state.avatar
        };

        //post register user info
        fetch(url,{
            method:'POST',
            body: JSON.stringify(post_data),
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        }).then(res=>res.text().then(
            data=>{
                console.log(data);
                var dataBack=JSON.parse(data);
                console.log(dataBack,dataBack.status)
                //register status and email address vertify
                if(dataBack.status==="success"){
                    this.setState({
                        isRegister: true,
                    })
                    console.log(this.state.isRegister,'in')
                    // window.location.reload();
                }
            }
        ))
    };
    //control vertify page
    Vertified=()=>{
        this.setState({
            cancel: true,
        })
    }
    
    //change avatar
    changeAvatar = (newAvatar)=>{
        this.setState({
            avatar: newAvatar,
            closeAvatar:'',
            showAvatar:'none'
        })
    }

    showAvatar=()=>{
        this.setState({
            closeAvatar: 'none',
            showAvatar:''
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const avatarUrl= '../avatars/'+this.state.avatar+'.png';

        const avatarList = [];
        for(let i=1; i<=16; i++){
            avatarList.push(<Avatar key={i} size="64" src={'../avatars/'+ i +'.png'} onClick={() => this.changeAvatar(i)} />)
        }

        if(this.state.cancel){
            return <Redirect to="/" />
          }
        else if (this.state.isRegister){
                return (
                    <div id='successRegister'>
                        <Drawer
                            title="Register"
                            width={350}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <Result
                                status="success"
                                title="Vertify Your E-mail Address"
                                subTitle="We just send you an E-mail with vertification link. Please check your mailbox and click the link to vertiy your E-mail Address"
                                extra={[
                                <Button type="primary" onClick={this.Vertified}>Already Vertified</Button>,
                                ]}
                            />
                        </Drawer>
                    </div>
                )
            }
        else {
            return(
                <div id='register'>
                    <Drawer
                        title="Register"
                        width={350}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <h4><span className="mustChoose">*</span> Please select your avatar</h4>
                    
                    <div id="avatarN" style={{display: this.state.showAvatar}} className="notChosen">
                        {avatarList}
                    </div>
                
                    <div id="avatarY" style={{display: this.state.closeAvatar}} className="isChosen">
                        <Avatar id="1" size={64} src={avatarUrl} onClick={this.showAvatar}/>
                    </div>
                    
                    <Form onSubmit={this.handleSubmit} className="register-form" >
                        {/* enter Email */}
                        <Form.Item label="E-mail" hasFeedback>
                        {getFieldDecorator('eamil', {
                            rules: [{ required: true, type:'email',message: 'Please input email‘s format！' }],
                        })(
                            <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-mail"
                            onChange={this.handleChangeEmail.bind(this)}
                            />,
                        )}
                        </Form.Item>

                        {/* enter Name */}
                        <Form.Item label="User Name" hasFeedback>
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, min:'3',message: 'The minimum letter is 3!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="User Name"
                            onChange={this.handleChangeName.bind(this)}
                            />,
                        )}
                        </Form.Item>

                        {/* enter Password */}
                        <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, min:'4',message: 'Please input your Password!' },
                            {validator: this.validateToNextPassword,},],
                        })(
                            <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChangePassword.bind(this)}
                            />,
                        )}
                        </Form.Item>

                        {/* confirm Password */}
                        <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [{required: true, min:'4',message: 'Please confirm your password!',},
                            {
                                validator: this.compareToFirstPassword,
                            },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>) }
                        </Form.Item>
                        
                        <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" className="register-form-button" onClick={this.postData}>
                            Register
                        </Button>
                        <a href="/login" id="login_register">Login Now</a>
                        </Form.Item>
                    </Form>
                    </Drawer>
                    </div>
                    );
            }
    }
};
export default Form.create()(Register);