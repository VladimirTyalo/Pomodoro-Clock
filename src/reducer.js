import { type } from './actions';


export const reducer = (state = {}, action) => {
  switch (action.type) {
    case type.INCREMENT_WORK: {
      const workTime = state.workTime >= 60 ? 60 : state.workTime + 1;
      return { ...state, workTime };
    }
    case type.DECREMENT_WORK: {
      const workTime = state.workTime <= 1 ? 1 : state.workTime - 1;
      return { ...state, workTime };
    }
    case type.INCREMENT_REST: {
      return { ...state, restTime: state.restTime + 1 };
    }
    case type.DECREMENT_REST: {
      const restTime = state.restTime <= 1 ? 1 : state.restTime - 1;
      return { ...state, restTime };
    }
    case type.PAUSE: {
      return { ...state, isPausing: true };
    }
    case type.PLAY: {
      return { ...state, isPausing: false };
    }
    case type.CLEAR: {
      return { ...state, countDown: state.workTime, isPausing: true };
    }
    case type.SWITCH_SESSION: {
      if (action.session === state.session) return state;
      const isWorking = state.session === 'work';
      const countDown = isWorking ? state.restTime : state.workTime;
      const session = isWorking ? "rest" : "work";

      return { ...state, session, countDown };
    }
    default: return state;
  }
};