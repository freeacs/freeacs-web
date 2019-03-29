import * as React from 'react';
import { useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { UnitType } from '../../../shared/models';

export default function UnitTypeOverviewScreen() {
  const [unitTypes, setUnitTypes] = useState<Array<UnitType>>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
    ApiCall('GET', '/rest/unittype').then(
      result => setUnitTypes(result),
      () => setError('Failed to load unit types')
    );
  }, []);

  if (error) {
    return <span color="red">{error}</span>;
  }

  return (
    <div>
      <h2>UnitType - Overview</h2>
      <ul>
        {unitTypes.map(unitType => {
          return <li key={unitType.id}>{unitType.name}</li>;
        })}
      </ul>
      {unitTypes.length === 0 && 'There are no unittypes'}
    </div>
  );
}
