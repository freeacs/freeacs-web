import { RootActions } from '../../../state';
import { ActionType, createStandardAction, getType } from 'typesafe-actions';

type LoginState = {
  loggedIn: boolean;
};

const initialState: LoginState = {
  loggedIn: false
};

export function loginReducer(
  state: LoginState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(LoginActions.setLoggedIn):
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
}

export const LoginActions = {
  setLoggedIn: createStandardAction('SET_LOGGED_IN')<boolean>()
};

export type LoginAction = ActionType<typeof LoginActions>;
