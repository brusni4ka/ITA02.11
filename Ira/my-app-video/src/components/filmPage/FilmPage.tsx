import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import Pagination from "../pagination";
import {filmPageConnectProps} from "./index";
import {queryString} from "../../constants/queryString";
import {SortBy} from "../sortingSection/SortingSection";
import {SearchBy} from "../shared/searchFilmForm/SearchFilmForm";
import './styles.scss';

type FilmPageProps = RouteComponentProps<{ id: string }> & filmPageConnectProps;

export class FilmPage extends React.Component<FilmPageProps> {
  componentDidMount() {
    this.initPage();
  }

  componentDidUpdate(prevProps: Readonly<FilmPageProps>) {
    // eslint-disable-next-line no-mixed-operators
    if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location || this.props.location.pathname !== prevProps.location.pathname) {
      this.initPage();
    }
  };

  componentWillUnmount() {
    this.props.resetMovies();
  }

  getParams = (): { search: string, searchBy: string, sortBy: string, page: number } => {
    return queryString.parse(this.props.location.search) as
      { search: string, searchBy: string, sortBy: string, page: number };
  }

  initPage = (): void => {
    const id = this.props.match.params.id;
    const params = this.getParams();

    this.props.initMoviePage({page: params.page, searchBy: params.searchBy || SearchBy.genre, id: Number(id)});
  }

  onPage = (btnId: number) => {
    const params = this.getParams();
    let genre: string = '';

    if (this.props.currentFilm) {
      genre = this.props.currentFilm.genres[0].toLocaleLowerCase();
    }

    const newParams: string = queryString.stringify({searchBy: SearchBy.genre, page: btnId});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: genre, searchBy: SearchBy.genre, sortBy: SortBy.release, page: btnId || params.page
    };
    const id = this.props.match.params.id;
    this.props.history.push(`/film/${id}?${newParams}`);
    this.props.fetchMovies(payLoadParams);
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
        <Pagination
          onPage={this.onPage}
        />
        <Footer/>
      </>
    );
  };
}
