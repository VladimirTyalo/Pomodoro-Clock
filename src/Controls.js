import React, { Component } from 'react';
import { connect } from 'react-redux';

import { create } from './actions';

class Controls extends Component {


  render() {
    return (
      <div className="Controls">
        <div className="control">
          <div className="control-title">Break Time</div>
          <span className="control-decrement" onClick={this.props.decrementRest}>-</span>
          <span className="initial-time">{this.props.restTime}</span>
          <span className="control-increment" onClick={this.props.incrementRest}>+</span>
        </div>
        <div className="control">
          <div className="control-title">Work Time</div>
          <span className="control-decrement" onClick={this.props.decrementWork}>-</span>
          <span className="initial-time">{this.props.workTime}</span>
          <span className="control-increment" onClick={this.props.incrementWork}>+</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workTime: state.workTime,
  restTime: state.restTime
});

const mapDispatchToProps = dispatch => ({
  incrementWork: () => dispatch(create.incrementWork()),
  incrementRest: () => dispatch(create.incrementRest()),
  decrementWork: () => dispatch(create.decrementWork()),
  decrementRest: () => dispatch(create.decrementRest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);