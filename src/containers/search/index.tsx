import * as React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../../modules";
import { OnChangeEvent } from "../../types";
import { Unit } from '../../models';
import { doSearch, inputChanged } from "../../modules/search";

interface Props {
    inputValue: string,
    onInputChanged: (e: OnChangeEvent) => void,
    doSearch: (term: string) => void,
    hits: ReadonlyArray<Unit>,
    error?: string
}

const Home = (props: Props) => {
    return (
        <div>
            <h1>Search Page</h1>
            <p>Here you can search for units</p>
            <p>
                <input
                    placeholder="search for units here"
                    value={props.inputValue}
                    onChange={props.onInputChanged}
                />
                <button onClick={onSubmit(props)}>
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

const onSubmit = (props: Props) => () => {
    if (props.inputValue.length >= 1) {
        props.doSearch(props.inputValue);
    }
};

const mapStateToProps = (state: RootState) => ({
    error: state.search.error,
    hits: state.search.hits,
    inputValue: state.search.inputValue
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        doSearch,
        onInputChanged: (e: OnChangeEvent) => inputChanged(e.currentTarget.value)
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);