import * as React from 'react'
import {UnitArray} from '../../models';
import {useEffect, useState} from "react";
import {post} from "../../services/apiCall";
import {Errors} from "io-ts";

function useSearch(): [UnitArray, Error | Errors | undefined, (term: string) => void, boolean] {
    const [hits, setHits] = useState<UnitArray>([]);
    const [error, setError] = useState<Error | Errors>();
    const [term, setTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (term.trim().length > 0) {
            const onError = (msg: Error | Errors) => setError(msg);
            setHits([]);
            setError(undefined);
            setIsLoading(true);
            post('/search', { term })
                .then(
                    (responseText) => {
                        let json;
                        try { json = JSON.parse(responseText); } catch(_) {}
                        UnitArray.decode(json).bimap(onError, setHits)
                    },
                    onError
                );
            setIsLoading(false);
        }
    }, [term]);

    return [ hits, error, setTerm, isLoading ];
}

export default function Home() {
    const [ value, setValue ] = useState<string>();
    const [ hits, error, setTerm, isLoading ] = useSearch();

    return (
        <div>
            <h1>Search Page</h1>
            <p>Here you can search for units</p>
            <div>
                <input
                    placeholder="search for units here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => value && setTerm(value)}>
                    Submit
                </button>
            </div>
            {isLoading ? <span>Loading ....</span> : (
                <div className="results">
                    {hits.length > 0 &&
                    <ul>
                        {hits.map((hit) => <li key={hit.unitId}>{hit.unitId}</li>)}
                    </ul>
                    }
                    {error &&
                    <span style={{color: "red", fontWeight: "bold"}}>
                    {error.toString()}
                    </span>
                    }
                </div>
            )}

        </div>
    )
}
