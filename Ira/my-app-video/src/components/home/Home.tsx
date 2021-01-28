import React, {useEffect} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Header} from "../layout/header";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {SortingSection} from "../sortingSection";
import {Pagination} from "../pagination";
import {SearchFilmForm} from "../shared/searchFilmForm";
import {queryString} from "../../constants/queryString";
import {SortBy} from "../sortingSection/SortingSection";
import {RootState} from "../../toolkitRedux";
import {fetchMovies, resetMovies} from "../../toolkitRedux/toolkitSlice";
import './styles.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.store.movies);
  const location = useLocation();
  const history = useHistory();
  const params = queryString.parse(location.search) as { search: string, searchBy: string, sortBy: string, page: number };

  useEffect(() => {

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

    return () => {
      dispatch(resetMovies());
    }
    // eslint-disable-next-line
  }, [location]);

  const onSearchSubmit = ({searchValue, searchBy}: { searchValue: string, searchBy: string }): void => {
    const newParams: string = queryString.stringify({
      ...params,
      search: searchValue,
      searchBy: searchBy,
      page: 1,
    });

    history.push(`/search?${newParams}`);
  };

  const onToggleSortBy = (btnName: string): void => {
    const newParams: string = queryString.stringify({...params, sortBy: btnName, page: 1});

    history.push(`/search?${newParams}`);
  };

  const onPage = (btnId: number): void => {
    const newParams: string = queryString.stringify({...params, sortBy: params.sortBy || SortBy.release, page: btnId});

    history.push(`/search?${newParams}`);
  };

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
  );
};
