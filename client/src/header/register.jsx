import React from 'react';
import { Redirect } from 'react-router';
import { Button,Form, Icon, Input,Drawer,Row,Col} from 'antd';
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

            verificationNumber: '',//用户输入的验证码
            verifyResult: Boolean,//用于记录邮箱返回验证码

            confirmDirty: false,
            visible: true,
            cancel: false, //用于关闭页面并返回主页路径
            isRegister: false //用于核对是否注册成功
        };
    }

    onClose = () => {
        this.setState({
        visible: false,
        isRegister: true,
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
    //verify email
    handleChangeVerify= e =>{
        this.setState({
            verificationNumber: e.target.value
        })
    }
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
    
    //confirm Email
    confirmEmail=()=>{
        fetch('http://localhost:3000/users/email').then(
            res=>res.text()
            ).then(
                data=>{ 
                    if(this.state.verificationNumber===JSON.stringify(data)){
                        this.setState({
                            verifyResult: true
                        })
                    }
                    console.log(this.state.verifyResult)
                }
        )
    }

    //Post_data_register
    postData = () => {
        let url='http://localhost:3000/users/register';
        let post_data = { 
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        };

        fetch(url,{
            method:'POST',
            body: JSON.stringify(post_data),
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        }).then(res=>res.text().then(
            data=>{
                console.log(data);
                //register status and email address vertify
                if(JSON.stringify(data.status)==='success'&&this.state.verifyResult){
                    this.setState({
                        isRegister: true
                    })
                }
            }
        ))
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        if(this.state.cancel||this.state.isRegister){
            return <Redirect to="/" />
          }
        else{
        return(
        <div id='register'>
            <Drawer
                title="Register"
                width={300}
                onClose={this.onClose}
                visible={this.state.visible}
            >
            <Form onSubmit={this.handleSubmit} className="register-form" >
                {/* enter Email */}
                <Form.Item label="E-mail" hasFeedback>
                {getFieldDecorator('eamil', {
                    // eslint-disable-next-line no-undef
                    rules: [{ required: true,type: 'email',message: 'Please input email‘s format' }],
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
                
                {/* verify Email */}
                <Form.Item label="Vertify E-mail Address" extra="Please check your vertification number in your mailbox.">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(<Input 
                                placeholder="Number"
                                onChange={this.handleChangeVerify.bind(this)}
                                />)}
                        </Col>
                        <Col span={12}>
                            <Button onClick={this.confirmEmail}>Confirm</Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button" onClick={this.postData}>
                    Register
                </Button>
                {/* <a href="" id="login_register">Register now!</a> */}
                </Form.Item>
            </Form>
            </Drawer>
            </div>
            );
            }
        }
};
export default Form.create()(Register);