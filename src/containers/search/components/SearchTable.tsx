import * as React from "react";
import {UnitArray} from "../../../models";

type Props = { hits: UnitArray }

export function SearchResultsTable({ hits }: Props) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm table-hover table-bordered">
                <thead>
                    <th scope="col">ID</th>
                    <th scope="col">Profile</th>
                    <th scope="col" style={{ whiteSpace: 'nowrap'}}>Unit Type</th>
                </thead>
                <tbody>
                {hits.map((hit, index) => (
                    <tr key={hit.unitId + index}>
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
