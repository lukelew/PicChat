import React from 'react';
import Header from './header';
import List from './body/list'
import './App.scss';
import {Route, BrowserRouter, Router}from 'react-router-dom';
import Login from './header/login';
// import {Router,Route} from 'react-router'


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="App" id='App'>
      <Header></Header>
      <List></List>
      {/* <Route path="/" component={Header}> */}
      {/* </Route> */}
    </div>
    </BrowserRouter>
  );
}

 export default App;
