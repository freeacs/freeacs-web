import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../../redux';

type AboutState = {
  name: string;
};

const initialState: AboutState = {
  name: 'FreeACS'
};

export function aboutReducer(
  state: AboutState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(AboutActions.setName):
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}

export const AboutActions = {
  setName: createStandardAction('SET_NAME')<string>()
};

export type AboutAction = ActionType<typeof AboutActions>;
