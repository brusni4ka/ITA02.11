import {takeLatest, call, put, all} from 'redux-saga/effects';
import {MovieActionTypes} from "./actionTypes";
import {baseUrl} from "../../constants/baseUrl";
import {
  fetchMoviesSuccess,
  fetchMoviesError,
  IFetchMovies,
  IFetchMovieById,
  fetchMovieByIdSuccess,
} from "./actions";

function* fetchMoviesSaga(action: IFetchMovies) {
  const limit = 9;
  const page = (action.payload?.page || 1) - 1;
  const offset: number = page * limit + 1;
  let url = `${baseUrl}/movies?limit=${limit}&offset=${offset}&sortOrder=desc`;

  if (action.payload === undefined) {
    url += `&sortBy=release_date`;
  }

  if (action.payload?.search) {
    url += `&search=${action.payload?.search}`;
  }

  if (action.payload?.searchBy) {
    url += `&searchBy=${action.payload?.searchBy}`;
  }

  if (action.payload?.sortBy) {
    url += `&sortBy=${action.payload?.sortBy}`;
  }
  
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

const fetchMoviesSub = () => {
  return takeLatest(MovieActionTypes.FETCH_MOVIES, fetchMoviesSaga);
}

function* fetchMovieByIdSaga(action: IFetchMovieById) {

  try {
    const movie = yield call(() => fetch(`${baseUrl}/movies/${action.payload}`).then(res => res.json()));

    yield put(fetchMovieByIdSuccess(movie));

    const search = movie.genres[0];
    const url = `${baseUrl}/movies?limit=9&search=${search}&searchBy=genres&sortBy=release_date`;
    const sortedMovies = yield call(() => fetch(`${url}`).then(res => res.json()));

    yield put(fetchMoviesSuccess({films: sortedMovies.data, total: sortedMovies.total}));

  } catch (e) {
    yield put(fetchMoviesError());
  }
}

const fetchMovieByIdSub = () => {
  return takeLatest(MovieActionTypes.FETCH_MOVIE_BY_ID, fetchMovieByIdSaga);
}

export function* moviesSagas() {
  yield all([
    fetchMoviesSub(),
    fetchMovieByIdSub(),
  ]);
}