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
  payload: {
    search?: string,
    searchBy?: string,
    sortBy: string,
    page?: number,
  }
}

export interface IFetchMoviesSuccess {
  payload: {
    films: IFilm[],
    total: number,
  }
}

export interface IFetchMovieById {
  payload: {
    id: number,
  }
}

export interface IFetchMovieByIdSuccess {
  payload: {
    film: IFilm,
  }
}

export interface IInitMoviePage {
  payload: {
  searchBy?: string,
  page?: number,
  id: number,
  }
}

export const moviesToolkitSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      fetchMovies(state: IMovieInitialState, action: IFetchMovies) {
        state.loading = true;
      },
      fetchMoviesSuccess(state: IMovieInitialState, action: IFetchMoviesSuccess) {
        state.movies = [...action.payload.films];
        state.totalMovies = action.payload.total;
        state.loading = false;
      },
      fetchMoviesError(state: IMovieInitialState) {
        state.loading = false;
      },
      fetchMovieById(state: IMovieInitialState, action: IFetchMovieById) {
        state.loading = true;
      },
      fetchMovieByIdSuccess(state: IMovieInitialState, action: IFetchMovieByIdSuccess) {
        state.currentMovie = action.payload.film;
        state.loading = false;
      },
      initMoviePage(state: IMovieInitialState, action: IInitMoviePage) {
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
