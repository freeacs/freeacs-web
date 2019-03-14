import * as React from 'react'
import {render, fireEvent, cleanup, waitForElement, act} from 'react-testing-library'
import {useSearch} from "../useSearch";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

afterEach(cleanup);

test('useSearch hook works', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost('/search').reply(200, JSON.stringify([{
        unitId: '124',
        profile: {
            id: 1,
            name: '1pr'
        },
        unitType: {
            id: 1,
            name: '1ut'
        }
    }]));

    // Arrange
    const {getByText} = render(
        <TestWrapper/>,
    );

    // Act
    act(() => {
        fireEvent.click(getByText("Submit"));
    });

    // assert
    await waitForElement(() =>
        getByText('124/1pr/1ut')
    );
});

function TestWrapper() {
    const {hits, setTerm} = useSearch();
    return (
        <div>
            <button onClick={() => setTerm("Heisann")}>Submit</button>
            <ul>
                {hits.map((hit, i) =>
                    <li key={i}>{hit.unitId}/{hit.profile.name}/{hit.unitType.name}</li>
                )}
            </ul>
        </div>
    );
}
