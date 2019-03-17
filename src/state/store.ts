import { createStore } from 'react-hooks-global-state';
// import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import { reducers, RootActions, RootState } from './reducers';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';

let enhancers = compose(
  applyMiddleware(reduxLogger),
  reduxDevToolsExt()
);

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore<
  RootState,
  RootActions
>(reducers, undefined as any, enhancers);
// } = (createStore as CreateReduxLikeStore)(reducers, undefined, enhancers);
