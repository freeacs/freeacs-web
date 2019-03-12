import * as React from 'react'
import { connect } from "react-redux";
import { RootState } from "../../modules";
import { Unit } from '../../models';
import { doSearch, inputChanged } from "../../modules/search";

type DispatchProps = {
    inputChanged: (s: string) => void,
    doSearch: () => void
}

type ComponentProps = {
    inputValue: string,
    hits: ReadonlyArray<Unit>,
    error?: string
}

type Props = ComponentProps & DispatchProps;

const Home = (props: Props) => {
    return (
        <div>
            <h1>Search Page</h1>
            <p>Here you can search for units</p>
            <p>
                <input
                    placeholder="search for units here"
                    value={props.inputValue}
                    onChange={(e) => props.inputChanged(e.currentTarget.value)}
                />
                <button onClick={props.doSearch}>
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
    inputValue: state.search.inputValue
});

const mapDispatchToProps: DispatchProps = ({
    doSearch,
    inputChanged
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
