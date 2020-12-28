import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Header} from "../layout/header";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {SearchResultSection} from "../searchResultSection";
import SearchFilmForm from "../shared/searchFilmForm";
import {IFilm} from "../../interfaces/IFilm";
import {queryString} from "../../constants/queryString";
import './styles.scss';

interface IOwnProps {
  result: number,
  films: IFilm[],

  showFullFilmInfo(id: number): () => void,

}

interface IHomeState {
  sortBy: string,
}

type HomeProps = RouteComponentProps & IOwnProps;

export class Home extends React.Component<HomeProps, IHomeState> {
  state: IHomeState = {
    sortBy: 'release',
  };

  componentDidMount() {
    const locationSearch = this.props.location.search;
    const params = queryString.parse(locationSearch);

    this.setState({
      sortBy: params.sortBy || 'release',
    });
  }

  componentDidUpdate(prevProps: Readonly<HomeProps>) {
    if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location) {
      const params = queryString.parse(this.props.location.search) as { search: string, searchBy: string, sortBy: string };
      params.sortBy = params.sortBy || 'release';

      this.setState({sortBy: params.sortBy});
    }
  };

  onSearchSubmit = ({searchValue, searchBy}: { searchValue: string, searchBy: string }): void => {

    const pathname: string = `/search?search=${searchValue}&searchBy=${searchBy}`;

    this.props.history.push(pathname);
  };

  onToggleSortBy = (btnName: string) => {
    this.setState({
      sortBy: btnName,
    });

    const params = queryString.parse(this.props.location.search);
    const newParams = queryString.stringify({...params, sortBy: btnName});
    this.props.history.push(`/search?${newParams}`);
  }

  render() {
    const {
      showFullFilmInfo,
      result,
      films,
    }: HomeProps = this.props;

    return (
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
        <SearchResultSection
          stateSortByBtn={this.state.sortBy}
          result={result}
          onToggleSortBy={this.onToggleSortBy}
        />
        <FilmList
          films={films}
          showFullFilmInfo={showFullFilmInfo}
          filmId={1}
        />
        <Footer/>
      </>
    );
  };
}
