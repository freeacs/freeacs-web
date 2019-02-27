import { combineReducers } from 'redux'
import { StateType } from "typesafe-actions";
import searchReducer from './search';

const combinedReducers = combineReducers({
    search: searchReducer
});

export default combinedReducers;

export type RootState = StateType<typeof combinedReducers>;