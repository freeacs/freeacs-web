import {UnitArray} from "../../models";
import {Errors} from "io-ts";
import {useEffect, useState} from "react";
import {ApiHttpMethod} from "../../services/apiCall";

type UseSearchProps = {
    hits: UnitArray,
    error: Error | Errors | undefined,
    setTerm: (term: string) => void,
    isLoading: boolean
};

export function useSearch(apiCall: (method: ApiHttpMethod, url: string, body: object) => Promise<string>): UseSearchProps {
    const [hits, setHits] = useState<UnitArray>([]);
    const [error, setError] = useState<Error | Errors>();
    const [term, setTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!term) {
            return;
        }
        const onError = (msg: Error | Errors) => setError(msg);
        setHits([]);
        setError(undefined);
        setIsLoading(true);
        let stringPromise = apiCall('POST', '/search', { term });
        stringPromise
            .then(
                (responseText) => {
                    let json;
                    try { json = JSON.parse(responseText); } catch(_) {}
                    UnitArray.decode(json).bimap(onError, setHits)
                },
                onError
            );
        setIsLoading(false);
    }, [term]);

    return { hits, error, setTerm, isLoading };
}
