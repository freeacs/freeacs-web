import * as React from 'react';
import { Table } from 'reactstrap';
import {
  useLoadProfiles,
  useSelectProfile
} from '../../../shared/context/hooks';

export default function ProfileOverviewScreen() {
  const { selectedProfile, setSelectedProfile } = useSelectProfile();
  const { profiles, loadProfilesError } = useLoadProfiles();

  if (loadProfilesError) {
    return <span color="red">{loadProfilesError}</span>;
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
                onClick={() => setSelectedProfile(profile)}
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
