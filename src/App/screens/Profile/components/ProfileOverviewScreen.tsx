import * as React from 'react';
import { useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { Profile } from '../../../shared/models';
import { Table } from 'reactstrap';
import { dispatch, useGlobalState } from '../../../state';
import { ContextActions } from '../../../shared/context/state';

export default function ProfileOverviewScreen() {
  const [{ selectedUnitType, selectedProfile }] = useGlobalState('context');
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
    ApiCall(
      'GET',
      '/rest/profile/byUnitTypeId/' + (selectedUnitType && selectedUnitType.id)
    ).then(
      result => setProfiles(result),
      () => setError('Failed to load profiles')
    );
  }, []);

  if (error) {
    return <span color="red">{error}</span>;
  }

  return (
    <div>
      <h2>Profile - Overview</h2>
      <Table striped={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => {
            return (
              <tr
                key={profile.id}
                onClick={() =>
                  dispatch(ContextActions.setSelectedProfile(profile))
                }
                style={{
                  backgroundColor:
                    selectedProfile && profile.id === selectedProfile.id
                      ? 'lightgreen'
                      : ''
                }}
              >
                <th scope="row">{profile.id}</th>
                <td>{profile.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {profiles.length === 0 && 'There are no profiles'}
    </div>
  );
}
