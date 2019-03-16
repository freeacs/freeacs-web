import { createStore } from 'react-hooks-global-state';
import { applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { reducers } from "./reducers";

let enhancers;
if (process.env.NODE_ENV !== 'test') {
    const { reduxDevToolsExt } = require('react-hooks-global-state/src/devtools');
    enhancers = compose(
        applyMiddleware(reduxThunk, reduxLogger),
        reduxDevToolsExt(),
    );
} else {
    enhancers = compose(
        applyMiddleware(reduxThunk)
    );
}

const initialState = reducers(undefined, { type: undefined });

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
    reducers,
    initialState,
    enhancers
);
