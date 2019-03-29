import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';
import { SearchAction, searchReducer } from '../screens/Search/state';
import { AboutAction, aboutReducer } from '../screens/About/state';
import { AuthAction, authReducer } from '../shared/auth/state';
import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

const reducerMap = {
  search: searchReducer,
  about: aboutReducer,
  auth: authReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions =
  | SearchAction
  | AboutAction
  | AuthAction
  | { type: undefined };

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
