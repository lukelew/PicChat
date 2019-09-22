import React from "react";
import {Modal, Upload, message, Button, Icon} from 'antd';
import './index.scss';

interface IAddTopicState {
    visible: boolean;
    img_url: string;
}

class AddTopic extends React.PureComponent<{}, IAddTopicState> {
    upload_props: any;

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            img_url: ""
          }
        }

    onImageUpload(info: any) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        this.setState({
          img_url: info.file.response
        });
        message.success(`File uploaded successfully!`);
      } else if (info.file.status == 'error') {
        message.error(`The image contains text/unappropriate content and can't be uploaded.`);
      }
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
  
      postTopic = () => {
        let url = process.env.REACT_APP_API_URL +'/topics';
        let post_data = {picUrl: this.state.img_url};
        console.log("post topic with url: " + this.state.img_url);

        fetch(url,{
          method:'POST',
          body: JSON.stringify(post_data),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      }).then(res=>res.json()).then(
          data=>{
            console.log(data);
          }
      )

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
              onOk={() => {this.postTopic()}}
              onCancel={this.handleCancel}
            >
                <div className="image_upload">
                <Upload name="image"
                        action={process.env.REACT_APP_API_URL + '/images/upload'}
                        onChange={(info) => {this.onImageUpload(info);}}>
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