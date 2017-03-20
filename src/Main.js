import React, { Component } from 'react';

import Controls from './Controls';
import Session from './Session';

class Main extends Component {
  render() {
    return (
      <div className="Main">
          <Controls />
          <Session />
      </div>
    );
  }
}

export default Main;