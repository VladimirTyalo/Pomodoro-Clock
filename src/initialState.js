export const  initialState = {
  restTime: 5,
  workTime: 25,
  isPausing: true,
  session: "work", // "rest"
  countDown: 0,
  timerHandler: null,
  audioIsPlaying: false,
  audioPausedAt: { 'countdown': 0}
 };
