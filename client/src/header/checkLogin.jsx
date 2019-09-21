import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { Redirect } from 'react-router';


class Check_Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            verify: false,
            isRegister: false
        };
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+ '/user/email')
    }
    backHome(e){
        return <Redirect path="/"/>
    }
    render() {
        return (
            <Result
            status="success"
            title="Successfully Register!"
            subTitle="Please verify your email, we already send verification on your email"
            extra={[
                <Button key="console" onClick={this.backHome}>
                    Back Home
                </Button>,
                <Button type="primary" key="buy">
                    Already Comfirmed
                </Button>,
            ]}
          />
        );
    }
}

export default Check_Login;