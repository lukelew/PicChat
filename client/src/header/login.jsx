import React from 'react';
import { Redirect } from 'react-router';
import { Button,Form, Icon, Input,Drawer,message} from 'antd';
import './login.scss';
import 'antd/dist/antd.css';




class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        isLogin: false,
        login_username: '',
        visible: true,
        email:'',
        password:'',
    };
  }

  onClose = () => {
    this.setState({
      visible: false,
      isLogin: true,
    });

  };

  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);
          }
      })
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

  //Post_data_login
    postData = () => {
        let url = process.env.REACT_APP_API_URL +'/users/login';
        let post_data = { 
          email: this.state.email,
          password: this.state.password
        };

        fetch(url,{
            method:'POST',
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json()).then(
            data=>{
            //后面改成验证邮箱和密码是否匹配。密码部分未写
                if(data.user.email===this.state.email){
                  console.log(data);
                  this.setState({
                        isLogin: true,
                        login_username: data.user.name
                  });
                  message.success('Login Success');
                  window.location.reload();
                }
                else{
                    console.log(data);
                    this.setState({
                        isLogin: false
                    });
                    message.success('Login False');
                    window.location.reload();
                } 
            }
        )
    };


render() {
    const { getFieldDecorator } = this.props.form;

    //pass user's data
    var datapass={name: this.state.login_username,email: this.state.email,id:'',status: true}
    var path={
        pathname: '/',
        query: datapass
    };
    
    if(this.state.isLogin){
        return <Redirect to= {path}/> 
    }
    else{
        return (
            <div id='login'>
                <div id='login_form'>
                    <Drawer
                        title="Login"
                        width={350}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form onSubmit={this.handleSubmit} className="login-form" >
                        {/*login_email */}
                        <Form.Item label="E-mail" hasFeedback>
                            {getFieldDecorator('eamil', {
                                rules: [{ required: true, type: 'email',message: 'Please input email‘s format!' }],
                              })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                    onChange={this.handleChangeEmail.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* login_password*/}
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChangePassword.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* login_submit*/}
                        <Form.Item>
                          <a className="login-form-forgot" href="/register">Forgot password?</a>
                          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.postData}>Login</Button>

                        </Form.Item>
                    </Form>
                    </Drawer>
                </div>
            </div>
        );
    }
  }
};
export default Form.create()(Login);