import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import { SearchTable } from '../SearchTable';

afterEach(cleanup);

test('SearchTable works with single hit', async () => {
  const { getByText } = render(
    <SearchTable
      hits={[
        {
          unitId: 'abc',
          profile: {
            id: 1,
            name: 'Default'
          },
          unitType: {
            id: 1,
            name: 'Generic'
          }
        }
      ]}
    />
  );

  expect(getByText('abc')).toBeDefined();
  expect(getByText('Default')).toBeDefined();
  expect(getByText('Generic')).toBeDefined();
});

test('SearchTable works with multiple hits', async () => {
  const { getByText } = render(
    <SearchTable
      hits={[
        {
          unitId: 'abc',
          profile: {
            id: 1,
            name: 'Default'
          },
          unitType: {
            id: 1,
            name: 'Generic'
          }
        },
        {
          unitId: 'abd',
          profile: {
            id: 2,
            name: 'Defaults'
          },
          unitType: {
            id: 2,
            name: 'Generics'
          }
        }
      ]}
    />
  );

  expect(getByText('abc')).toBeDefined();
  expect(getByText('Default')).toBeDefined();
  expect(getByText('Generic')).toBeDefined();

  expect(getByText('abd')).toBeDefined();
  expect(getByText('Defaults')).toBeDefined();
  expect(getByText('Generics')).toBeDefined();
});
