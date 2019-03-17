import { UnitArray } from '../../../models';
import { Errors } from 'io-ts';
import { useEffect, useState } from 'react';
import { useGlobalState, dispatch } from '../../../state/store';
import { search } from '../../../modules/search';

type UseSearchProps = {
  hits: UnitArray;
  error: Error | Errors | undefined;
  setTerm: (term: string) => void;
  loading: boolean;
};

export function useSearch(): UseSearchProps {
  const [{ hits, error, loading }] = useGlobalState('search');

  const [term, setTerm] = useState<string>();

  useEffect(() => {
    if (typeof term === 'undefined') {
      return;
    }
    dispatch(search(term) as any);
  }, [term]);

  return { hits, error, setTerm, loading };
}
