import React, { Component } from 'react';
import { connect } from 'react-redux';

import reset from './reset.svg';
import { create } from './actions';


class Session extends Component {
  statusMessage() {
    if (this.props.isPausing) return "Pause";

    if (this.props.session === 'work') {
      return "Focus on work";
    } else {
      return "Take a break";
    }
  }

  secondsToString() {
    const seconds = this.props.countDown;
    const min = seconds / 60 | 0;
    const sec = seconds % 60;

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  handleClick(ev) {
    ev.preventDefault();
    if (this.props.isPausing) {
      this.props.play();
    } else {
      this.props.pause();
    }
  }

  getClassName() {
    if (this.props.isPausing) {
      return 'progress progress--pause';
    } else if (this.props.session === 'work') {
      return 'progress progress--play';
    } else {
      return "progress progress--play progress--break";
    }
  }

  render() {
    return (
      <div className="Session">
        <svg className={this.getClassName()}
          width="300"
          height="300"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          onClick={this.handleClick.bind(this)}
        >
          <circle cx="100" cy="100" r="100" />
        </svg>
        <div className="status">{this.statusMessage()}</div>
        <div className="timer">{this.secondsToString()}</div>
        <img className="reset"
          src={reset}
          alt="reset button"
          width="30"
          height="30"
          title='reset'
          onClick={this.props.reset}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  countDown: state.countDown,
  isPausing: state.isPausing,
});

const decrementSync = (dispatch) => {
  return new Promise((res, rej) => {
    const handler = setInterval(() => {
      dispatch(create.decrementSessionTime());
    }, 1000);
    res(handler);
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => Promise.resolve(dispatch(create.clear()))
    .then(() => dispatch(create.setTimerHandler(null))),

  play: () => Promise.all([
    dispatch(create.play()),
    decrementSync(dispatch)
  ]).then(([res1, res2]) => {
    dispatch(create.setTimerHandler(res2));
  }),

  pause: () => Promise.all([
    dispatch(create.pause()),

  ])
});



export default connect(mapStateToProps, mapDispatchToProps)(Session);