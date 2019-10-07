import React from "react";
import {Modal, Upload, message, Button, Icon} from 'antd';
import './index.scss';

interface IUploadImageState {
    visible: boolean;
    img_url_original: string;
    img_url_small: string;
    fileList: any[];
    topicId?: String;
    uploadButtonDisabled: boolean;
}

interface IUploadImageProps {
    showModal: boolean,
    hideModal: Function,
    boxHeader: String,
    topicId?: String,
    update?: boolean
}

class UploadImage extends React.Component<IUploadImageProps, IUploadImageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            img_url_original: '',
            img_url_small: '',
            fileList:[],
            topicId: this.props.topicId,
            uploadButtonDisabled: true
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
                img_url_original: info.file.response[0],
                img_url_small: info.file.response[1]
              });
              message.success(`File uploaded successfully!`);
              this.enableUploadButton();
            } else if (info.file.status == 'error') {
              message.error(`The image contains text/unappropriate content and can't be uploaded.`);
            }
          };
      
          showModal = () => {
              this.setState({
                visible: true,
              });
            };

          disableUploadButton = () => {
            var elemet = document.getElementsByClassName('ant-btn ant-btn-primary')[0];
            elemet.setAttribute('disabled', 'true');              
          };

          enableUploadButton = () => {
            var elemet = document.getElementsByClassName('ant-btn ant-btn-primary')[0];
            elemet.removeAttribute('disabled');
          };
        
          postTopic = () => {
              let url = '';
              let post_data;

              if (this.state.topicId)
              {
                if (this.props.update == true)
                {
                  url = process.env.REACT_APP_API_URL +'/topics';
                  post_data = {
                    originalPicUrl: this.state.img_url_original,
                    smallPicUrl: this.state.img_url_small, 
                    topic_id: this.state.topicId};
                }
                else
                {
                  url = process.env.REACT_APP_API_URL +'/topics/reply';
                  post_data = {
                    originalPicUrl: this.state.img_url_original, 
                    replyTo: this.state.topicId};
                }
              }
              else
              {
                url = process.env.REACT_APP_API_URL +'/topics';
                post_data = {
                  originalPicUrl: this.state.img_url_original, 
                  smallPicUrl: this.state.img_url_small,
                };
              }

              console.log(post_data);

              if (this.props.update == true) {
                fetch(url, {
                  method:'PUT',
                  body: JSON.stringify(post_data),
                  headers: new Headers({
                      'Content-Type': 'application/json'
                    })
                  }).then(res=>res.json()).then(
                      data=>{
                    console.log(data);
                  }
                )
              } else {
                fetch(url, {
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
              }

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
            }, () => {
              setTimeout(() => this.disableUploadButton(), 100);
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



