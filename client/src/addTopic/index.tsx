import React from "react";
import { Button } from 'antd';
import UploadBox from './uploadbox';
import Popup from "reactjs-popup";
import './index.scss';

class AddTopic extends React.Component {
    uploadFile = () => {}

    render(){
        return(
            <div id="add_topic">
                <Popup trigger={<button>Add</button>} modal closeOnDocumentClick>
                    {close => (                    
                    <div className="modal_window">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Upload new image </div>
                        <button
                            className="button_upl"
                            onClick={() => { this.uploadFile(); }}
                        >
                            Upload image
                        </button>
                    </div>)}
            </Popup>
            </div>)
    }
}

export default AddTopic;