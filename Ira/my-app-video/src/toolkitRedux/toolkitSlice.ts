import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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

export interface IFetchMovies {
  search?: string,
  searchBy?: string,
  sortBy: string,
  page?: number,
}

export interface IFetchMoviesSuccess {
  films: IFilm[],
  total: number,
}

export interface IFetchMovieById {
  id: number
}

export interface IFetchMovieByIdSuccess {
  film: IFilm,
}

export interface IInitMoviePage {
  searchBy?: string,
  page?: number,
  id: number,
}

export const moviesToolkitSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      fetchMovies(state: IMovieInitialState, action: PayloadAction<IFetchMovies>) {
        state.loading = true;
      },
      fetchMoviesSuccess(state: IMovieInitialState, action: PayloadAction<IFetchMoviesSuccess>) {
        state.movies = [...action.payload.films];
        state.totalMovies = action.payload.total;
        state.loading = false;
      },
      fetchMoviesError(state: IMovieInitialState) {
        state.loading = false;
      },
      fetchMovieById(state: IMovieInitialState, action: PayloadAction<IFetchMovieById>) {
        state.loading = true;
      },
      fetchMovieByIdSuccess(state: IMovieInitialState, action: PayloadAction<IFetchMovieByIdSuccess>) {
        state.currentMovie = action.payload.film;
        state.loading = false;
      },
      initMoviePage(state: IMovieInitialState, action: PayloadAction<IInitMoviePage>) {
        state.loading = true;
      },
      resetMovies() {
        return initialState;
      },
    },
  }
);

export const {
  fetchMovies,
  fetchMoviesSuccess,
  fetchMoviesError,
  fetchMovieById,
  fetchMovieByIdSuccess,
  resetMovies,
  initMoviePage,
} = moviesToolkitSlice.actions;

export const {reducer} = moviesToolkitSlice;
