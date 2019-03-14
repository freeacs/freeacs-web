import {UnitArray} from "../../models";
import {Errors} from "io-ts";
import {useEffect, useState} from "react";
import apiCall from "../../services/apiCall";

type UseSearchProps = {
    hits: UnitArray,
    error: Error | Errors | undefined,
    setTerm: (term: string) => void,
    isLoading: boolean
};

export function useSearch(): UseSearchProps {
    const [hits, setHits] = useState<UnitArray>([]);
    const [error, setError] = useState<Error | Errors>();
    const [term, setTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!term) {
            return;
        }
        setHits([]);
        setError(undefined);
        setIsLoading(true);
        apiCall('POST', '/search', { term })
            .then(
                (json) => UnitArray.decode(json).bimap(setError, setHits),
                setError
            );
        setIsLoading(false);
    }, [term]);

    return { hits, error, setTerm, isLoading };
}
