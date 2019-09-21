import React from "react";
import {Modal, Upload, message, Button, Icon} from 'antd';
import './index.scss';

const props = {
    name: 'image',
    action: 'http://localhost:8080/images/upload',
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`File uploaded successfully!`);
      } else if (info.file.status == 'error') {
        message.error(`The image contains text/unappropriate content and can't be uploaded.`);
      }
    },
  };

interface IAddTopicState {
    visible: boolean;
}

class AddTopic extends React.PureComponent<{}, IAddTopicState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
  
      handleOk = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
  
      handleCancel = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      uploadImage = () => {}
  
      render() {
        return (
          <div className="add_topic">
            <Button type="primary" onClick={this.showModal}>
              Add new topic
            </Button>
            <Modal
              title="Upload new picture to start new topic"
              visible={this.state.visible}
              okText="Create new topic"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
                <div className="image_upload">
                <Upload {...props}>
                    <Button>
                    <Icon type="upload" /> Click to upload image
                    </Button>
                </Upload>
                </div>                
            </Modal>
          </div>
        );
      }
}

export default AddTopic;