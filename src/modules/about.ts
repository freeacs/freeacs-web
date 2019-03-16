import { ActionType, createStandardAction, getType } from 'typesafe-actions';

type AboutState = {
  name: string;
};

export type AboutAction = ActionType<typeof AboutActions>;

const initialState: AboutState = {
  name: 'FreeACS'
};

export function aboutReducer(
  state: AboutState = initialState,
  action: AboutAction
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
