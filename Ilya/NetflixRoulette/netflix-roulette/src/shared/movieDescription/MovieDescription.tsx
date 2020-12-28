import React from "react";
import "./MovieDescription.scss";


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

interface IMovieDecscriptionProps {
    id: string,
    movies: IMovie[]
}

class MovieDecscription extends React.Component<IMovieDecscriptionProps> {
    render() {
        console.log(this.props.id);
        console.log(this.props.movies);
        const film = this.props.movies.filter((movie) => movie.id === Number(this.props.id));

        return (
            <div className="description-container" >
                <div className="description-item">
                    <img src={film[0].poster_path} alt="poster" />
                </div>
                <div className="description-item">
                    <h1>{film[0].title}</h1>
                    <p>Oscar-winning Movies</p>
                    <div className="param-container">
                        <p className="release-year">1994</p>
                        <p className="duration">154 min</p>
                    </div>
                    <p className="summary">{film[0].overview}</p>
                </div>
            </div>
        );
    }
}




export default MovieDecscription;

