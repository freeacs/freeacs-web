import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../state';
import { Profile, UnitType } from '../models';

type ContextState = {
  selectedUnitType?: UnitType;
  selectedProfile?: Profile;
};

const initialState: ContextState = {
  selectedUnitType: undefined,
  selectedProfile: undefined
};

export function contextReducer(
  state: ContextState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(ContextActions.setSelectedUnitType):
      return {
        ...state,
        selectedUnitType: action.payload
      };
    case getType(ContextActions.setSelectedProfile):
      return {
        ...state,
        selectedProfile: action.payload
      };
    default:
      return state;
  }
}

export const ContextActions = {
  setSelectedUnitType: createStandardAction('SET_SELECTED_UNITTYPE_ID')<
    UnitType
  >(),
  setSelectedProfile: createStandardAction('SET_SELECTED_PROFILE_ID')<Profile>()
};

export type ContextAction = ActionType<typeof ContextActions>;
