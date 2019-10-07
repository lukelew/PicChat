import React from "react";
import { Icon, message } from 'antd';
import './index.scss';
import UploadImage from "./uploadImage";

interface IAddTopicProps {
  loginUser: any
}

interface IAddTopicState {
    visible: boolean;
}


class AddTopic extends React.PureComponent<IAddTopicProps, IAddTopicState> {
    upload_props: any;

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
          }
        }

    showModal = () => {
      if(this.props.loginUser === ''){
        message.error('You need to login to post');
      }
      else{
        this.setState({
          visible: true
        });
      }
        
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