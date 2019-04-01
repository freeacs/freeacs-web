import * as React from 'react';
import { Table } from 'reactstrap';
import { dispatch, useGlobalState } from '../../../state';
import { ContextActions } from '../../../shared/context';

export default function UnitTypeOverviewScreen() {
  const [{ selectedUnitType, unitTypes, loadUnitTypesError }] = useGlobalState(
    'context'
  );

  if (loadUnitTypesError) {
    return <span color="red">{loadUnitTypesError}</span>;
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
              <tr
                key={unitType.id}
                onClick={() =>
                  dispatch(ContextActions.setSelectedUnitType(unitType))
                }
                style={{
                  backgroundColor:
                    selectedUnitType && unitType.id === selectedUnitType.id
                      ? 'lightgreen'
                      : ''
                }}
              >
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
