import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import Pagination from "../pagination";
import {filmPageConnectProps} from "./index";
import './styles.scss';

type FilmPageProps = RouteComponentProps<{ id: string }> & filmPageConnectProps;

export class FilmPage extends React.Component<FilmPageProps> {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchMoviesById(Number(id));
  }

  componentWillUnmount() {
    this.props.resetMovies();
  }

  render() {
    const {
      movies,
      currentFilm,
    } = this.props;

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
            <FullInfoFilmCard film={currentFilm}/>
          </div>
        </div>
        <FilmList
          films={movies}
        />
        <Pagination />
        <Footer/>
      </>
    );
  };
}
