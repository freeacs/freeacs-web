import { UnitArray } from '../../../shared/models';
import { Errors } from 'io-ts';
import { useCallback, useEffect } from 'react';
import { useGlobalState, dispatch } from '../../../shared/redux/store';
import apiCall from '../../../shared/http/apiCall';
import { SearchActions } from '../redux';
import * as React from 'react';

type UseSearchProps = {
  hits: UnitArray;
  error: Error | Errors | undefined;
  term?: string;
  setTerm: (term: string) => void;
  loading: boolean;
};

export function useSearch(): UseSearchProps {
  const [{ hits, term, error, loading }] = useGlobalState('search');

  useEffect(() => {
    if (typeof term === 'undefined') {
      return;
    }
    dispatch(SearchActions.search.request());
    apiCall('POST', '/search', { term })
      .then(
        json =>
          UnitArray.decode(json).bimap(
            e => dispatch(SearchActions.search.failure(e)),
            r => dispatch(SearchActions.search.success(r))
          ),
        e => dispatch(SearchActions.search.failure(e))
      )
      .catch(e => dispatch(SearchActions.search.failure(e)));
  }, [term]);

  const setTerm = useCallback(
    (term: string) => dispatch(SearchActions.setTerm(term)),
    []
  );

  return { hits, error, term, setTerm, loading };
}

export function UseSearch({
  children
}: {
  children: (props: UseSearchProps) => React.ReactElement;
}) {
  return children(useSearch());
}