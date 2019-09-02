import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './listUpload.scss';
import { Upload, Button, Icon } from 'antd';

class ListUpload extends React.Component{
// const props = {
//     action: '',
//     listType: 'picture',
//     previewFile(file) {
//       console.log('Your upload file:', file);
//       // Your process logic. Here we just mock to the same file
//       return fetch('', {
//         method: 'POST',
//         body: file,
//       })
//         .then(res => res.json())
//         .then(({ thumbnail }) => thumbnail);
//     },
//   };

//check the commmont in antd

  render(){
    return(
        <div id='listUpload'>
         <div>
            {/* <Upload {...props}> */}
            <Upload>
             <Button>
                 <Icon type="upload" />Upload
             </Button>
             </Upload>
            </div>
        <br />
        </div>
    );  
  }
}
export default ListUpload;