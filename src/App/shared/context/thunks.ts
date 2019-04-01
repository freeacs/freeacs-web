import { Dispatch } from 'react-hooks-global-state';
import { RootActions } from '../../state';
import ApiCall from '../http/ApiCall';
import { ContextActions } from './state';

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
