import React from 'react';
import {IFilm} from "../../interfaces/IFilm";
import './styles.scss';

export interface IFullInfoFilmCardProps {
  film: IFilm,
}

export const FullInfoFilmCard = ({film} : IFullInfoFilmCardProps) => {

  return (
    <section className="full-info-film-card">
      <img className="film-poster" src={film.poster_path} alt="poster"/>
      <div className="section-info">
        <h2 className="film-title-card">{film.title}</h2>
        <h4 className="film-subtitle">{film.tagline}</h4>
        <div className="more-info">
          <span className="film-release">{film.release_date}</span>
          <span className="film-duration">{film.runtime} min</span>
        </div>
        <p className="film-description">{film.overview}</p>
      </div>
    </section>
  )
}