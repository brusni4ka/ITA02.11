import React, {useEffect} from 'react';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import {Pagination} from "../pagination";
import {initMoviePage, resetMovies} from "../../toolkitRedux/toolkitSlice";
import {queryString} from "../../constants/queryString";
import {SearchBy} from "../shared/searchFilmForm/SearchFilmForm";
import loader from '../../accets/Dual Ball-1s-200px.svg';
import {RootState} from "../../toolkitRedux";
import './styles.scss';

export const FilmPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<{search: string}>();
  const {id} = useParams<{ id: string }>();
  const history = useHistory();
  const loading = useSelector(((state: RootState) => state.store.loading));
  const currentFilm = useSelector((state: RootState) => state.store.currentMovie);
  const movies = useSelector((state: RootState) => state.store.movies);
  const params = queryString.parse(location.search) as { page: number };

  useEffect(() => {
    dispatch(initMoviePage({page: params.page, searchBy: SearchBy.genre, id: Number(id)}));

    return () => {
      resetMovies();
    }
    // eslint-disable-next-line
  }, [location]);

  const onPage = (btnId: number) => {
    const newParams: string = queryString.stringify({page: btnId});

    history.push(`/film/${Number(id)}?${newParams}`);
  }

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
      {loading ? <img className="loader film-page-loader" src={loader} alt="loader"/> :
        <FilmList
          films={movies}
        />
      }
      <Pagination
        onPage={onPage}
      />
      <Footer/>
    </>
  );
};
