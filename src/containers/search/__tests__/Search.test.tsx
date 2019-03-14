import * as React from 'react'
import {render, fireEvent, cleanup, waitForElement, act} from 'react-testing-library'
import Search from '../index';
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

test('Search page works', async () => {
    // Arrange
    const {getByText, container} = render(
        <Search/>,
    );

    // Act
    act(() => {
        fireEvent.change(container.querySelector("input") as Element, { target: { value: 'Hei'}})
    });

    act(() => {
        fireEvent.click(getByText("Submit"));
    });

    // assert
    await waitForElement(() =>
        getByText('123')
    );
});
