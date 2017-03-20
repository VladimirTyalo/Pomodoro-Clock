export const type = {
  INCREMENT_WORK: "INCREMENT_WORK",
  DECREMENT_WORK: "DECREMENT_WORK",
  INCREMENT_REST: "INCREMENT_REST",
  DECREMENT_REST: "DECREMENT_REST",
  PAUSE: "PAUSE",
  PLAY: "PLAY",
  CLEAR: "CLEAR",
  SWITCH_SESSION: "SWITCH_SESSION"
};

export const create = {
  incrementWork: () => ({ type: type.INCREMENT_WORK }),
  decrementWork: () => ({ type: type.DECREMENT_WORK }),
  incrementRest: () => ({ type: type.INCREMENT_REST }),
  decrementRest: () => ({ type: type.DECREMENT_REST }),
  pause: () => ({ type: type.PAUSE }),
  play: () => ({ type: type.PLAY }),
  clear: () => ({ type: type.CLEAR }),
  switchSession: (session) => ({type: type.SWITCH_SESSION, session})
};