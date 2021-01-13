import {IFilm} from "../../interfaces/IFilm";
import {MovieActionTypes, moviesAction} from "./actionTypes";

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

export const MovieReducer = (state = initialState, action: moviesAction) => {
  switch (action.type) {
    case MovieActionTypes.FETCH_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case MovieActionTypes.FETCH_MOVIES_SUCCESS: {
      const {films, total} = action.payload;

      return {
        ...state,
        movies: [...films],
        totalMovies: total,
        loading: false,
      };
    }

    case MovieActionTypes.FETCH_MOVIES_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case MovieActionTypes.FETCH_MOVIE_BY_ID: {
      return {
        ...state,
        loading: true,
      };
    }

    case MovieActionTypes.FETCH_MOVIE_BY_ID_SUCCESS: {
      return {
        ...state,
        currentMovie: action.payload,
        loading: false,
      };
    }

    case MovieActionTypes.RESET_MOVIES: {
      return initialState;
    }

    default:
      return state;
  }
};