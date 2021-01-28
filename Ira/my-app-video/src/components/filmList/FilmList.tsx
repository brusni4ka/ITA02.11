import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../toolkitRedux";
import {FilmCard} from "../filmCard";
import {IFilm} from "../../interfaces/IFilm";
import loader from "../../accets/Dual Ball-1s-200px.svg";
import './styles.scss';

interface IFilmsProps {
  films: IFilm[],
}

export const FilmList = ({films}: IFilmsProps) => {
  const loading = useSelector((state: RootState) => state.store.loading);

  return (
    loading ?
      <img className="loader" src={loader} alt="loader"/>
      :
      <>
        {
          films.length !== 0 ?
            <div className="main">
              {films.map(film => <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                poster={film.poster_path}
                release={film.release_date}
                genres={film.genres}
                rating={film.vote_average}
              />)}
            </div>
            :
            <div className="main-no-result">no film found</div>
        }
      </>
  );
};
