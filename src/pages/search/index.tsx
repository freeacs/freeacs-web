import * as React from 'react';
import { useState } from 'react';
import { useSearch } from './hooks/useSearch';
import { SearchTable } from './components/SearchTable';
import './index.css';

export default function Search() {
  const [value, setValue] = useState<string>();
  const { hits, error, setTerm, loading } = useSearch();
  return (
    <div>
      <h1>Search Page</h1>
      <p>Here you can search for units</p>
      <div>
        <input
          placeholder="search for units here"
          value={value || ''}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={() => value && setTerm(value)}>Submit</button>
      </div>
      {loading ? (
        <span>Loading ....</span>
      ) : (
        <div className="results">
          {hits.length > 0 && <SearchTable hits={hits} />}
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
