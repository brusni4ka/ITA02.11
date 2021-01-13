import {MovieActionTypes} from "./actionTypes";
import {IFilm} from "../../interfaces/IFilm";

export interface IFetchMovies {
  type: MovieActionTypes.FETCH_MOVIES,
  payload?: {
    search: string,
    searchBy: string,
    sortBy: string,
    page?: number,
  }
}

export const fetchMovies = (payload?: {
  search: string,
  searchBy: string,
  sortBy: string,
  page?: number,
}): IFetchMovies => ({
  type: MovieActionTypes.FETCH_MOVIES,
  payload,
});

export interface IFetchMoviesSuccess {
  type: MovieActionTypes.FETCH_MOVIES_SUCCESS,
  payload: {
    films: IFilm[],
    total: number,
  }
}

export const fetchMoviesSuccess = (payload: { films: IFilm[], total: number }): IFetchMoviesSuccess => ({
  type: MovieActionTypes.FETCH_MOVIES_SUCCESS,
  payload,
});

export interface IFetchMoviesError {
  type: MovieActionTypes.FETCH_MOVIES_ERROR,
}

export const fetchMoviesError = (): IFetchMoviesError => ({
  type: MovieActionTypes.FETCH_MOVIES_ERROR,
});

export interface IFetchMovieById {
  type: MovieActionTypes.FETCH_MOVIE_BY_ID,
  payload: number,
}

export const fetchMovieById = (id: number): IFetchMovieById => ({
  type: MovieActionTypes.FETCH_MOVIE_BY_ID,
  payload: id,
});

export interface IFetchMovieByIdSuccess {
  type: MovieActionTypes.FETCH_MOVIE_BY_ID_SUCCESS,
  payload: IFilm,
}

export const fetchMovieByIdSuccess = (payload: IFilm): IFetchMovieByIdSuccess => ({
  type: MovieActionTypes.FETCH_MOVIE_BY_ID_SUCCESS,
  payload,
});

export interface IResetMovies {
  type: MovieActionTypes.RESET_MOVIES,
}

export const resetMovies = (): IResetMovies => ({
  type: MovieActionTypes.RESET_MOVIES,
});
