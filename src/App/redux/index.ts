import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';
import { SearchAction, searchReducer } from '../screens/Search/redux';
import { AboutAction, aboutReducer } from '../screens/About/redux';
import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

const reducerMap = {
  search: searchReducer,
  about: aboutReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions = SearchAction | AboutAction | { type: undefined };

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
