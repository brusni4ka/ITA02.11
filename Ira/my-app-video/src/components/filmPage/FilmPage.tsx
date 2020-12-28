import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import {IFilm} from "../../interfaces/IFilm";
import './styles.scss';

interface IOwnProps {
  films: IFilm[],

  showFullFilmInfo(id: number): () => void,
}

//type TParams = { id: string };

type FilmPageProps = RouteComponentProps<any> & IOwnProps;

export class FilmPage extends React.Component<FilmPageProps> {

  render() {

    const filmId: number = +this.props.match.params.id;

    const {
      films,
      showFullFilmInfo,
    }: IOwnProps = this.props;

    const currentFilm: IFilm[] = films.filter((film) => film.id === +filmId);

    return (
      <>
        <div className="header-container">
          <div className="header-content">
            <Header/>
            <Button
              title="search"
              className="btn btn-return-to-home"
              isLink
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
