import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { dispatch, RootActions } from '../../state';
import { Profile, ProfileArray, UnitType, UnitTypeArray } from '../models';
import ApiCall from '../http/ApiCall';
import { Dispatch } from 'react-hooks-global-state';

type ContextState = {
  unitTypes: UnitTypeArray;
  selectedUnitType?: UnitType;
  loadUnitTypesError?: string;
  profiles: ProfileArray;
  selectedProfile?: Profile;
  loadProfilesError?: string;
};

const initialState: ContextState = {
  unitTypes: [],
  selectedUnitType: undefined,
  loadUnitTypesError: undefined,
  profiles: [],
  selectedProfile: undefined,
  loadProfilesError: undefined
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
        selectedProfile: action.payload
      };
    case getType(ContextActions.setProfiles):
      return {
        ...state,
        profiles: action.payload
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
  setError: createStandardAction('SET_ERROR')<string | undefined>()
};

export function loadUnitTypes(dispatch: Dispatch<RootActions>) {
  dispatch(ContextActions.setError(undefined));
  ApiCall('GET', '/rest/unittype').then(
    result => dispatch(ContextActions.setUnitTypes(result)),
    () => dispatch(ContextActions.setError('Failed to load unit types'))
  );
}

export function loadProfiles(
  unitTypeId: number,
  dispatch: Dispatch<RootActions>
) {
  dispatch(ContextActions.setError(undefined));
  ApiCall('GET', '/rest/profile/byUnitTypeId/' + unitTypeId).then(
    result => dispatch(ContextActions.setProfiles(result)),
    () => dispatch(ContextActions.setError('Failed to load profiles'))
  );
}

export type ContextAction = ActionType<typeof ContextActions>;
