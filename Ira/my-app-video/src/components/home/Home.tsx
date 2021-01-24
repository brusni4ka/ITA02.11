import React, {useEffect} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Header} from "../layout/header";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {SortingSection} from "../sortingSection";
import Pagination from "../pagination";
import SearchFilmForm from "../shared/searchFilmForm";
import {queryString} from "../../constants/queryString";
import loader from '../../accets/Dual Ball-1s-200px.svg';
import {SortBy} from "../sortingSection/SortingSection";
import {RootState} from "../../toolkitRedux";
import {fetchMovies, resetMovies} from "../../toolkitRedux/toolkitSlice";
import './styles.scss';

export const Home = () => {

  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.store.movies);
  const loading = useSelector((state: RootState) => state.store.loading);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getMovies();
    return () => {
      dispatch(resetMovies());
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, [location]);

  // componentDidUpdate(prevProps: Readonly<HomeProps>) {
  //   if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location) {
  //     this.getMovies();
  //   }
  // };

  const getParams = (): { search: string, searchBy: string, sortBy: string, page: number } => {
    return queryString.parse(location.search) as
      { search: string, searchBy: string, sortBy: string, page: number };
  }

  const params = getParams();

  const getMovies = (): void => {
    if (Object.keys(params).length === 0) {
      dispatch(fetchMovies({sortBy: SortBy.release}))
    } else {
      dispatch(
        fetchMovies({
          search: params.search,
          searchBy: params.searchBy,
          sortBy: params.sortBy || SortBy.release,
          page: Number(params.page) || 1,
        })
      )
    }
  };

  const onSearchSubmit = ({searchValue, searchBy}: { searchValue: string, searchBy: string }): void => {
    const newParams: string = queryString.stringify({
      ...params,
      search: searchValue,
      searchBy: searchBy,
      page: 1,
    });

    history.push(`/search?${newParams}`);

    dispatch(fetchMovies({
      search: searchValue,
      searchBy: searchBy,
      sortBy: params.sortBy || SortBy.release,
    }))
  };

  const onToggleSortBy = (btnName: string): void => {
    const newParams: string = queryString.stringify({...params, sortBy: btnName, page: 1});

    history.push(`/search?${newParams}`);

    dispatch(fetchMovies({
      search: params.search,
      searchBy: params.searchBy,
      sortBy: btnName,
      page: 1,
    }))
  };

  const onPage = (btnId: number): void => {
    const newParams: string = queryString.stringify({...params, sortBy: params.sortBy || 'release_date', page: btnId});

    history.push(`/search?${newParams}`);
    dispatch(fetchMovies({...params, sortBy: params.sortBy || 'release_date', page: btnId}))
  };

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
                onSearchSubmit={onSearchSubmit}
              />
            </div>
          </div>
          <SortingSection
            sortBy={params.sortBy || SortBy.release}
            result={movies.length}
            onToggleSortBy={onToggleSortBy}
          />
          <FilmList
            films={movies}
          />
          <Pagination
            onPage={onPage}
          />
          <Footer/>
        </>
      )
  );
}
