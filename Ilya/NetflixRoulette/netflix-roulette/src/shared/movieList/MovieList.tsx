import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"
import { Link } from "react-router-dom";
import { IMovie } from 'shared/interfaces/IMovie';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function MovieList() {
    const loading = useSelector((state: RootState) => state.store.loading);
    const movies = useSelector((state: RootState) => state.store.movies);
    const total = useSelector((state: RootState) => state.store.total);

    return (
        <div className="movie-list-container">
            <div className="films-list">
                <div className="layout">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                            total === 0 ? (
                                <div className="empty-search">
                                    <p>No films Found</p>
                                </div>
                            ) : (< div className="films-container">
                                {movies.map((m: IMovie) => {
                                    return (
                                        <Link to={`/moviePage/${m.id}`} key={m.id}><MovieCard key={m.id} film={m} /></Link>
                                    )
                                })}
                            </div>)
                        )}
                </div>
            </div>
        </div>
    );
}

export default MovieList;