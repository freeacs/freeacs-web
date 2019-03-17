import * as React from 'react';
import { render, fireEvent, cleanup, act } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
// @ts-ignore complains about no default export, but it works
import flushPromises from 'flush-promises';
import { GlobalStateProvider } from '../../../../shared/redux/store';
import { UseSearch } from '../UseSearch';

afterEach(cleanup);

test('UseSearch component works', async () => {
  const mock = new MockAdapter(axios);
  mock.onPost('/rest/search', { term: 'Hei' }).reply(
    200,
    JSON.stringify([
      {
        unitId: '123',
        profile: {
          id: 1,
          name: '1pr'
        },
        unitType: {
          id: 1,
          name: '1ut'
        }
      }
    ])
  );

  // Arrange
  const { getByText } = render(
    <GlobalStateProvider>
      <UseSearch>
        {({ term, setTerm, loading, error, hits }) => (
          <>
            <button onClick={() => setTerm('Hei')}>Submit</button>
            <ul>
              {hits.map((hit, i) => (
                <li key={i}>
                  {hit.unitId}/{hit.profile.name}/{hit.unitType.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </UseSearch>
    </GlobalStateProvider>
  );

  // Act
  act(() => {
    fireEvent.click(getByText('Submit'));
  });

  await flushPromises();

  expect(getByText('123/1pr/1ut')).toBeDefined();
});
