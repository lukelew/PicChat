import React from "react";
import {Modal, Upload, message, Button, Icon} from 'antd';
import './index.scss';

interface IUploadImageState {
    visible: boolean;
    img_url: string;
    fileList: any[];
    topicId?: String;
}

interface IUploadImageProps {
    showModal: boolean,
    hideModal: Function,
    boxHeader: String,
    topicId?: String
}

class UploadImage extends React.Component<IUploadImageProps, IUploadImageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            img_url: "",
            fileList:[],
            topicId: this.props.topicId
          }
        }

        onImageUpload(info: any) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            this.setState({
              fileList: [...fileList]
            });
      
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
              let url;
              let post_data;

              if (this.state.topicId)
              {
                url = process.env.REACT_APP_API_URL +'/topics/reply';
                post_data = {picUrl: this.state.img_url, replyTo: this.state.topicId};
              }
              else
              {
                url = process.env.REACT_APP_API_URL +'/topics';
                post_data = {picUrl: this.state.img_url};
              }

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
                fileList:[]
              });

              this.props.hideModal();
      
              //TODO: change this refresh with the component update
              window.location.reload();
            };
        
            handleCancel = () => {            
              this.props.hideModal();
  
              this.setState({
                fileList: [],
                visible: false
              });
            };

    render() {
        console.log("pic_id " + this.props.topicId);
        return (
            <div className="modal_window">
            <Modal
              title={this.props.boxHeader}
              visible={this.state.visible}
              okText="Upload"
              onOk={() => {this.postTopic()}}
              onCancel={this.handleCancel}
            >
                <div className="image_upload">
                <Upload name="image"
                        action={process.env.REACT_APP_API_URL + '/images/upload'}                      
                        onChange={(info) => {this.onImageUpload(info);}}
                        fileList={this.state.fileList}
                        >
                    <Button>
                    <Icon type="upload" /> Click to upload image
                    </Button>
                </Upload>
                </div>                
            </Modal> 
            </div>
        );
    }

    componentDidUpdate(prevProps: IUploadImageProps) {
        if (prevProps.showModal != this.props.showModal)
        {
            this.setState({
                visible: this.props.showModal
            });
        }    
        
        if (prevProps.topicId != this.props.topicId)
        {
          this.setState({
            topicId: this.props.topicId
          });
        }
    }
}

export default UploadImage;



