import React, { useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import MovieList from 'shared/movieList/MovieList';
import Pagination from 'shared/pagination/Pagination';
import { SearchBy } from 'shared/searchMovie/SearchMovie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { requestMovieDetailsData, requestMovies, resetMovies, setCurrentPage } from 'redux/moviesReducer';

function MoviePage() {
    let history = useHistory();
    let location = useLocation();
    let params: { id: string } = useParams();

    const movies = useSelector((state: RootState) => state.store.movies);
    const currentPage = useSelector((state: RootState) => state.store.currentPage);
    const movie = useSelector((state: RootState) => state.store.movie);
    const total = useSelector((state: RootState) => state.store.total);
    const limit = useSelector((state: RootState) => state.store.limit);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Mounted");
        dispatch(requestMovieDetailsData(params.id));
        return () => {
            console.log("Unmounted");
            dispatch(resetMovies());
        }
    }, []);

    let currentPageUrl = currentPage;
    const parsed = queryString.parse(location.search);

    if ("page" in parsed) {
        currentPageUrl = Number(parsed.page);
    }

    //Pagination Methods
    const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        let searchBy = SearchBy.Genre
        let search = movie.genres[0];

        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        if (elem.value === "next" && currentPage < Math.ceil(total / limit)) {
            page = currentPage + 1;
            dispatch(setCurrentPage(page));
            const parsed = queryString.parse(location.search);
            const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
            history.push(`/moviePage/${movie.id}?page=${page}`);

            dispatch(requestMovies(newSearchParams));

        } else if (elem.value === "prev" && currentPage > 1) {
            page = currentPage - 1;
            dispatch(setCurrentPage(page));
            const parsed = queryString.parse(location.search);
            const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
            console.log(newSearchParams);
            history.push(`/moviePage/${movie.id}?page=${page}`);

            dispatch(requestMovies(newSearchParams));
        }
    }

    const moveToLimitPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        let searchBy = SearchBy.Genre
        let search = movie.genres[0];
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        page = (elem.value === "1") ? 1 : (Math.ceil(total / limit));

        dispatch(setCurrentPage(page));
        const parsed = queryString.parse(location.search);
        const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
        console.log(newSearchParams);
        history.push(`/moviePage/${movie.id}?page=${page}`);

        dispatch(requestMovies(newSearchParams));
    }

    return (
        (movie === null) ? (
            <div>Loading...</div>
        ) : (
                <div className="movie-page">
                    <div className="wrapper">
                        <Header />
                        <div className="layout">
                            <div className="btn">
                                <Link to="/"><button className="back-to-search-btn">Search</button></Link>
                            </div>
                        </div>
                        <MovieDecscription film={movie} />
                    </div>
                    <GenreSorter genre={movie.genres[0]} />
                    <MovieList movies={movies} total={total} />
                    <Pagination total={total} limit={limit} currentPage={currentPageUrl} onChangePage={changePage} onMoveToLimitPage={moveToLimitPage} />
                    <Footer />
                </div>
            )
    );
}

export default MoviePage;