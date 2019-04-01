import * as React from 'react';
import { UnitArray } from '../../../shared/models';
import { ContextActions } from '../../../shared/context/state';
import { dispatch } from '../../../state';

type Props = { hits: UnitArray };

export function SearchTable({ hits }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Profile</th>
            <th scope="col" style={{ whiteSpace: 'nowrap' }}>
              Unit Type
            </th>
          </tr>
        </thead>
        <tbody>
          {hits.map((hit, index) => (
            <tr
              key={hit.unitId + index}
              onClick={() => dispatch(ContextActions.setUnit(hit))}
            >
              <td scope="row">{hit.unitId}</td>
              <td>{hit.profile.name}</td>
              <td>{hit.unitType.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
