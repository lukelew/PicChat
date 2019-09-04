import React from 'react';
import { Button,Form, Icon, Input } from 'antd';
import './register.scss';
import 'antd/dist/antd.css';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            name: '',
            password:'',
            confirmDirty: false
        };
    }

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
            }
        ))
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
        <div id='register'>
            <Form onSubmit={this.handleSubmit} className="register-form" style={{marginTop:'30px'}}>
            <p id="text_register">Register</p>
                {/* enter Email */}
                <Form.Item label="E-mail" hasFeedback>
                {getFieldDecorator('eamil', {
                    // eslint-disable-next-line no-undef
                    rules: [{ required: true,type: 'email',message: 'Please input email‘s format' }],
                })(
                    <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
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
                <Button type="primary" htmlType="submit" className="register-form-button" onClick={this.postData}>
                    Register
                </Button>
                {/* <a href="" id="login_register">Register now!</a> */}
                </Form.Item>
            </Form>
                </div>
            );
        }
};
export default Form.create()(Register);