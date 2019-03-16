import { createStore } from 'react-hooks-global-state';
import { applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { reducers } from "./reducers";
// @ts-ignore no typescript declaration for this yet
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';

let enhancers = compose(
    applyMiddleware(reduxThunk, reduxLogger),
    reduxDevToolsExt(),
);

// @ts-ignore combine reducers typescript def doesnt support not passing in state and action
const initialState = reducers();

export const { GlobalStateProvider, dispatch, useGlobalState } =
    createStore(reducers, initialState, enhancers);
