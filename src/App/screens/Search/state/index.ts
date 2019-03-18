import { UnitArray } from '../../../shared/models';
import {
  ActionType,
  createAsyncAction,
  createStandardAction,
  getType
} from 'typesafe-actions';
import { Errors } from 'io-ts';
import { RootActions } from '../../../state';

type SearchState = {
  hits: UnitArray;
  loading: boolean;
  error?: Error | Errors;
  term?: string;
};

const initialState: SearchState = {
  hits: [],
  loading: false,
  error: undefined,
  term: undefined
};

export function searchReducer(
  state: SearchState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(SearchActions.search.request):
      return {
        ...state,
        loading: true,
        error: undefined,
        hits: []
      };
    case getType(SearchActions.search.success):
      return {
        ...state,
        loading: false,
        hits: action.payload
      };
    case getType(SearchActions.search.failure):
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case getType(SearchActions.setTerm):
      return {
        ...state,
        term: action.payload
      };
    default:
      return state;
  }
}

export const SearchActions = {
  search: createAsyncAction(
    'SEARCH_REQUEST',
    'SEARCH_SUCCESS',
    'SEARCH_FAILURE'
  )<void, UnitArray, Error | Errors>(),
  setTerm: createStandardAction('SET_TERM')<string>()
};

export type SearchAction = ActionType<typeof SearchActions>;
