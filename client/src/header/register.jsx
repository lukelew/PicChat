import React from 'react';
import { Redirect } from 'react-router';
import { Button,Form, Icon,Input,Drawer,Avatar,Result, Divider,message} from 'antd';
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
            cancel: false, //back to home page
            isRegister: false, //register success
            returnHome: false, //after register success, return home
            // callbackEmail: false,
            callbackResultEmail: '',
            callbackTextEmail:'',
            callbackResultName:'',
            callbackTextName:'',
        };
    }
    
    onClose = () => {
        this.setState({
        visible: false,
        returnHome: true
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

    //judge name whether exists
    handleChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    };
    compareToUserEmail = () =>{
        // check email address form
        let url = process.env.REACT_APP_API_URL + '/users/verifyEmail';
        let post_data = { 
            email: this.state.email,
        }
        var emailV = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/
        if(this.state.email===''){
            this.setState({
                callbackResultEmail: "error",
                callbackTextEmail: "Please input your E-mail address"
            })
        }
        else if(emailV.test(this.state.email)) {
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
        }else{
            this.setState({
                callbackResultEmail: "error",
                callbackTextEmail: "Please input correct email format!",
            }) 
        }

    }



    //judge name whether exists
    handleChangeName(e){
        this.setState({
            name: e.target.value
        })
    };

    compareToUserName = () =>{

        let url = process.env.REACT_APP_API_URL + '/users/verifyUsername';
        let post_data = { 
            name: this.state.name,
        };
        var nameV = /^[ ]+$/
        if(this.state.name===''){
            this.setState({
                callbackResultName: "error",
                callbackTextName: "Please input your user name"
            })
        }
        else if(!nameV.test(this.state.name)){
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
                        //register username judge
                            if(dataBack.status==="failure"){
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
        }else{
            this.setState({
                callbackResultName: "error",
                callbackTextName: "The first letter can't accept whitespace.",
            }) 
        }
    }

    //judge confirm password
    
    handleChangePassword(e){
        this.setState({
            password: e.target.value
        })
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Not the same passowrd!');
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
                //post register user info
                fetch(url,{
                    method:'POST',
                    body: JSON.stringify(post_data),
                    headers: new Headers({
                    'Content-Type': 'application/json'
                    })
                }).then(res=>res.text().then(
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
        var datapass={name: this.state.name,email: this.state.email,id:'',status: true}
        var path={
            pathname: '/',
            query: datapass,
        };
        if(this.state.returnHome){
            return ( <Redirect to= {path}/> )    
        }else if(this.state.isRegister){
            return(
                    <div id='successRegister'>
                        <Drawer
                            title="Register"
                            width={460}
                            // onClose={this.onClose}
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
            return(
                <div id='register'>
                    <Drawer
                        title="Register"
                        width={460}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    
                    <Form onSubmit={this.handleSubmit} className="register-form" {...formItemLayout}>
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
                                { required: true,message: 'Please input your E-mail！'},
                                // {validator: this.vertifiedEmail}],
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
                                { required: true, message: 'Please input your name!'},
                                // { min: 3, message: 'The minimum letter is 3!'},
                                // { whitespace: true, message:'Cannot accept whitespace at first letter. '},
                                // { validator: this.compareToUserName}],
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
                                { required: true, message:'You need to setting password'}, 
                                {min: 6, message: 'Minimum 6 letter' },
                            {validator: this.validateToNextPassword}],
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
                            rules: [{required: true},{min:6,message:'Minimum 6 Letters！'},
                            {
                                validator: this.compareToFirstPassword,
                            }
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>) }
                        </Form.Item>
                        
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