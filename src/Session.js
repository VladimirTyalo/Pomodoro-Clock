import React, { Component } from 'react';
import { connect } from 'react-redux';

import reset from './Images/reset.svg';
import { create } from './actions';

import * as audio from './audio';


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
    let classList;
    if (this.props.isPausing) {
      classList = 'progress progress--pause';
    } else if (this.props.session === 'work') {
      classList = 'progress progress--play';
    } else {
      classList = "progress progress--play progress--break";
    }
    classList = (this.props.countDown < 60)
      ? `${classList} progress--last-minute`
      : classList;

    return classList;
  }

  circleStyles() {
    const radius = this.props.radius;
    const dash = radius * 2 * Math.PI;
    const degPassed = offsetInDeg.call(this);
    const offset = - degToRadians(degPassed, radius);

    return {
      strokeDasharray: `${dash}px`,
      strokeDashoffset: `${offset}px`,
    };

    function degToRadians(deg, r) {
      return r * deg * 2 * Math.PI / 360;
    }

    function offsetInDeg() {
      const {session, countDown, workTime, restTime} = this.props;
      let angle;
      // find percentage of elapsed time and normalize it to degrees 
      if (session === 'work') {
        angle = (countDown / (workTime * 60)) * 360;
      } else {
        angle = (countDown / (restTime * 60)) * 360;
      }
      // find 'time' (angle) that already passed 
      return 360 - angle;
    }
  }

  componentDidUpdate(prevProps, prevState) {
   if(!prevProps.audioIsPlaying && prevProps.countDown <= 12) {
     const time = this.props.audioPausedAt.countdown;
      this.props.playAudio(audio, 'countdown', time);
    }
  }
  

  render() {
    return (
      <div className="Session">
        <svg className={this.getClassName()}
          ref='circle'
          width="300"
          height="300"
          viewBox={`0 0 ${this.props.radius * 2} ${this.props.radius * 2}`}
          xmlns="http://www.w3.org/2000/svg"
          onClick={this.handleClick.bind(this)}
          style={this.circleStyles()}
        >
          <circle cx={this.props.radius} cy={this.props.radius} r={this.props.radius} />
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
  workTime: state.workTime,
  restTime: state.restTime,
  audioIsPlaying: state.audioIsPlaying,
  audioPausedAt: state.audioPausedAt,
  radius: 360,
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
  reset: () => Promise.all([
    dispatch(create.clear()),
    dispatch(create.pause())
    ])
    .then(() => dispatch(create.setTimerHandler(null))),

  play: () => Promise.all([
    dispatch(create.play()),
    decrementSync(dispatch)
  ]).then(([res1, res2]) => {
    dispatch(create.setTimerHandler(res2));
  }),

  pause: () => Promise.all([
    dispatch(create.pause()),
    dispatch(create.pauseAudio(audio, 'countdown'))
  ]),

  playAudio: (audio, name, time) => Promise.all([
    dispatch(create.playAudio(audio, name, time))
  ])
});



export default connect(mapStateToProps, mapDispatchToProps)(Session);