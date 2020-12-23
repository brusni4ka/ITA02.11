import React from 'react';
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {IFilm} from "../../interfaces/IFilm";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import './styles.scss';

interface IFilmPageProps {
  films: IFilm[],
  match: any,

  showFullFilmInfo(id: number): () => void,
}

export class FilmPage extends React.Component<IFilmPageProps> {

  render() {

    const filmId: number = this.props.match.params.id;

    const {
      films,
      showFullFilmInfo,
    }: IFilmPageProps = this.props;

    const currentFilm: IFilm[] = films.filter((film) => film.id === +filmId);

    return (
      <>
        <div className="header-container">
          <div className="header-content">
            <Header/>
            <Button
              title="search"
              className="btn btn-return-to-home"
              isLink={true}
              to="/"
            />
          </div>
        </div>
        <div className="top-header-section">
          <div className="search-result-content">
            <FullInfoFilmCard film={currentFilm[0]}/>
          </div>
        </div>
        <FilmList
          films={films}
          showFullFilmInfo={showFullFilmInfo}
          filmId={filmId}

        />
        <Footer/>
      </>
    );
  };
}
