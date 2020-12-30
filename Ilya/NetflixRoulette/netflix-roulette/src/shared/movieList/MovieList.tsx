import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"
import { Link } from "react-router-dom";
import { IMovie } from 'shared/interfaces/IMovie';

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