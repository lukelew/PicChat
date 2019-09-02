import React from 'react';
import ReactDOM from 'react-dom';
import ListUpload from './listUpload/listUpload'
import LeaderBoard from './leaderBoard/leaderBoard'


import 'antd/dist/antd.css';
import './list.scss';
import { Upload, Button, Icon,Divider} from 'antd';


class List extends React.Component{


    render(){
        return(
            <div id="discuss_broad">
                <div id="list">
                  <ListUpload></ListUpload>
                 </div>
                 {/* <Divider /> */}
                 <div id="leaderBoard">
                    <LeaderBoard></LeaderBoard>
                 </div>
            </div>
        );
    }
}
export default List;