import React from 'react';
import {FilmCard} from "../filmCard";
import {IFilm} from "../../interfaces/IFilm";
import './styles.scss';

interface IFilmsProps {
  films: IFilm[],
  filmId: number,

  showFullFilmInfo(id: number): () => void,
}

export const FilmList = ({films, showFullFilmInfo, filmId}: IFilmsProps) => {
  return (
    <>
      {
        films.length !== 0 ?
          <main className="main">
            {films.map(film =>
              <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                poster={film.poster_path}
                release={film.release_date}
                genres={film.genres}
                showFullFilmInfo={showFullFilmInfo}
                filmId={filmId}
              />)}
          </main>
          :
          <main className="main-no-result">no film found</main>
      }
    </>
  );
}
