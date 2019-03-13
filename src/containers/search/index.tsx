import * as React from 'react'
import { connect } from "react-redux";
import { RootState } from "../../modules";
import { Unit } from '../../models';
import { doSearch } from "../../modules/search";
import { useState } from "react";

type DispatchProps = {
    doSearch: (term: string) => void
}

type ComponentProps = {
    hits: ReadonlyArray<Unit>,
    error?: string
}

type Props = ComponentProps & DispatchProps;

const Home = (props: Props) => {
    const [value, setValue] = useState('');

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function onClickSubmit() {
        props.doSearch(value);
        setValue('');
    }

    return (
        <div>
            <h1>Search Page</h1>
            <p>Here you can search for units</p>
            <p>
                <input
                    placeholder="search for units here"
                    value={value}
                    onChange={onInputChange}
                />
                <button onClick={onClickSubmit}>
                    Submit
                </button>
            </p>
            {props.hits.length > 0 &&
            <ul>
                {props.hits.map((hit, i) => <li key={i}>{hit.unitId}</li>)}
            </ul>
            }
            {props.error &&
            <span style={{ color: "red", fontWeight: "bold" }}>
                An error occurred:<br />{props.error}
            </span>
            }
        </div>
    )
};

const mapStateToProps = (state: RootState): ComponentProps => ({
    error: state.search.error,
    hits: state.search.hits,
});

const mapDispatchToProps: DispatchProps = ({
    doSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
