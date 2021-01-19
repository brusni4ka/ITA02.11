import { IMovie } from "shared/interfaces/IMovie";
import { MoviesActionTypes, MoviesAction } from "./moviesActions";

export interface MoviesReducerState {
    movies: IMovie[],
    loading: boolean,
    movie: IMovie,
    limit: number,
    total: number,
    currentPage: number,
}



const MoviesDefaultState = {
    movies: [],
    loading: true,
    movie: null,
    limit: 9,
    total: 0,
    currentPage: 1,
}

export const moviesReducer = (state = MoviesDefaultState, action: MoviesAction) => {
    switch (action.type) {
        case MoviesActionTypes.REQUEST_MOVIES: {
            return {
                ...state,
                loading: true
            }
        }
        case MoviesActionTypes.REQUEST_MOVIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                movies: action.payload.movies,
                total: action.payload.total,
            }
        }
        case MoviesActionTypes.REQUEST_MOVIES_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        case MoviesActionTypes.REQUEST_MOVIE_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case MoviesActionTypes.REQUEST_MOVIE_BY_ID_SUCCESS: {
            return {
                ...state,
                loading: false,
                movie: action.payload.movie,
            }
        }
        case MoviesActionTypes.REQUEST_MOVIE_BY_ID_ERROR: {
            return {
                ...state,
                loading: false
            }
        }
        case MoviesActionTypes.RESET_MOVIES: {
            return MoviesDefaultState

        }
        case MoviesActionTypes.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        // requestMovieDetailsData
        case MoviesActionTypes.REQUEST_MOVIE_DETAILS_DATA: {
            return {
                ...state,
            }
        }
        default: return state;
    }
};
