import React from "react";
import "./MovieDescription.scss";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieDecscriptionProps {
    film: IMovie[]
}

class MovieDecscription extends React.Component<IMovieDecscriptionProps> {
    render() {
        return (
            <div className="description-container" >
                <div className="description-item">
                    <img src={this.props.film[0].poster_path} alt="poster" />
                </div>
                <div className="description-item">
                    <h1>{this.props.film[0].title}</h1>
                    <p>Oscar-winning Movies</p>
                    <div className="param-container">
                        <p className="release-year">1994</p>
                        <p className="duration">154 min</p>
                    </div>
                    <p className="summary">{this.props.film[0].overview}</p>
                </div>
            </div>
        );
    }
}

export default MovieDecscription;

