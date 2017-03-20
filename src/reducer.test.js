import { initialState } from './initialState';
import { type, create } from './actions';
import { reducer } from './reducer';


describe('#reducer', () => {
  let state;
  beforeEach(() => {
    state = JSON.parse(JSON.stringify(initialState));
  });

  it('should exist', () => {
    expect(initialState).toBeDefined();
    expect(type).toBeDefined();
    expect(create).toBeDefined();
    expect(reducer).toBeDefined();
  });


  it('should increment working time', () => {
    const expected = { ...state, workTime: state.workTime + 1 };
    const actual = reducer(state, create.incrementWork());

    expect(actual).toEqual(expected);
  });

  it('should increment working time no more then 60 min', () => {
     const maxState = {...state, workTime: 60};
     let expected = {...state, workTime: 60};
     const actual = reducer(maxState, create.incrementWork());

     expect(actual).toEqual(expected);
});

  it('should decrement working time', () => {
    const expected = { ...state, workTime: state.workTime - 1 };
    const actual = reducer(state, create.decrementWork());

    expect(actual).toEqual(expected);
  });

  it('should decrement working time no less then 1', () => {
   const minState = {...state, workTime: 1}; 
   const expected = {...state, workTime: 1};
   const actual = reducer(minState, create.decrementWork());

   expect(expected).toEqual(actual);
  });

  it('should increment resting time', () => {
    const expected = { ...state, restTime: state.restTime + 1 };
    const actual = reducer(state, create.incrementRest());

    expect(actual).toEqual(expected);
  });


  it('should decrement resting time', () => {
    const expected = { ...state, restTime: state.restTime - 1 };
    const actual = reducer(state, create.decrementRest());

    expect(actual).toEqual(expected);
  });

  it('should decrement resting time no less then 1', () => {
    const minState = {...state, restTime: 1};
    const expected = {...minState};
    const actual = reducer(minState, create.decrementRest());

    expect(actual).toEqual(expected);
  });

  it('should pause session', () => {
    const expected = {...state, isPausing: true};
    const actual = reducer(state, create.pause());

    expect(actual).toEqual(expected);
  });

  it('should change resume current session', () => {
    const expected = {...state, isPausing: false};
    const actual = reducer(state, create.play());

    expect(actual).toEqual(expected);
  });

  it('should reset current session to default and stop playing', () => {
    const expected = {...state, countDown: state.workTime * 60, isPausing: true};
    const actual = reducer(state, create.clear());

    expect(actual).toEqual(expected);
  });

  it('should toggle sessions on SWITCH_SESSION actions', () => {
     const isWorking = state.session == 'work';
     const countDown = isWorking? state.restTime * 60 : state.workTime  * 60;
     const expected = {...state, session: isWorking? "rest": "work", countDown };
     const actual = reducer(state, create.switchSession("rest"));

     expect(actual).toEqual(expected);
  });



});