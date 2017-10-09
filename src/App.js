import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Icon type={logo} />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro" style={{fontSize:"32px"}}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
