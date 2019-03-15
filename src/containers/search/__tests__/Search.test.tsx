import * as React from 'react'
import {render, fireEvent, cleanup, waitForElement, act} from 'react-testing-library'
import Search from '../index';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

afterEach(cleanup);

test('Search page works', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost('/rest/search', { term: "Hei" }).reply(200, JSON.stringify([{
        unitId: '123',
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
