import React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from "query-string";

import "./SearchMovie.scss";
import SearchBtn from "shared/button/SearchBtn";

interface ISearchMovieOwnProps {
    onSubmit(inputValue: string, search: string): void,
}

interface ISearchMovieState {
    value: string,
    searchBy: string
}

type SearchMovieProps = ISearchMovieOwnProps & RouteComponentProps;

export enum SearchBy {
    Genre = "genre",
    Title = "title"
}

class SearchMovie extends React.Component<SearchMovieProps, ISearchMovieState> {

    state = {
        value: "",
        searchBy: SearchBy.Title
    };



    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        this.setState({ searchBy: parsed.searchBy as string || "title", value: parsed.inputValue as string || "" })
    }

    componentDidUpdate(prevProps: Readonly<SearchMovieProps>) {
        console.log(prevProps);
        console.log(this.props);

        if (this.props.history.action !== "PUSH" && this.props.location !== prevProps.location) {
            const parsed = queryString.parse(this.props.location.search) as { inputValue: string, searchBy: string, sortBy: string };
            const { inputValue = "", searchBy = "title", sortBy } = parsed;
            console.log(parsed);

            this.setState({ value: inputValue, searchBy: searchBy });
        }

    }



    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    }

    handlerSearchBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: "", searchBy: e.target.value });
    }

    handlerSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.state.value, this.state.searchBy);
    }

    render() {
        return (
            <div className="search-movie">
                <div className="layout">
                    <h1>find your movie</h1>
                    <form onSubmit={this.handlerSubmitForm}>
                        <input type="text" name="search" placeholder="Find your movie" value={this.state.value} onChange={this.handleChange} />
                        <div className="genres-btn">
                            <div className="btn-container">
                                <p>Search by</p>
                                <div className="radio-btn">
                                    <input type="radio" id="title-btn" name="movie-genre" onChange={this.handlerSearchBy} value={SearchBy.Title} checked={this.state.searchBy === SearchBy.Title} />
                                    <label htmlFor="title-btn">Title</label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="genre-btn" name="movie-genre" onChange={this.handlerSearchBy} value={SearchBy.Genre} checked={this.state.searchBy === SearchBy.Genre} />
                                    <label htmlFor="genre-btn">Genre</label>
                                </div>
                            </div>
                            <SearchBtn title="Search" />
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default withRouter(SearchMovie);

// /search/:sort/:filter
// /search/release/title-milk