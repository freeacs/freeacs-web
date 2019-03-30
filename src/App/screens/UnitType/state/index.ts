import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../../state';
import { UnitType } from '../../../shared/models';

type UnitTypeState = {
  selectedUnitType?: UnitType;
};

const initialState: UnitTypeState = {
  selectedUnitType: undefined
};

export function unitTypeReducer(
  state: UnitTypeState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(UnitTypeActions.setSelectedUnitType):
      return {
        ...state,
        selectedUnitType: action.payload
      };
    default:
      return state;
  }
}

export const UnitTypeActions = {
  setSelectedUnitType: createStandardAction('SET_SELECTED_UNIT_TYPE_ID')<
    UnitType
  >()
};

export type UnitTypeAction = ActionType<typeof UnitTypeActions>;
