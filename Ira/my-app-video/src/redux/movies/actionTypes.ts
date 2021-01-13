import {
  IFetchMovies,
  IFetchMoviesSuccess,
  IFetchMoviesError,
  IFetchMovieById,
  IFetchMovieByIdSuccess,
  IResetMovies,
} from "./actions";

export enum MovieActionTypes {
  FETCH_MOVIES = 'FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR',
  FETCH_MOVIE_BY_ID = 'FETCH_MOVIE_BY_ID',
  FETCH_MOVIE_BY_ID_SUCCESS = 'FETCH_MOVIE_BY_ID_SUCCESS',
  RESET_MOVIES = 'RESET_MOVIES',
}

export type moviesAction =
  IFetchMovies
  | IFetchMoviesSuccess
  | IFetchMoviesError
  | IFetchMovieById
  | IFetchMovieByIdSuccess
  | IResetMovies;
