import { type } from './actions';


export const reducer = (state = {}, action) => {
  switch (action.type) {
    case type.INCREMENT_WORK: {
      const workTime = state.workTime >= 60 ? 60 : state.workTime + 1;
      const countDown = state.session === 'work' ? workTime * 60 : state.countDown;
      return { ...state, workTime, countDown };
    }
    case type.DECREMENT_WORK: {
      const workTime = state.workTime <= 1 ? 1 : state.workTime - 1;
      const countDown = state.session === 'work' ? workTime * 60 : state.countDown;
      return { ...state, workTime, countDown };
    }
    case type.INCREMENT_REST: {
      const restTime = state.restTime > 60 ? 1 : state.restTime + 1;
      const countDown = state.session === 'rest' ? restTime * 60 : state.countDown;
      return { ...state, restTime, countDown };
    }
    case type.DECREMENT_REST: {
      const restTime = state.restTime <= 1 ? 1 : state.restTime - 1;
      const countDown = state.session === 'rest' ? restTime * 60 : state.countDown;
      return { ...state, restTime, countDown };
    }
    case type.PAUSE: {
      clearInterval(state.timerHandler);
      return { ...state, isPausing: true, timerHandler: null };
    }
    case type.PLAY: {
      return { ...state, isPausing: false };
    }
    case type.CLEAR: {
      return { ...state, countDown: state.workTime * 60, isPausing: true, session: 'work' };
    }
    case type.SWITCH_SESSION: {
      if (action.session === state.session) return state;
      const isWorking = state.session === 'work';
      const countDown = isWorking ? state.restTime * 60 : state.workTime * 60;
      const session = isWorking ? "rest" : "work";
      
      return { ...state, session, countDown, audioIsPlaying: false };
    }

    case type.DECREMENT_SESSION_TIME: {
      return { ...state, countDown: state.countDown - 1 };
    }

    case type.SET_TIMER_HANDLER: {
      if (action.handler === undefined) {
        clearInterval(state.timerHandler);
      }

      return { ...state, timerHandler: action.handler };
    }

    case type.PLAY_AUDiO: {
      action.audio.play(action.name, action.time || 0);
      return { ...state, audioIsPlaying: true };
    }

    case type.PAUSE_AUDIO: {
      const time = action.audio.stop(action.name);
      return {
        ...state,
        audioIsPlaying: false,
        audioPausedAt: { ...state.audioPausedAt, [action.name]: time }
      };
    }

    case type.STOP_AUDIO: {
      const time = 0;
      action.audio.stop(action[name]);

      return {
        ...state,
        audioIsPlaying: false,
        audioPausedAt: { ...state.audioPausedAt, [action.name]: time }
      };
    }

    default: return state;
  }
};