import * as React from 'react'
import {UnitArray} from '../../models';
import {useEffect, useState} from "react";
import {post} from "../../services/apiCall";
import {Errors} from "io-ts";

export default function Home() {
    const [hits, setHits] = useState<UnitArray>([]);
    const [value, setValue] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (search.trim().length > 0) {
            const onError = (msg: string) => (ignored: Error | Errors) => setError(msg);
            setError('');
            setHits([]);
            setIsLoading(true);
            post('/search', { term: search })
                .then(
                    (responseText) => {
                        let json;
                        try { json = JSON.parse(responseText); } catch(_) {}
                        UnitArray.decode(json)
                            .bimap(
                                onError("Bad data received from server"),
                                setHits
                            )
                    },
                    onError("Error occurred while searching")
                );
            setIsLoading(false);
        }
    }, [search]);

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
                <button onClick={() => setSearch(value)}>
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
                    {error}
                    </span>
                    }
                </div>
            )}

        </div>
    )
}
