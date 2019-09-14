import React from 'react';
import 'antd/dist/antd.css';
import { Popconfirm } from 'antd';
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
        let url='http://localhost:3000/users/logout';
        fetch(url,{
            method:'Get',
            }).then(res=>res.json()).then(
                data=>{
                    console.log(data);
                    this.setState({
                        isLogout: true,
                    })
                    console.log(this.state.isLogout)
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
                <div >
                    <Popconfirm title="Are you sure to logout？" okText="Yes" cancelText="No" onConfirm={this.logout} placement="bottomRight">
                        {/* <a href="http://localhost:3000/" id="logout_button">Logout</a> */}
                        {/* <a href="###" id="logout_button">Logout</a>  */}
                        <p id="logout_button">Logout</p>
                    </Popconfirm>
                </div>
            );
        }

    }
}
export default Logout;
    

