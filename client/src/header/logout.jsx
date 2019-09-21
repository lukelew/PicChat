import React from 'react';
import 'antd/dist/antd.css';
import { message, Button} from 'antd';
import { Redirect } from 'react-router';
import './logout.scss';


class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            isLogout: false,
            login_username: '',
            email:'',
        };
    }


    logout=()=>{
        let url = process.env.REACT_APP_API_URL + '/users/logout';
        fetch(url,{
            method:'Get',
            }).then(res=>res.json()).then(
                data=>{
                    console.log(data);
                    this.setState({
                        isLogout: true,
                    })
                    message.success('Login success');
                    window.location.reload();
                    console.log('logout success',this.state.isLogout)
                }
            )
    };
    render(){
        if(this.state.isLogout)
        {   
            var path={pathname:'/'};
            return <Redirect to= {path}/>
        }
        else{
            return(
                <React.Fragment>
                    <Button id="logout_button" onClick={this.logout} type="link" icon="logout">Logout</Button>
                </React.Fragment>
            );
        }

    }
}
export default Logout;
    

