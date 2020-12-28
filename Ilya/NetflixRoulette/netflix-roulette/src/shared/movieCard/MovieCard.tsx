import React from 'react';
import "./MovieCard.scss";

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