import React from 'react';
import {Link} from 'react-router-dom';
import {filmCardConnectProps} from "./index";
import './styles.scss';

interface IFilmCardProps {
  id: number,
  title: string,
  poster: string,
  release: string,
  rating: number,

  genres: string[],
}

export const FilmCard = ({
                           title,
                           poster,
                           release,
                           genres,
                           id,
                           rating,
                           fetchMoviesById,
                         }: IFilmCardProps & filmCardConnectProps) => {

  return (
    <Link to={`/film/${id}`}>
      <div className="card"
           onClick={() => {
             fetchMoviesById(id);
           }}
      >
        <img className="poster" src={poster} alt="poster"/>
        <div className="section-about">
          <div className="film-info">
            <span className="film-title">{title}</span>
            <span className="film-genres">
              {genres.map(genre => <span key={genre} className="film-genre">{genre}</span>)}
            </span>
          </div>
          <div className="film-rating-info">
            <span className="release">{release}</span>
            <span className="film-rating">Rating {rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
