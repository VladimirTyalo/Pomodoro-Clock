import React, { Component } from 'react';
import react from './Images/react.svg';
import redux from './Images/redux.svg';
import jest from './Images/jest.svg';

import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="header">Pomodoro Clock</h2>
          <img src={react} className="icon icon-react" alt="react icon" width="50" height="50" title="react"/>
          <img src={redux} className="icon icon-redux" alt="redux icon" width="50" height="50" title="redux"/>
          <img src={jest} className="icon icon-jest" alt="jest icon" width="50" height="50" title="jest"/>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
