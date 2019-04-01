import { RootActions } from '../../state';
import { ActionType, createStandardAction, getType } from 'typesafe-actions';

type AuthState = {
  loggedIn?: boolean;
};

const initialState: AuthState = {
  loggedIn: undefined
};

export function authReducer(
  state: AuthState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(AuthActions.setLoggedIn):
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
}

export const AuthActions = {
  setLoggedIn: createStandardAction('SET_LOGGED_IN')<boolean>()
};

export type AuthAction = ActionType<typeof AuthActions>;
