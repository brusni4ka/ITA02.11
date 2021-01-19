import {takeLatest, call, put, all} from 'redux-saga/effects';
import {queryString} from "../../constants/queryString";
import {MovieActionTypes} from "./actionTypes";
import {baseUrl} from "../../constants/baseUrl";
import {
  fetchMoviesSuccess,
  fetchMoviesError,
  IFetchMovies,
  IFetchMovieById,
  fetchMovieByIdSuccess, fetchMovieById, IInitMoviePage, fetchMovies,
} from "./actions";
import {SortBy} from "../../components/sortingSection/SortingSection";

const fetchMoviesSub = () => {
  return takeLatest(MovieActionTypes.FETCH_MOVIES, fetchMoviesSaga);
};

const fetchMovieByIdSub = () => {
  return takeLatest(MovieActionTypes.FETCH_MOVIE_BY_ID, fetchMovieByIdSaga);
};

const initMoviePageSub = () => {
  return takeLatest(MovieActionTypes.INIT_MOVIE_PAGE, initMoviePageSaga);
};

function* fetchMoviesSaga(action: IFetchMovies) {
  const limit = 9;
  const {page = 1, ...restParams} = action.payload;
  const offset: number = (page - 1) * limit + 1;
  const urlParams = queryString.stringify(restParams);
  let url = `${baseUrl}/movies?limit=${limit}&${urlParams}&offset=${offset}&sortOrder=desc`;

  if (action.payload?.searchBy === 'title') {
    url = `${baseUrl}/movies?limit=${limit}&search=${action.payload?.search}&searchBy=${action.payload?.searchBy}`;
  }

  try {
    const movies = yield call(() => fetch(`${url}`).then(res => res.json()));

    yield put(fetchMoviesSuccess({films: movies.data, total: movies.total}));
  } catch (e) {
    yield put(fetchMoviesError());
  }
}

function* initMoviePageSaga(action: IInitMoviePage) {
  const movie = yield* fetchMovieByIdSaga(fetchMovieById(action.payload.id))
  const search: string = movie.genres[0].toLowerCase();
  //console.log('search', search)
  yield* fetchMoviesSaga(fetchMovies({
    search: search,
    searchBy: action.payload.searchBy,
    sortBy: SortBy.release,
    page: action.payload.page
  }));
}

function* fetchMovieByIdSaga(action: IFetchMovieById) {
  try {
    const movie = yield call(() => fetch(`${baseUrl}/movies/${action.payload}`).then(res => res.json()));

    yield put(fetchMovieByIdSuccess(movie));
    return movie;

  } catch (e) {
    yield put(fetchMoviesError());
  }
}

export function* moviesSagas() {
  yield all([
    fetchMoviesSub(),
    fetchMovieByIdSub(),
    initMoviePageSub(),
  ]);
}
