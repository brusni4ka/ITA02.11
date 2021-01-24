import {createAction, createReducer} from "@reduxjs/toolkit";
import {IFilm} from "../interfaces/IFilm";

export interface IMovieInitialState {
  movies: IFilm[],
  loading: boolean,
  currentMovie: IFilm | null,
  totalMovies: number,
}

const initialState: IMovieInitialState = {
  movies: [],
  loading: false,
  currentMovie: null,
  totalMovies: 0,
};

interface IFetchMovies {
  search?: string,
  searchBy?: string,
  sortBy: string,
  page?: number,
}

interface IFetchMoviesSuccess {
  payload: {
    films: [],
    total: number,
  }
}

interface IFetchMovieById {
  id: number,
}

interface IFetchMovieByIdSuccess {
  payload: IFilm,
}

export interface IInitMoviePage {
  searchBy?: string,
  page?: number,
  id: number,
}

function withPayloadType<T>() {
  return (t: T) => ({payload: t})
}

const fetchMovies = createAction('FETCH_MOVIES',
  withPayloadType<IFetchMovies>());

const fetchMoviesSuccess = createAction('FETCH_MOVIES_SUCCESS',
  withPayloadType<IFetchMoviesSuccess>());

const fetchMoviesError = createAction('FETCH_MOVIES_ERROR');

const fetchMovieById = createAction('FETCH_MOVIE_BY_ID',
  withPayloadType<IFetchMovieById>());

const fetchMovieByIdSuccess = createAction('FETCH_MOVIE_BY_ID_SUCCESS',
  withPayloadType<IFetchMovieByIdSuccess>());

const resetMovies = createAction('RESET_MOVIES');

export const moviesReducer = createReducer(initialState, {
  [fetchMovies.type]: (state: IMovieInitialState) => ({
    ...state,
    loading: true,
  }),
  [fetchMoviesSuccess.type]: (state: IMovieInitialState, action: IFetchMoviesSuccess) => {
    const {films, total} = action.payload;
    return {
      ...state,
      movies: [...films],
      totalMovies: total,
      loading: false,
    }
  },
  [fetchMoviesError.type]: (state: IMovieInitialState) => ({
    ...state,
    loading: false,
  }),
  [fetchMovieById.type]: (state: IMovieInitialState) => ({
    ...state,
    loading: true,
  }),
  [fetchMovieByIdSuccess.type]: (state: IMovieInitialState, action: IFetchMovieByIdSuccess) => ({
    ...state,
    currentMovie: action.payload,
    loading: false,
  }),
  [resetMovies.type]: () => {
    return initialState;
  },
});
