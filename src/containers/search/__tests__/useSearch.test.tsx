import * as React from 'react'
import {render, fireEvent, cleanup, waitForElement, act} from 'react-testing-library'
import {useSearch} from "../useSearch";
jest.mock('../../../services/apiCall', () => async () => {
    return JSON.stringify([{
        unitId: '123',
        profile: {
            id: 1,
            name: '1pr'
        },
        unitType: {
            id: 1,
            name: '1ut'
        }
    }]);
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

function EffecfulComponent() {
    const {hits, error, setTerm} = useSearch();
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

test('useSearch hook works', async () => {
    // Arrange
    const {getByText} = render(
        <EffecfulComponent/>,
    );

    // Act
    act(() => {
        fireEvent.click(getByText("Submit"));
    });

    // assert
    await waitForElement(() =>
        getByText('123/1pr/1ut')
    );
});
