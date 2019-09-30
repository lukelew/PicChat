import React from 'react';
import './index.scss';

class Footer extends React.Component {
    render() {
        return(
            <footer>
                <div className="footer-logo">
                    <img src="/images/logo-footer.png" />
                </div>
                <ul>
                    <li><a>How to use</a></li>
                    <li><a>About us</a></li>
                </ul>
            </footer>
        ) 
    }
}

export default Footer;