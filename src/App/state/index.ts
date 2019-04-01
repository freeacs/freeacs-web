import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';
import { ContextAction, contextReducer } from '../shared/context/state';
import { AuthAction, authReducer } from '../shared/auth/state';
import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

const reducerMap = {
  auth: authReducer,
  context: contextReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions = AuthAction | ContextAction | { type: undefined };

const reducer = combineReducers<RootState, RootActions>(reducerMap);

export const {
  GlobalStateProvider,
  dispatch,
  useGlobalState
} = (createStore as CreateReduxLikeStore)<RootState, RootActions>(
  reducer,
  undefined,
  reduxDevToolsExt()
);
