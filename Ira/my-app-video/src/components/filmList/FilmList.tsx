import React from 'react';
import FilmCard from "../filmCard";
import {IFilm} from "../../interfaces/IFilm";
import './styles.scss';

interface IFilmsProps {
  films: IFilm[],
}

export const FilmList = ({films}: IFilmsProps) => {

  return (
    <>
      {
        films.length !== 0 ?
          <main className="main">
            {films.map((film, index) => <FilmCard
              key={film.id + index}
              id={film.id}
              title={film.title}
              poster={film.poster_path}
              release={film.release_date}
              genres={film.genres}
              rating={film.vote_average}
            />)}
          </main>
          :
          <main className="main-no-result">no film found</main>
      }
    </>
  );
}
