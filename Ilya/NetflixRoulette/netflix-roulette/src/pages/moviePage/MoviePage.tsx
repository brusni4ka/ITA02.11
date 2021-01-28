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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { requestMovieDetailsData, resetMovies } from 'redux/moviesSlice';

function MoviePage() {
    const history = useHistory();
    const location = useLocation();
    const params: { id: string } = useParams();
    const movie = useSelector((state: RootState) => state.store.movie);
    const dispatch = useDispatch();
    const parsed = queryString.parse(location.search);
    const currentPage = Number(parsed.page);

    useEffect(() => {
        dispatch(requestMovieDetailsData({ id: params.id, page: currentPage }));
        return () => {
            dispatch(resetMovies());
        }
    }, [location]);

    const onPage = (page: number): void => {
        history.push(`/moviePage/${movie.id}?page=${page}`);
    };

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
                    <MovieList />
                    <Pagination onPage={onPage} />
                    <Footer />
                </div>
            )
    );
}

export default MoviePage;