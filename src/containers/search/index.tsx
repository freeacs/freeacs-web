import * as React from 'react'
import {UnitArray} from '../../models';
import {useEffect, useState} from "react";
import {doSearch} from "../../services/search";

const Home = () => {
    const [hits, setHits] = useState<UnitArray>([]);
    const [value, setValue] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (search.trim().length > 0) {
            setError('');
            setHits([]);
            setIsLoading(true);
            doSearch(search, setHits, setError)
                .then(() => setIsLoading(false));
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
                <div className="results" hidden={isLoading}>
                    {hits.length > 0 &&
                    <ul>
                        {hits.map((hit) => <li key={hit.unitId}>{hit.unitId}</li>)}
                    </ul>
                    }
                    {error &&
                    <span style={{ color: "red", fontWeight: "bold" }}>
                    {error}
                </span>
                    }
                </div>
            )}

        </div>
    )
};

export default Home;
