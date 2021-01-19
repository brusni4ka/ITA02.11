import React from 'react';
import "./MovieCard.scss";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieCardOwnProps {
    film: IMovie,
}
type IMovieCardProps = IMovieCardOwnProps;




class MovieCard extends React.Component<IMovieCardProps> {

    render() {
        return (
            <div className="movie-card">
                <img src={this.props.film.poster_path} alt={this.props.film.title} />
                <div className="information">
                    <h3 className="movie-name">{this.props.film.title}</h3>
                    <div className="realese-year">{this.props.film.release_date.slice(0, 4)}</div>
                </div>
                <p>{this.props.film.genres.map((elem) => {
                    return (
                        <span key={elem} className='movie-genres'>{elem}</span>
                    );
                })}</p>
                <div className='rating'>{this.props.film.vote_average}</div>
            </div>
        );
    }
}

export default MovieCard;