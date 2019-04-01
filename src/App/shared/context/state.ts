import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../state';
import {
  Profile,
  ProfileArray,
  Unit,
  UnitType,
  UnitTypeArray
} from '../models';

type ContextState = {
  unitTypes: UnitTypeArray;
  selectedUnitType?: UnitType;
  loadUnitTypesError?: string;
  profiles: ProfileArray;
  selectedProfile?: Profile;
  loadProfilesError?: string;
  selectedUnit?: Unit;
};

const initialState: ContextState = {
  unitTypes: [],
  selectedUnitType: undefined,
  loadUnitTypesError: undefined,
  profiles: [],
  selectedProfile: undefined,
  loadProfilesError: undefined,
  selectedUnit: undefined
};

export function contextReducer(
  state: ContextState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(ContextActions.setSelectedUnitType):
      return {
        ...state,
        selectedUnitType: action.payload,
        selectedProfile: undefined,
        selectedUnit: undefined,
        profiles: []
      };
    case getType(ContextActions.setUnitTypes):
      return {
        ...state,
        unitTypes: action.payload
      };
    case getType(ContextActions.setSelectedProfile):
      return {
        ...state,
        selectedProfile: action.payload,
        selectedUnit: undefined
      };
    case getType(ContextActions.setProfiles):
      return {
        ...state,
        profiles: action.payload
      };
    case getType(ContextActions.setUnit):
      return {
        ...state,
        selectedUnit: action.payload,
        selectedProfile: action.payload.profile
      };
    default:
      return state;
  }
}

export const ContextActions = {
  setUnitTypes: createStandardAction('SET_UNIT_TYPES')<UnitTypeArray>(),
  setSelectedUnitType: createStandardAction('SET_UNIT_TYPE_ID')<UnitType>(),
  setProfiles: createStandardAction('SET_PROFILES')<ProfileArray>(),
  setSelectedProfile: createStandardAction('SET_PROFILE_ID')<Profile>(),
  setUnit: createStandardAction('SET_UNIT_ID')<Unit>(),
  setError: createStandardAction('SET_ERROR')<string | undefined>()
};

export type ContextAction = ActionType<typeof ContextActions>;
