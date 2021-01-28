import React, { useEffect } from 'react';
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import "./HomePage.scss"
import Header from 'shared/header/Header';
import SearchMovie from "shared/searchMovie/SearchMovie";
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import Pagination from 'shared/pagination/Pagination';
import MovieSorter, { SortBy } from "shared/movieSorter/MovieSorter";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { requestMovies, resetMovies } from 'redux/moviesSlice';

function HomePage() {
    const history = useHistory();
    const location = useLocation<{ search: string }>();
    const total = useSelector((state: RootState) => state.store.total);
    const sortBy: SortBy = queryString.parse(location.search).sortBy as SortBy || SortBy.Release;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestMovies({ search: location.search }));
        return () => {
            dispatch(resetMovies());
        }
    }, [location]);

    const sortMovieByHandler = (sortBy: SortBy) => {
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, sortBy });
        history.push(`/search?${newSearchParams}`);
    }

    const submitSearchHandler = (search: string, searchBy: string) => {
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, search, searchBy });
        history.push(`/search?${newSearchParams}`);
    }

    const onPage = (page: number): void => {
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, page });
        history.push(`/search?${newSearchParams}`);
    };

    return (
        <div className="home-page">
            <div className="wrapper">
                <Header />
                <SearchMovie onSubmit={submitSearchHandler} />
            </div>
            <MovieSorter sortedQuantity={total} onSortChange={sortMovieByHandler} sortBy={sortBy} />
            <MovieList />
            <Pagination onPage={onPage} />
            <Footer />
        </div>
    );
}

export default HomePage;