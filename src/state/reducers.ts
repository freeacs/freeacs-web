import { StateType } from 'typesafe-actions';
import { searchReducer, SearchAction } from '../modules/search';
import { aboutReducer, AboutAction } from '../modules/about';
import { combineReducers } from 'redux';

const reducerMap = {
  search: searchReducer,
  about: aboutReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions = SearchAction | AboutAction | { type: undefined };

const reducer = combineReducers<RootState, RootActions>(reducerMap);

export default reducer;
