import React from 'react';
import {Header} from "../layout/header";
import SearchFilmForm from "../shared/searchFilmForm";
import {IFilm} from "../../interfaces/IFilm";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {SearchResultSection} from "../searchResultSection";
import {RouteComponentProps} from "react-router-dom";
import './styles.scss';

const queryString = require('query-string');

interface IOwnProps {
  stateSortByBtn: string,
  result: number,
  films: IFilm[],

  showFullFilmInfo(id: number): () => void,

  sortBy(e: string): void,
}

interface IPathname {
  sortBy?: string,
  searchBy?: string,
}

interface IHomeState {
  searchValue: string,
  searchBy: string,
  pathParams: IPathname,
}

type HomeProps = RouteComponentProps & IOwnProps;

export class Home extends React.Component<HomeProps, IHomeState> {
  state: IHomeState = {
    searchValue: '',
    searchBy: '',
    pathParams: {},
  }

  componentDidUpdate(prevProps: Readonly<HomeProps>, prevState: Readonly<IHomeState>, snapshot?: any) {

    if (prevProps.stateSortByBtn !== this.props.stateSortByBtn) {
      this.setState({
        pathParams: {
          sortBy: this.props.stateSortByBtn
        }
      });
    }

    if (prevState.searchBy !== this.state.searchBy) {
      this.setState({
        pathParams: {
          searchBy: this.state.searchBy,
        }
      });
    }
  };

  getFormState = ({searchValue, searchBy}: { searchValue: string, searchBy: string }): void => {
    this.setState({
      searchValue,
      searchBy,
    })
  }

  render() {
    const params = queryString.parse(this.props.location.search);
    const history = this.props.history;
    const searchValueFromUrl: string = params.search;
    const {
      showFullFilmInfo,
      sortBy,
      stateSortByBtn,
      result,
      films,
    }: HomeProps = this.props;
    const sortByParam: string = params.sortBy;

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
              pathParams={this.state.pathParams}
              searchValueFromUrl={searchValueFromUrl}
              getFormState={this.getFormState}
            />
          </div>
        </div>
        <SearchResultSection
          history={history}
          stateSortByBtn={stateSortByBtn}
          sortBy={sortBy}
          result={result}
          sortByParam={sortByParam}
          searchValue={this.state.searchValue}
          searchBy={this.state.searchBy}
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
