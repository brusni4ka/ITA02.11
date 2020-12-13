import React from 'react';
import "./MovieCard.scss";
import film from "../../images/film.jpg";

class MovieCard extends React.Component {
    state = {
        film: {
            name: "Kill Bill",
            year: 2004,
            genre: "Action",
            filmImg: "../images/film.jpg"
        },
    }
    render() {
        return (
            <div className="movie-card">
                <img src={film} alt="poster" />
                <div className="information">
                    <h1 className="movie-name">{this.state.film.name}</h1>
                    <div className="realese-year">{this.state.film.year}</div>
                </div>
                <p>{this.state.film.genre}</p>
            </div>
        );
    }
}

export default MovieCard;