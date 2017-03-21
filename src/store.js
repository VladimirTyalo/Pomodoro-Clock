import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducer';
import { initialState } from './initialState';
import { create } from './actions';

const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
);

const store = createStore(reducer, initialState, enhancer);

// to switch between work and rest sessions automatically
// we need current state and a dispatch method in one place
store.subscribe(() => {
    const state = store.getState();

    if (state.countDown <= 0) {
        store.dispatch(create.switchSession());
    }
});



store.dispatch(create.clear());

export default store;