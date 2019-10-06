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

        result:'', //database search result
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

  //judge email whether exists
  handleChangeEmail(e){
      this.setState({
          email: e.target.value
      })
  };
  compareToUserEmail = (rule, value, callback) =>{
    let url = process.env.REACT_APP_API_URL + '/users/verifyEmail';
    let post_data = { 
        email: value,
    };
    fetch(url,{
        method:'POST',
        body: JSON.stringify(post_data),
        headers: new Headers({
        'Content-Type': 'application/json'
        })
    }).then(res=>res.text().then(
        data=>{
            var dataBack=JSON.parse(data);
                //register email judge
                if(dataBack.status==="failure"){
                    callback();
                }
                else {
                    callback('This E-mail do not exist.');
                }
        }
    ))
}

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
          password: this.state.password,
        };
        this.props.form.validateFields(err => {
            if (!err) {
            fetch(url,{
                method:'POST',
                body: JSON.stringify(post_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(
                    res=>res.json()
                )
            .then(
                    data=>{
                        if(data.status==='failure'){
                            message.error(data.message+'!Please try again!')
                        }
                        else if(data.user.email===this.state.email){
                            this.setState({
                                isLogin: true,
                                login_username: data.user.name
                            });
                            window.location.reload();
                            // message.success('Login Success',3);
                        }else{
                            this.setState({
                                isLogin: false
                            });
                            message.success('Login False');
                            window.location.reload();
                        } 
                    }
                )
           }
        }); 
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
                        width={360}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form onSubmit={this.handleSubmit} className="login-form" >
                        {/*login_email */}
                        <Form.Item  hasFeedback>
                            {getFieldDecorator('eamil', {
                                rules: [
                                    {required: true, message: 'Please input your email.'},
                                    {type: 'email', message: 'Please input email‘s format!' },
                                    {validator: this.compareToUserEmail}],
                              })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                    onChange={this.handleChangeEmail.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* login_password*/}
                        <Form.Item  hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChangePassword.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* login_submit*/}
                        <Form.Item>
                          {/* <a className="login-form-forgot" href="/register">Forgot password?</a> */}
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