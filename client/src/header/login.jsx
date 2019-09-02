import React from 'react';
import { Redirect } from 'react-router';
// import {Route, BrowserRouter}from 'react-router-dom';
// import {Link} from 'react-router-dom';

import { Button,Form, Icon, Input} from 'antd';
import './login.scss';
import 'antd/dist/antd.css';


class Login extends React.Component {
  constructor(props){
  super(props);
  this.state = { 
    //   visible: true, 
    //   closable_show: false,
      isLogin: false,
      email:'',
      password:'',                                            
    };
    
  }
  //display the login window 
//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

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
  // getUserName(){
  //   return (
  //     this.props.handEmail(this.state.email)
  //     );
  // };


  //Post_data_login
  postData = () => {
      let url='http://localhost:3000/users/login';
      let post_data = { 
          email: this.state.email,
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
            if(data.email===this.state.email){}
            else{
            console.log(data);
              this.setState({
                isLogin: true
              })
            }
          }
      ).then(
        this.getUserName
      ))
  };

  //life circle
//   componentWillMount(){
//     this.postData();
//     }

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.state.isLogin){
      return <Redirect to="/"/>
    }else{
    //login_button
    // if(this.isLogin){
    return (
      <div id='login'>
        {/* <Button id='login_button' type="primary" onClick={this.showModal} >
          login
        </Button> */}
        <div id='login_form'>
    
            <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop:'30px'}}>
            <p id="text_login">Login</p>
                <Form.Item label="E-mail" hasFeedback>
                {getFieldDecorator('eamil', {
                    rules: [{ required: true, type: 'email',message: 'Please input your email!' }],
                })(
                    <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    onChange={this.handleChangeEmail.bind(this)}
                    />,
                )}
                </Form.Item>
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
                <Form.Item>
                <a className="login-form-forgot" href="">
                    Forgot password?
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.postData}>
                    Login
                </Button>
                {/* <a href="" id="login_register">Register now!</a> */}
                </Form.Item>
            </Form>

        </div>
      </div>
    );
    }
    // else{
    //   return(
        
    //   );
    //    }
  // }
  }
};
export default Form.create()(Login);
    