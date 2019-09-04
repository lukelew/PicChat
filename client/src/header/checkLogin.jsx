import {Component} from 'react';
import {withRouter} from 'react-router-dom'

@withRouter
class Check_Login extends Component {
    componentDidMount() {

        // change axios to fetch

        // axios.get('http://localhost:3000/users/login')
        //     .then(res => {
        //         if(res.status === 200) {
        //             if(res.data.code === 0) {

        //             }else {
        //                 this.props.history.push('/login')
        //             }
        //         }
        //     })
    }
    render() {
        return null;
    }
}

export default Check_Login;