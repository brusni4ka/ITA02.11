import { IMovie } from "shared/interfaces/IMovie";

export enum MoviesActionTypes {

    REQUEST_MOVIES = 'requestMovies',
    REQUEST_MOVIES_SUCCESS = 'requestMoviesSuccess',
    REQUEST_MOVIES_ERROR = 'requestMoviesError',
    RESET_MOVIES = 'resetMovies',

    SET_CURRENT_PAGE = 'setCurrentPage',

    REQUEST_MOVIE_DETAILS_DATA = 'requestMovieDetailsData',

    REQUEST_MOVIE_BY_ID = 'requestMovieById',
    REQUEST_MOVIE_BY_ID_SUCCESS = 'requestMovieByIdSuccess',
    REQUEST_MOVIE_BY_ID_ERROR = 'requestMovieByIdError'
};


export interface RequestMoviesAction {
    type: MoviesActionTypes.REQUEST_MOVIES,
    payload: {
        search: string
    }
}

export interface RequestMoviesSuccessAction {
    type: MoviesActionTypes.REQUEST_MOVIES_SUCCESS,
    payload: {
        movies: IMovie[],
        total: number,
    }
}

export interface RequestMoviesErrorAction {
    type: MoviesActionTypes.REQUEST_MOVIES_ERROR,
}

export interface RequestMovieByIdAction {
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID,
    payload: {
        id: string,
    }
}
export interface RequestMovieByIdSuccessAction {
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID_SUCCESS,
    // payload: {
    movie: IMovie,
    // }
}

export interface RequestMovieByIdErrorAction {
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID_ERROR,
}

export interface ResetMoviesAction {
    type: MoviesActionTypes.RESET_MOVIES,
}

export interface SetCurrentPageAction {
    type: MoviesActionTypes.SET_CURRENT_PAGE,
    currentPage: number
}

// requestMovieDetailsData
export interface RequestMovieDetailsDataAction {
    type: MoviesActionTypes.REQUEST_MOVIE_DETAILS_DATA,
    payload: {
        id: string,
    }
}

export type MoviesAction =
    RequestMoviesAction
    | RequestMoviesSuccessAction
    | RequestMoviesErrorAction
    | RequestMovieByIdAction
    | RequestMovieByIdSuccessAction
    | RequestMovieByIdErrorAction
    | ResetMoviesAction
    | SetCurrentPageAction
    | RequestMovieDetailsDataAction;




export const requestMovies = (search: string): RequestMoviesAction => ({
    type: MoviesActionTypes.REQUEST_MOVIES,
    payload: {
        search
    }
});

export const requestMoviesSuccess = (movies: IMovie[], total: number): RequestMoviesSuccessAction => ({
    type: MoviesActionTypes.REQUEST_MOVIES_SUCCESS,
    payload: {
        movies,
        total,
    }
});

export const requestMoviesError = (): RequestMoviesErrorAction => ({
    type: MoviesActionTypes.REQUEST_MOVIES_ERROR,
});

export const requestMovieById = (id: string): RequestMovieByIdAction => ({
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID,
    payload: {
        id,
    }
});

export const requestMovieByIdSuccess = (movie: IMovie): RequestMovieByIdSuccessAction => ({
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID_SUCCESS,
    // payload: {
    movie
    // }
});

export const requestMovieByIdError = (): RequestMovieByIdErrorAction => ({
    type: MoviesActionTypes.REQUEST_MOVIE_BY_ID_ERROR,
});

export const resetMovies = (): ResetMoviesAction => ({
    type: MoviesActionTypes.RESET_MOVIES,
});

export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({
    type: MoviesActionTypes.SET_CURRENT_PAGE,
    currentPage
});

// requestMovieDetailsData
export const requestMovieDetailsData = (id: string): RequestMovieDetailsDataAction => ({
    type: MoviesActionTypes.REQUEST_MOVIE_DETAILS_DATA,
    payload: {
        id
    }
});

