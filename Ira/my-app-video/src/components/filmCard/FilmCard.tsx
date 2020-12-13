import React from 'react';
import {IFilmCardProps} from "../../interfaces/IFilmCardProps";
import './styles.scss';

export const FilmCard = ({
                           title,
                           poster,
                           release,
                           genres,
                           id,
                           showFullFilmInfo,
                         }: IFilmCardProps) => {
  return (
    <div className="card" onClick={showFullFilmInfo(id)}>
      <img className="poster" src={poster} alt="poster"/>
      <div className="section-about">
        <div className="film-info">
          <span className="film-title">{title}</span>
          <span className="film-genres">
            {genres.map(genre => <span key={genre} className="film-genre">{genre}</span>)}
          </span>
        </div>
        <span className="release">{release}</span>
      </div>
    </div>
  );
}
