import { dispatch, useGlobalState } from '../../state';
import ApiCall from '../http/ApiCall';
import { ContextActions } from '.';

export function useLoadUnitTypes() {
  const [{ loadUnitTypesError }] = useGlobalState('context');
  return () => {
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
}

export function useLoadProfiles() {
  const [{ loadProfilesError }] = useGlobalState('context');
  return (unitTypeId: number) => {
    if (loadProfilesError) {
      dispatch(ContextActions.setLoadProfilesError(undefined));
    }
    ApiCall('GET', '/rest/profile/byUnitTypeId/' + unitTypeId).then(
      result => dispatch(ContextActions.setProfiles(result)),
      () =>
        dispatch(ContextActions.setLoadProfilesError('Failed to load profiles'))
    );
  };
}
