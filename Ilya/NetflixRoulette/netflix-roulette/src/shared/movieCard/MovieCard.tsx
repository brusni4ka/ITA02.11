import React from 'react';
import "./MovieCard.scss";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieCardProps {
    key: number,
    movie: IMovie,
}

class MovieCard extends React.Component<IMovieCardProps> {

    render() {
        return (
            <div className="movie-card">
                <img src={this.props.movie.poster_path} alt={this.props.movie.title} />
                <div className="information">
                    <h1 className="movie-name">{this.props.movie.title}</h1>
                    <div className="realese-year">{this.props.movie.release_date.slice(0, 4)}</div>
                </div>
                <p>{this.props.movie.genres.map((elem) => {
                    return (
                        <span key={elem}>{elem}</span>
                    );
                })}</p>
            </div>
        );
    }
}

export default MovieCard;