import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSearch } from './UseSearch';
import { SearchTable } from './SearchTable';
import './SearchScreen.css';
import Spinner from '../../../shared/spinner';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default function SearchScreen() {
  const { hits, error, term, setTerm, loading } = useSearch();

  const [value, setValue] = useState(term);

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  const onSubmitValue = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      return value && setTerm(value);
    },
    [value]
  );

  return (
    <div>
      <h2>Search</h2>
      <p>Here you can search for units</p>
      <Form inline>
        <FormGroup>
          <Input
            type="text"
            name="term"
            placeholder="search for units here"
            onChange={onChangeValue}
          />
        </FormGroup>
        <Button type="submit" onClick={onSubmitValue}>
          Submit
        </Button>
      </Form>
      {loading ? (
        <Spinner />
      ) : (
        <div className="results">
          {hits.length > 0 && <SearchTable hits={hits} />}
          {term && hits.length === 0 && !error && (
            <span>No hits for {term}</span>
          )}
          {error && (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {JSON.stringify(error, null, 2)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
