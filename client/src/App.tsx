import React from 'react';
import Header from './header';
import TopicList from './topicList';
import TopicDetail from './topicDetail';
import './App.scss';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';
import Login from './header/login';
// import {Router,Route} from 'react-router'


const App: React.FC = () => {
  return (
    <Router>
      <div className="App" id='App'>
        <Header></Header>
        <Route path="/" exact component={TopicList}/>
        <Route path="/topics_detail/:id" component={TopicDetail}/>
      </div>
    </Router>
  );
}

 export default App;
