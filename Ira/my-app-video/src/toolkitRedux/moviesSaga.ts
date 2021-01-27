import {takeLatest, call, put, all} from 'redux-saga/effects';
import {queryString} from "../constants/queryString";
import {baseUrl} from "../constants/baseUrl";
import {
  fetchMovies,
  fetchMoviesSuccess,
  fetchMoviesError,
  fetchMovieById,
  fetchMovieByIdSuccess,
  initMoviePage,
  IFetchMovies,
  IFetchMovieById,
  IInitMoviePage
} from "./toolkitSlice";
import {SortBy} from "../components/sortingSection/SortingSection";
import {PayloadAction} from "@reduxjs/toolkit";


const fetchMoviesSub = () => {
  return takeLatest(fetchMovies, fetchMoviesSaga);
};

const fetchMovieByIdSub = () => {
  return takeLatest(fetchMovieById, fetchMovieByIdSaga);
};

const initMoviePageSub = () => {
  return takeLatest(initMoviePage, initMoviePageSaga);
};

function* fetchMoviesSaga(action: PayloadAction<IFetchMovies>) {
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

    yield put(fetchMoviesSuccess(
      {films: movies.data, total: movies.total}
    ));
  } catch (e) {
    yield put(fetchMoviesError());
  }
}

function* initMoviePageSaga(action: PayloadAction<IInitMoviePage>) {
  const movie = yield* fetchMovieByIdSaga(fetchMovieById({id: action.payload.id}))
  const search: string = movie.genres[0];
  const payload = {
    search: search,
    searchBy: action.payload.searchBy,
    sortBy: SortBy.release,
    page: action.payload.page
  }

  yield * fetchMoviesSaga(fetchMovies(payload));
}

function* fetchMovieByIdSaga(action: PayloadAction<IFetchMovieById>) {
  try {
    const movie = yield call(() => fetch(`${baseUrl}/movies/${action.payload.id}`).then(res => res.json()));

    yield put(fetchMovieByIdSuccess({film: movie}));
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
