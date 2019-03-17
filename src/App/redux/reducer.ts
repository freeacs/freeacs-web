import { StateType } from 'typesafe-actions';
import { searchReducer, SearchAction } from '../screens/Search/redux';
import { aboutReducer, AboutAction } from '../screens/About/redux';
import { combineReducers } from 'redux';

const reducerMap = {
  search: searchReducer,
  about: aboutReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions = SearchAction | AboutAction | { type: undefined };

const reducer = combineReducers<RootState, RootActions>(reducerMap);

export default reducer;
