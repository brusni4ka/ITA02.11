import "./MovieCard.scss";
import { IMovie } from 'shared/interfaces/IMovie';

interface IMovieCardOwnProps {
    film: IMovie,
}
type IMovieCardProps = IMovieCardOwnProps;

function MovieCard(props: IMovieCardProps) {

    return (
        <div className="movie-card">
            <img src={props.film.poster_path} alt={props.film.title} />
            <div className="information">
                <h3 className="movie-name">{props.film.title}</h3>
                <div className="realese-year">{props.film.release_date.slice(0, 4)}</div>
            </div>
            <p>{props.film.genres.map((elem) => {
                return (
                    <span key={elem} className='movie-genres'>{elem}</span>
                );
            })}</p>
            <div className='rating'>{props.film.vote_average}</div>
        </div>
    );
}

export default MovieCard;