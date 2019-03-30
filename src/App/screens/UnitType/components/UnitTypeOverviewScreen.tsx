import * as React from 'react';
import { useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { UnitType } from '../../../shared/models';
import { Table } from 'reactstrap';

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
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Protocol</th>
            <th>Name</th>
            <th>Vendor</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {unitTypes.map(unitType => {
            return (
              <tr key={unitType.id}>
                <th scope="row">{unitType.id}</th>
                <td>{unitType.protocol}</td>
                <td>{unitType.name}</td>
                <td>{unitType.vendor}</td>
                <td>{unitType.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {unitTypes.length === 0 && 'There are no unittypes'}
    </div>
  );
}
