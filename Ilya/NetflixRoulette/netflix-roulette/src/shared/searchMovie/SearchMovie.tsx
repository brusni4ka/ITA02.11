import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
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
    const [searchBy, setSearchBy] = useState(SearchBy.Title as string);

    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        setValue(parsed.search as string || "");
        setSearchBy(parsed.searchBy as string || SearchBy.Title);
    }, [location.search]);

    useEffect(() => {
        if (history.action !== "PUSH") {
            const { search = "", searchBy = SearchBy.Title } = queryString.parse(location.search) as { search: string, searchBy: string };
            setValue(search);
            setSearchBy(searchBy);
        }
    }, [history.action, location.search]);

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handlerSearchBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("");
        setSearchBy(e.target.value);
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
