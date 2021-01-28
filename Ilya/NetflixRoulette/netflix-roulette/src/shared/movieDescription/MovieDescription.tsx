import "./MovieDescription.scss";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieDecscriptionProps {
    film: IMovie
}

function MovieDecscription(props: IMovieDecscriptionProps) {
    return (
        <div className="description-container" >
            <div className="description-item">
                <img src={props.film.poster_path} alt="poster" />
            </div>
            <div className="description-item">
                <h3>{props.film.title}</h3>
                <p>{props.film.tagline}</p>
                <div className="param-container">
                    <p className="release-year">{(props.film.release_date).slice(0, 4)}</p>
                    <p className="duration">{props.film.runtime} min</p>
                </div>
                <p className="summary">{props.film.overview}</p>
            </div>
        </div>
    );
}

export default MovieDecscription;

