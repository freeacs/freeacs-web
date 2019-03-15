import {UnitArray} from "../models";
import {ActionType, createAsyncAction, getType} from "typesafe-actions";
import {Errors} from "io-ts";
import {Dispatch} from "react-hooks-global-state";
import {AnyAction} from "redux";
import apiCall from "../services/apiCall";

type SearchState = {
    hits: UnitArray,
    loading: boolean,
    error?: Error | Errors
}

type SearchAction = ActionType<typeof SearchActions>;

const initialState: SearchState = {
    hits: [],
    loading: false,
    error: undefined
};

export function searchReducer(state: SearchState = initialState, action: SearchAction = { type: '' } as any) {
    switch (action.type) {
        case getType(SearchActions.search.request): return {
            ...state,
            loading: true,
            hits: []
        };
        case getType(SearchActions.search.success): return {
            ...state,
            loading: false,
            hits: action.payload
        };
        case getType(SearchActions.search.failure): return {
            ...state,
            loading: false,
            error: action.payload
        };
        default: return initialState;
    }
}

export const SearchActions = {
    search: createAsyncAction('SEARCH_REQUEST', 'SEARCH_SUCCESS', 'SEARCH_FAILURE')<void, UnitArray, Error | Errors>()
};

export const SearchThunks = {
    search: (term: string) => (dispatch: Dispatch<AnyAction>) => {
        dispatch(SearchActions.search.request());
        apiCall('POST', '/search', { term })
            .then(
                (json) => UnitArray.decode(json).bimap(
                    (e) => dispatch(SearchActions.search.failure(e)),
                    (r) => dispatch(SearchActions.search.success(r))
                ),
                (e) => dispatch(SearchActions.search.failure(e))
            ).catch((e) => dispatch(SearchActions.search.failure(e)))
    }
};
