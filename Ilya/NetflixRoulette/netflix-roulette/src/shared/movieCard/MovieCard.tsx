import React from 'react';
import "./MovieCard.scss";
import { IMovie } from 'shared/interfaces/IMovie';
import { HomePageConnectProps } from 'pages/home';

interface IMovieCardOwnProps {
    key: number,
    film: IMovie,
}
type IMovieCardProps = IMovieCardOwnProps & HomePageConnectProps;




class MovieCard extends React.Component<IMovieCardProps> {

    handlerOnClick = () => {
        this.props.requestMovieById(String(this.props.film.id));
    }

    render() {
        return (
            <div className="movie-card" onClick={this.handlerOnClick} >
                <img src={this.props.film.poster_path} alt={this.props.film.title} />
                <div className="information">
                    <h1 className="movie-name">{this.props.film.title}</h1>
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