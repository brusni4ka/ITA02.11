import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"
import { Link } from "react-router-dom";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieListProps {
    movies: IMovie[],
    total: number,
}

function MovieList(props: IMovieListProps) {

    return (
        <div className="movie-list-container">
            <div className="films-list">
                <div className="layout">
                    {props.total === 0 ? (
                        <div className="empty-search">
                            <p>No films Found</p>
                        </div>
                    ) : (< div className="films-container">
                        {props.movies.map((m: IMovie) => {
                            return (
                                <Link to={`/moviePage/${m.id}`} key={m.id}><MovieCard key={m.id} film={m} /></Link>
                            )
                        })}
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default MovieList;