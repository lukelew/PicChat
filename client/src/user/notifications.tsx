import React from 'react';
import './index.scss';

interface NotificationState {
    notification: Array<any>
}

class Notification extends React.Component<{}, NotificationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            notification: []
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <h2>Notifications</h2>
                <div id="notifications">notifications</div> 
            </React.Fragment>
        )
    }
}

export default Notification;