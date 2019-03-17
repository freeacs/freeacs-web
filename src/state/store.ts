import { createStore } from 'react-hooks-global-state';
// import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { reducers } from './reducers';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';

let enhancers = compose(
  applyMiddleware(reduxThunk, reduxLogger),
  reduxDevToolsExt()
);

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  reducers,
  undefined as any,
  enhancers
);
// } = (createStore as CreateReduxLikeStore)(reducers, undefined, enhancers);
