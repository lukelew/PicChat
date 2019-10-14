import React from 'react';
import { Redirect } from 'react-router';
import { Button,Form, Icon,Input,Drawer,Avatar,Result, Divider,message} from 'antd';
import './register.scss';
import 'antd/dist/antd.css';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            name: '',
            password: '',
            avatar: 1, //default avatar

            showAvatar: 'none', //display avatar list
            closeAvatar:'', //close avatar list 

            confirmDirty: false,
            visible: true, //control drawer
            cancel: false, //back to home page
            isRegister: false, //register success
            returnHome: false, //after register success, return home

            callbackResultEmail: '',//record the database search result 
            callbackTextEmail:'',
            callbackResultName:'',
            callbackTextName:'',
        };
    }

    //control drawer
    onClose = () => { 
        this.setState({
        visible: false,
        returnHome: true
        });
    };

    //check form submit
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
      };

    //judge email whether exists
    handleChangeEmail(e){ //record input value: email
        this.setState({
            email: e.target.value
        })
    };

    compareToUserEmail = () =>{ //check whether input user name is exist
        let url = process.env.REACT_APP_API_URL + '/users/verifyEmail';
        let post_data = { 
            email: this.state.email,
        }
        var emailV = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ //verify E-mail rule
        if(this.state.email===''){ //check empty input
            this.setState({
                callbackResultEmail: "error",
                callbackTextEmail: "Please input your E-mail address"
            })
        }
        else if(emailV.test(this.state.email)) { //check whether input Email is exist
            fetch(url,{
                method:'POST',
                body: JSON.stringify(post_data),
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).then(res=>res.text().then(
                data=>{
                    var dataBack=JSON.parse(data);
                    if(dataBack.status==="failure"){
                        this.setState({
                            callbackResultEmail: "error",
                            callbackTextEmail: "This E-mail already existed." 
                        })
                    }
                    else {
                        this.setState({
                            callbackResultEmail: "success",
                            callbackTextEmail: "Available!"
                        })
                    }
                }
            ))   
        }else{ //error email form
            this.setState({
                callbackResultEmail: "error",
                callbackTextEmail: "Please input correct email format!",
            }) 
        }

    }

    //judge name whether exists
    handleChangeName(e){ //record input value: user name
        this.setState({
            name: e.target.value
        })
    };

    compareToUserName = () =>{ //check whether input user name is exist

        let url = process.env.REACT_APP_API_URL + '/users/verifyUsername';
        let post_data = { 
            name: this.state.name,
        };
        var nameV = /^[ ]+$/ //verify input rules
        if(this.state.name===''){ //check empty input
            this.setState({
                callbackResultName: "error",
                callbackTextName: "Please input your user name"
            })
        }
        else if(!nameV.test(this.state.name)){ //check white space input at first letter
            fetch(url,{
                method:'POST',
                body: JSON.stringify(post_data),
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).then(res=>
                    res.text().then(
                        data=>{
                            var dataBack=JSON.parse(data);
                            if(dataBack.status==="failure"){ //register username judge
                                this.setState({
                                    callbackResultName: "error",
                                    callbackTextName: "This user name already existed." 
                                })
                            }
                            else {
                                this.setState({
                                    callbackResultName: "success",
                                    callbackTextName: "Available!"
                                })
                            }
                        } 
                    )     
                )
        }
        else{
            this.setState({
                callbackResultName: "error",
                callbackTextName: "The first letter can't accept whitespace.",
            }) 
        }
    }

    //judge confirm password
    handleChangePassword(e){ //record input value: password
        this.setState({
            password: e.target.value
        })
    };
    handleConfirmBlur = e => { //record input value: confirm password
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    compareToFirstPassword = (rule, value, callback) => { //compare confirm password
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Not the same passowrd!');
        } else {
          callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => { // verify password rule
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
    //submit the user register request
    postData = () => { 
        if(this.state.email===''){
            this.setState({
                callbackResultEmail: 'error',
                callbackTextEmail: "Please input your E-mail address"
            })
        }
        if(this.state.name===''){
            this.setState({
                callbackResultName: "error",
                callbackTextName: "Please input your user name"
            })
        }
        let url = process.env.REACT_APP_API_URL + '/users/register';
        let post_data = { 
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            avatar: this.state.avatar
        };
        this.props.form.validateFields(err => {
            if (!err) { 
                fetch(url,{//post register user info
                    method:'POST',
                    body: JSON.stringify(post_data),
                    headers: new Headers({'Content-Type': 'application/json'})
                }).then(res=>res.text()
                    .then(
                        data=>{
                            var dataBack=JSON.parse(data);
                            if(dataBack.status==="success"){
                                this.setState({
                                    isRegister: true,
                                })
                                console.log(this.state.isRegister,'in')
                            }
                        }
                    ))              
            }
        }); 
    };
    //login if register success
    login = () => {
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
                    headers: {'Content-Type': 'application/json'}
                })
                .then(res=>res.json())
                .then(
                    data=>{
                        if(data.status==='failure'){
                            message.error(data.message+'!Please try again!')
                        }else{
                            window.location.reload();
                        } 
                    }
                )
           }
        }); 
    };

    //control vertify page
    Vertified=()=>{
        this.setState({
            visible: false,
            returnHome: true,
        })
        this.login();
    }
    
    //change avatar
    changeAvatar = (newAvatar)=>{
        this.setState({
            avatar: newAvatar,
            closeAvatar:'',
            showAvatar:'none'
        })
    }

    //control avatar list
    showAvatar=()=>{
        this.setState({
            closeAvatar: 'none',
            showAvatar:''
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        // Show avatar list
        const avatarUrl= '../avatars/'+this.state.avatar+'.png';
        const avatarList = [];
        for(let i=1; i<=16; i++){
            avatarList.push(<Avatar key={i} size="64" src={'../avatars/'+ i +'.png'} onClick={() => this.changeAvatar(i)} />)
        }
        //form layout control
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

        //pass user's data
        var datapass={name: this.state.name,email: this.state.email,id:'',status: true}
        var path={
            pathname: '/',
            query: datapass,
        };

        // register page
        if(this.state.returnHome){ // return to homepage
            return ( <Redirect to= {path}/> )    
        }
        else if(this.state.isRegister){ //feedback for register success 
            return(
                <div id='successRegister'>
                    <Drawer
                        title="Register"
                        width={460}
                        closable={false}
                        visible={this.state.visible}
                    >
                        <Result
                            status="success"
                            title="Well done^.^! Register success!"
                            subTitle="Welcome to UTS picChat community! You can post your interesting picture and react others now!"
                            extra={[
                                <Button type="primary" onClick={this.Vertified} size="large">Continue and Login</Button>,
                            ]}
                        />
                    </Drawer>
                </div>
            )  
        }
        else {
            return( // register page
                <div id='register'>
                    <Drawer
                        title="Register"
                        width={460}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form onSubmit={this.handleSubmit} className="register-form" {...formItemLayout}>
                        {/* avatar display */}
                        <Form.Item label="Avatar:" hasFeedback>
                            <div id="avatarN" style={{display: this.state.showAvatar}} className="notChosen">
                                {avatarList}
                            </div>
                            <div id="avatarY" style={{display: this.state.closeAvatar}} className="isChosen">
                                <Avatar id="1" size={64} src={avatarUrl} onClick={this.showAvatar}/>
                            </div>
                        </Form.Item>

                        {/* enter Email */}
                        <Form.Item label="E-mail" hasFeedback validateStatus={this.state.callbackResultEmail} help={this.state.callbackTextEmail}>
                            {getFieldDecorator('eamil', {
                                rules: [
                                    {required: true,message: 'Please input your E-mail！'},
                                ],
                            })(
                                <Input
                                type="email"
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="E-mail"
                                onBlur={this.compareToUserEmail}
                                onChange={this.handleChangeEmail.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* enter Name */}
                        <Form.Item label="User Name" hasFeedback validateStatus={this.state.callbackResultName} help={this.state.callbackTextName}>
                            {getFieldDecorator('Name', {
                                rules: [
                                    {required: true, message: 'Please input your name!'},
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="User Name"
                                onBlur={this.compareToUserName}
                                onChange={this.handleChangeName.bind(this)}
                                />,
                            )}
                        </Form.Item>

                        {/* enter Password */}
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message:'You need to setting password'}, 
                                    {min: 6, message: 'Minimum 6 letter' },
                                    {validator: this.validateToNextPassword}
                                ],
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
                        <Form.Item label="Confirm" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {required: true},{min:6,message:'Minimum 6 Letters！'},
                                    {validator: this.compareToFirstPassword,}
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>) }
                        </Form.Item>
                        
                        {/* submit */}
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="register-form-button" onClick={this.postData}>
                                Register
                            </Button>
                            <Divider className="divider"></Divider>
                            <a href="/login" id="login_register" className="login_text">Login Now</a>
                        </Form.Item>
                    </Form>
                    </Drawer>
                    </div>
            );
        }
    }
};
export default Form.create()(Register);