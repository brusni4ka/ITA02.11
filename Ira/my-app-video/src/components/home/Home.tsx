import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Header} from "../layout/header";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {SortingSection} from "../sortingSection";
import Pagination from "../pagination";
import SearchFilmForm from "../shared/searchFilmForm";
import {queryString} from "../../constants/queryString";
import {movieConnectProps} from "./index";
import loader from '../../accets/Dual Ball-1s-200px.svg';
import {SortBy} from "../sortingSection/SortingSection";
import './styles.scss';

type HomeProps = RouteComponentProps & movieConnectProps;

export class Home extends React.Component<HomeProps> {

  componentDidMount() {
    this.getMovies();
  };

  componentWillUnmount() {
    this.props.resetMovies();
  }

  componentDidUpdate(prevProps: Readonly<HomeProps>) {
    if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location) {
      this.getMovies();
    }
  };

  getMovies = () => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };

    if (Object.keys(params).length === 0) {
      this.props.fetchMovies( {sortBy: SortBy.release});
    } else {
      this.props.fetchMovies({
        search: params.search,
        searchBy: params.searchBy,
        sortBy: params.sortBy || SortBy.release,
        page: Number(params.page) || 1,
      });
    }
  };

  onSearchSubmit = ({searchValue, searchBy}: { searchValue: string, searchBy: string}): void => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };

    const newParams: string = queryString.stringify({
      ...params,
      search: searchValue,
      searchBy: searchBy,
    });

    this.props.history.push(`/search?${newParams}`);

    this.props.fetchMovies({
      search: searchValue,
      searchBy: searchBy,
      sortBy: params.sortBy || SortBy.release,
    });
  };

  onToggleSortBy = (btnName: string) => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };

    const newParams: string = queryString.stringify({...params, sortBy: btnName, page: 1});

    this.props.history.push(`/search?${newParams}`);
    this.props.fetchMovies({
      search: params.search,
      searchBy: params.searchBy,
      sortBy: btnName,
      page: 1,
    });
  }

  onPage = (btnId: number) => {
    // console.log('id', btnId)
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };

    const newParams: string = queryString.stringify({...params, page: btnId});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: params.search, searchBy: params.searchBy, sortBy: params.sortBy || 'release_date', page: btnId
    };

    this.props.history.push(`/search?${newParams}`);
    this.props.fetchMovies(payLoadParams);
  }

  render() {
    const {
      movies,
      loading,
    }: HomeProps = this.props;

    const params: { sortBy?: string } =
      queryString.parse(this.props.location.search) as { sortBy: string };

    return (loading ?
        <img className="loader" src={loader} alt="loader"/>
        : (
          <>
            <div className="header-container">
              <div className="header-content">
                <Header/>
              </div>
            </div>
            <div className="top-header-section">
              <div className="search-result-content">
                <SearchFilmForm
                  onSearchSubmit={this.onSearchSubmit}
                />
              </div>
            </div>
            <SortingSection
              sortBy={params.sortBy || SortBy.release}
              result={movies.length}
              onToggleSortBy={this.onToggleSortBy}
            />
            <FilmList
              films={movies}
            />
            <Pagination
              onPage={this.onPage}
            />
            <Footer/>
          </>
        )
    );
  };
}
