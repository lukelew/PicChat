import React from "react";
import { Icon } from 'antd';
import './index.scss';
import UploadImage from "./uploadImage";

interface IAddTopicState {
    visible: boolean;
}

class AddTopic extends React.PureComponent<{}, IAddTopicState> {
    upload_props: any;

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
          }
        }

    showModal = () => {
        this.setState({
          visible: true
        });
      };  

      handleCancel = () => {
        this.setState({
          visible: false
        });
      };
  
      render() {
        return (
          <div id="add_topic">
              <div id="add_button" onClick={ this.showModal }>
                <Icon type="plus"/>
              </div>
            <UploadImage 
              showModal={ this.state.visible } 
              hideModal={ this.handleCancel } 
              boxHeader="Upload new picture to start new topic"/>
          </div>
        );
      }
}

export default AddTopic;