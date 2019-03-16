import {combineReducers} from 'redux';
import {StateType} from "typesafe-actions";
import {searchReducer, SearchAction} from "../modules/search";

export const reducers = combineReducers({
    search: searchReducer
});

export type RootState = StateType<typeof reducers>;

export type RootActions = SearchAction
