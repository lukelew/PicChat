import React from 'react';
import { message, Button} from 'antd';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            isLogout: false,
            login_username: '',
            email:'',
        };
    }
    //request logout
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
                    message.success('Logout success');
                    window.location.reload();
                }
            )
    };

    //logout page
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
    

