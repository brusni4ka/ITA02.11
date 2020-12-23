import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';

interface IFilmCardProps {
  id: number,
  title: string,
  poster: string,
  release: string,
  genres: string[],
  filmId: number,

  showFullFilmInfo(id: number): () => void
}

export const FilmCard = ({
                           title,
                           poster,
                           release,
                           genres,
                           id,
                           showFullFilmInfo,
                           filmId
                         }: IFilmCardProps) => {
  return (
    <Link to={`/film/${id}`}>
      <div className="card" onClick={showFullFilmInfo(filmId)}>
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
    </Link>
  );
}
