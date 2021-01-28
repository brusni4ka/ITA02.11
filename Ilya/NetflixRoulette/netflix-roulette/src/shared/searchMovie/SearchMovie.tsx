import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import queryString from "query-string";

import "./SearchMovie.scss";
import SearchBtn from "shared/button/SearchBtn";

interface ISearchMovieProps {
    onSubmit(search: string, searchBy: string): void,
}

export enum SearchBy {
    Genre = "genres",
    Title = "title"
}

function SearchMovie(props: ISearchMovieProps) {
    const [value, setValue] = useState("");
    const [searchBy, setSearchBy] = useState(SearchBy.Title);
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        setValue(parsed.search as string || "");
        (parsed.searchBy === SearchBy.Genre) ? setSearchBy(SearchBy.Genre) : setSearchBy(SearchBy.Title);
    }, [location]);

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handlerSearchBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("");
        (e.target.value === SearchBy.Title) ? setSearchBy(SearchBy.Title) : setSearchBy(SearchBy.Genre);
    }

    const handlerSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(value, searchBy);
    }

    return (
        <div className="search-movie">
            <div className="layout">
                <h1>find your movie</h1>
                <form onSubmit={handlerSubmitForm}>
                    <input type="text" name="search" placeholder="Find your movie" value={value} onChange={handlerChange} />
                    <div className="genres-btn">
                        <div className="btn-container">
                            <p>Search by</p>
                            <div className="radio-btn">
                                <input type="radio" id="title-btn" name="movie-genre" onChange={handlerSearchBy} value={SearchBy.Title} checked={searchBy === SearchBy.Title} />
                                <label htmlFor="title-btn">Title</label>
                            </div>
                            <div className="radio-btn">
                                <input type="radio" id="genre-btn" name="movie-genre" onChange={handlerSearchBy} value={SearchBy.Genre} checked={searchBy === SearchBy.Genre} />
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

export default SearchMovie;
