import React from "react";
import { Button } from 'antd';
import UploadBox from './uploadbox';
import './index.scss';

class AddTopic extends React.Component {
    render(){
        return(
            <div id="add_topic">
                <Button type="primary" shape="circle" icon="upload" >Add</Button>
                <UploadBox/>
            </div>
        )
    }
}

export default AddTopic;