import { UnitArray } from '../../../shared/models';
import { Errors } from 'io-ts';
import { useCallback, useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import * as React from 'react';

type UseSearchProps = {
  hits: UnitArray;
  error: Error | Errors | undefined;
  term?: string;
  setTerm: (term: string) => void;
  loading: boolean;
};

export function useSearch(): UseSearchProps {
  const [hits, setHits] = useState<UnitArray>([]);
  const [error, setError] = useState<Error | Errors>();
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState<string>();
  const [changed, setChanged] = useState<number>();

  useEffect(() => {
    if (typeof term === 'undefined') {
      return;
    }
    setLoading(true);
    setError(undefined);
    setHits([]);
    ApiCall('GET', '/rest/unit/search', {
      term,
      profiles: [1],
      limit: 1000,
      t: changed
    })
      .then(
        r => {
          setLoading(false);
          setHits(r);
        },
        e => {
          setLoading(false);
          setError(e);
        }
      )
      .catch(e => setError(e));
  }, [term, changed]);

  const setNewTerm = useCallback((term: string) => {
    setTerm(term);
    setChanged(Date.now());
  }, []);

  return { hits, error, term, setTerm: setNewTerm, loading };
}

export function UseSearch({
  children
}: {
  children: (props: UseSearchProps) => React.ReactElement;
}) {
  return children(useSearch());
}
