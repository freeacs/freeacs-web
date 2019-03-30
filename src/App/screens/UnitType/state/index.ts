import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../../state';

type UnitTypeState = {
  selectedUnitTypeId?: number;
};

const initialState: UnitTypeState = {
  selectedUnitTypeId: undefined
};

export function unitTypeReducer(
  state: UnitTypeState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(UnitTypeActions.setSelectedUnitTypeId):
      return {
        ...state,
        selectedUnitTypeId: action.payload
      };
    default:
      return state;
  }
}

export const UnitTypeActions = {
  setSelectedUnitTypeId: createStandardAction('SET_SELECTED_UNIT_TYPE_ID')<
    number
  >()
};

export type UnitTypeAction = ActionType<typeof UnitTypeActions>;
