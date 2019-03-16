import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { searchReducer, SearchAction } from '../modules/search';
import { aboutReducer, AboutAction } from '../modules/about';

export const reducers = combineReducers({
  search: searchReducer,
  about: aboutReducer
});

export type RootState = StateType<typeof reducers>;

export type RootActions = SearchAction | AboutAction;
