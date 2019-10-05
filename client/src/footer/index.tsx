import React from 'react';
import { Icon } from 'antd';
import './index.scss';

class Footer extends React.Component {
    render() {
        return(
            <footer>
                <div className="footer-logo">
                    <img src="/images/logo-footer.png" />
                </div>
                <div className="copyright">
                    <p>Made with <Icon type="heart" theme="filled" style={{color: '#eb2f96'}}/> at UTS</p>
                </div>
            </footer>
        ) 
    }
}

export default Footer;