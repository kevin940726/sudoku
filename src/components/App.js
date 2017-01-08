import React, { Component } from 'react';
import './App.css';
import ControlBar from '../containers/ControlBar';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlBar />
        <Board />
      </div>
    );
  }
}

export default App;
