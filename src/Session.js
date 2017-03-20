import React, { Component } from 'react';
import reset from './reset.svg';

class Session extends Component {
  render() {
    return (
      <div className="Session">
        <svg className="progress" width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" />
        </svg>
        <div className="status">Work harder</div>
        <div className="timer">20:34</div>
        <img className="reset" src={reset} alt="reset button" width="30" height="30" title='reset'/>
      </div>
    );
  }
}

export default Session;