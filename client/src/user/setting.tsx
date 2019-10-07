import React from 'react';
import Card from '../topicList/card';
import { Empty } from 'antd';
import './index.scss';

interface MySettingProps {
    user: any
}

interface MySettingState {
}

class MySetting extends React.Component<MySettingProps, MySettingState> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <React.Fragment>
                <h2>My Setting</h2>
                <div id="user_setting">
                </div>
            </React.Fragment>
        )
    }
}

export default MySetting;