import { combineReducers } from 'redux';

import { searchReducer } from "../modules/search";

export const reducers = combineReducers({
    search: searchReducer
});
