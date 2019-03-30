import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';
import { AboutAction, aboutReducer } from '../screens/About/state';
import { UnitTypeAction, unitTypeReducer } from '../screens/UnitType/state';
import { AuthAction, authReducer } from '../shared/auth/state';
import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

const reducerMap = {
  about: aboutReducer,
  auth: authReducer,
  unitType: unitTypeReducer
};

export type RootState = StateType<typeof reducerMap>;

export type RootActions =
  | AboutAction
  | AuthAction
  | UnitTypeAction
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
