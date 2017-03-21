export const type = {
  INCREMENT_WORK: "INCREMENT_WORK",
  DECREMENT_WORK: "DECREMENT_WORK",
  INCREMENT_REST: "INCREMENT_REST",
  DECREMENT_REST: "DECREMENT_REST",
  PAUSE: "PAUSE",
  PLAY: "PLAY",
  CLEAR: "CLEAR",
  SWITCH_SESSION: "SWITCH_SESSION",
  DECREMENT_SESSION_TIME: "DECREMENT_SESSION_TIME",
  SET_TIMER_HANDLER: "SET_TIMER_HANDLER",
  PLAY_AUDiO: "PLAY_AUDIO",
  PAUSE_AUDIO: "PAUSE_AUDIO",
  STOP_AUDIO: "STOP_AUDIO"
};

export const create = {
  incrementWork: () => ({ type: type.INCREMENT_WORK }),
  decrementWork: () => ({ type: type.DECREMENT_WORK }),
  incrementRest: () => ({ type: type.INCREMENT_REST }),
  decrementRest: () => ({ type: type.DECREMENT_REST }),
  pause: () => ({ type: type.PAUSE }),
  play: () => ({ type: type.PLAY }),
  clear: () => ({ type: type.CLEAR }),
  switchSession: (session) => ({ type: type.SWITCH_SESSION, session }),
  decrementSessionTime: () => ({ type: type.DECREMENT_SESSION_TIME }),
  setTimerHandler: (handler) => ({ type: type.SET_TIMER_HANDLER, handler }),
  playAudio: (audio, name, time) => ({ type: type.PLAY_AUDiO, name, time, audio }),
  pauseAudio: (audio, name) => ({ type: type.PAUSE_AUDIO, name, audio }),
  stopAudio: (audio, name) => ({ type: type.STOP_AUDIO, name, audio})
};