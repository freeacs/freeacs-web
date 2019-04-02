import { dispatch, useGlobalState } from '../../state';
import ApiCall from '../http/ApiCall';
import { ContextActions } from '.';
import { Profile, Unit, UnitType } from '../models';

export function useLoadUnitTypes() {
  const [{ loadUnitTypesError, unitTypes }] = useGlobalState('context');
  const loadUnitTypes = () => {
    if (loadUnitTypesError) {
      dispatch(ContextActions.setLoadUnitTypesError(undefined));
    }
    ApiCall('GET', '/rest/unittype').then(
      result => dispatch(ContextActions.setUnitTypes(result)),
      () =>
        dispatch(
          ContextActions.setLoadUnitTypesError('Failed to load unit types')
        )
    );
  };
  return { loadUnitTypes, unitTypes, loadUnitTypesError };
}

export function useSelectUnitType() {
  const [{ selectedUnitType }] = useGlobalState('context');
  const setSelectedUnitType = (unitType: UnitType) => {
    dispatch(ContextActions.setSelectedUnitType(unitType));
  };
  return { selectedUnitType, setSelectedUnitType };
}

export function useLoadProfiles() {
  const [{ loadProfilesError, profiles }] = useGlobalState('context');
  const loadProfiles = (unitTypeId: number) => {
    if (loadProfilesError) {
      dispatch(ContextActions.setLoadProfilesError(undefined));
    }
    ApiCall('GET', '/rest/profile/byUnitTypeId/' + unitTypeId).then(
      result => dispatch(ContextActions.setProfiles(result)),
      () =>
        dispatch(ContextActions.setLoadProfilesError('Failed to load profiles'))
    );
  };
  return { loadProfiles, profiles, loadProfilesError };
}

export function useSelectProfile() {
  const [{ selectedProfile }] = useGlobalState('context');
  const setSelectedProfile = (profile: Profile) => {
    dispatch(ContextActions.setSelectedProfile(profile));
  };
  return { setSelectedProfile, selectedProfile };
}

export function useSelectUnit() {
  const [{ selectedUnit }] = useGlobalState('context');
  const setSelectedUnit = (unit: Unit) => {
    dispatch(ContextActions.setSelectedUnit(unit));
  };
  return { setSelectedUnit, selectedUnit };
}
