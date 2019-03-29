import * as React from 'react';
import { useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { Profile } from '../../../shared/models';

export default function ProfileOverviewScreen() {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
    ApiCall('GET', '/rest/profile/byUnitTypeId/1').then(
      result => setProfiles(result),
      () => setError('Failed to load profiles')
    );
  }, []);

  if (error) {
    return <span color="red">{error}</span>;
  }

  return (
    <div>
      <h2>Profile Overview</h2>
      <ul>
        {profiles.map(profile => {
          return <li key={profile.id}>{profile.name}</li>;
        })}
      </ul>
      {profiles.length === 0 && 'There are no profiles'}
    </div>
  );
}
