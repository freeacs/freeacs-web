import * as React from 'react';
import { useCallback, useState } from 'react';
import { useSearch } from './components/UseSearch';
import { ResultTable } from './components/ResultTable';
import './index.css';

export default function Search() {
  const { hits, error, term, setTerm, loading } = useSearch();
  const [value, setValue] = useState(term);
  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  const onSubmitValue = useCallback(() => value && setTerm(value), [value]);
  return (
    <div>
      <h1>Search Page</h1>
      <p>Here you can search for units</p>
      <div>
        <input
          placeholder="search for units here"
          value={value || ''}
          onChange={onChangeValue}
        />
        <button onClick={onSubmitValue}>Submit</button>
      </div>
      {loading ? (
        <span>Loading ....</span>
      ) : (
        <div className="results">
          {hits.length > 0 && <ResultTable hits={hits} />}
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
