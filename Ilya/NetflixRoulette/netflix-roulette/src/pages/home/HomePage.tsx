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
import { requestMovies, resetMovies, setCurrentPage } from 'redux/moviesReducer';

function HomePage() {
    let history = useHistory();
    let location = useLocation();
    const movies = useSelector((state: RootState) => state.store.movies);
    const currentPage = useSelector((state: RootState) => state.store.currentPage);
    const loading = useSelector((state: RootState) => state.store.loading);
    const total = useSelector((state: RootState) => state.store.total);
    const limit = useSelector((state: RootState) => state.store.limit);
    const dispatch = useDispatch();



    let currentPageUrl = currentPage;
    const parsed = queryString.parse(location.search);

    if ("page" in parsed) {
        currentPageUrl = Number(parsed.page);
    }

    useEffect(() => {
        console.log("Mounted");
        dispatch(requestMovies(location.search));
        return () => {
            console.log("Unmounted");
            dispatch(resetMovies());
        }
    }, []);

    useEffect(() => {
        console.log("Updated");
        if (history.action !== "PUSH") {
            dispatch(requestMovies(location.search));
        }
    }, []);

    const sortMovieByHandler = (sortBy: SortBy) => {
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, sortBy });
        history.push(`/search?${newSearchParams}`);

        dispatch(requestMovies(newSearchParams));
    }

    const submitSearchHandler = (search: string, searchBy: string) => {
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, search, searchBy });
        history.push(`/search?${newSearchParams}`);

        dispatch(requestMovies(newSearchParams));
    }

    //Pagination Methods
    const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        if (elem.value === "next" && currentPage < Math.ceil(total / limit)) {
            page = currentPage + 1;
            dispatch(setCurrentPage(page));
            const parsed = queryString.parse(location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            history.push(`/search?${newSearchParams}`);

            dispatch(requestMovies(newSearchParams));

        } else if (elem.value === "prev" && currentPage > 1) {
            page = currentPage - 1;
            dispatch(setCurrentPage(page));
            const parsed = queryString.parse(location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            history.push(`/search?${newSearchParams}`);

            dispatch(requestMovies(newSearchParams));
        }
    }

    const moveToLimitPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        page = (elem.value === "1") ? 1 : (Math.ceil(total / limit));

        dispatch(setCurrentPage(page));
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, page });
        history.push(`/search?${newSearchParams}`);

        dispatch(requestMovies(newSearchParams));
    }

    const sortBy: SortBy = queryString.parse(location.search).sortBy as SortBy || SortBy.Release;
    return (
        <div className="home-page">
            <div className="wrapper">
                <Header />
                <SearchMovie onSubmit={submitSearchHandler} />
            </div>
            <MovieSorter sortedQuantity={total} onSortChange={sortMovieByHandler} sortBy={sortBy} />
            {loading ? (
                <div>Loading...</div>
            ) : (<MovieList movies={movies} total={total} />)}
            <Pagination total={total} limit={limit} currentPage={currentPageUrl} onChangePage={changePage} onMoveToLimitPage={moveToLimitPage} />
            <Footer />
        </div>
    );
}

export default HomePage;