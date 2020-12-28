import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"
import { Link } from "react-router-dom";

interface IMovie {
    id: number,
    title: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    release_date: string,
    poster_path: string,
    overview: string,
    budget: number,
    revenue: number,
    runtime: number,
    genres: string[]
}

interface IMovieListProps {
    movies: IMovie[],
}

class MovieList extends React.Component<IMovieListProps> {

    render() {
        return (
            <main>
                <div className="films-list">
                    <div className="layout">
                        <div className="films-container">
                            {this.props.movies.map((movie) => {
                                return (
                                    <Link to={`/moviePage/${movie.id}`} key={movie.id}><MovieCard key={movie.id} movie={movie} /></Link>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default MovieList;