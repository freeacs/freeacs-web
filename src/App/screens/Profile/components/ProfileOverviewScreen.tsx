import * as React from 'react';
import { useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { Profile } from '../../../shared/models';

export default function ProfileOverviewScreen() {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
    ApiCall('GET', '/rest/profile').then(
      result => setProfiles(result),
      () => setError('Failed to load profiles')
    );
  }, []);

  if (error) {
    return <span color="red">{error}</span>;
  }

  return (
    <ul>
      {profiles.map(profile => {
        return <li key={profile.id}>{profile.name}</li>;
      })}
    </ul>
  );
}
