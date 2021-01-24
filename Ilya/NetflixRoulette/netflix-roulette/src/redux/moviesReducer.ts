import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "shared/interfaces/IMovie";
import { RequestMovieByIdAction, RequestMovieByIdSuccessAction, RequestMovieDetailsDataAction, RequestMoviesAction, RequestMoviesSuccessAction, SetCurrentPageAction } from "./moviesActionTypes";

export interface MoviesDefaultState {
    movies: IMovie[],
    loading: boolean,
    movie: IMovie,
    limit: number,
    total: number,
    currentPage: number,
}

const moviesDefaultState: MoviesDefaultState = {
    movies: [],
    loading: true,
    movie: {
        id: 0,
        title: '',
        tagline: '',
        vote_average: 0,
        vote_count: 0,
        release_date: '',
        poster_path: '',
        overview: '',
        budget: 0,
        revenue: 0,
        runtime: 0,
        genres: []
    },
    limit: 9,
    total: 0,
    currentPage: 1,
}

const moviesSlice = createSlice({
    name: "moviesSlice",
    moviesDefaultState,
    reducers: {
        requestMovies(state: MoviesDefaultState, action: PayloadAction<RequestMoviesAction>) {
            state.loading = true;
        },
        requestMoviesSuccess(state: MoviesDefaultState, action: PayloadAction<RequestMoviesSuccessAction>) {
            state.loading = false;
            state.movies = action.payload.movies;
            state.total = action.payload.total;
        },
        requestMoviesError(state: MoviesDefaultState) {
            state.loading = false;
        },
        requestMovieById(state: MoviesDefaultState, action: PayloadAction<RequestMovieByIdAction>) {
            state.loading = false;
        },
        requestMovieByIdSuccess(state: MoviesDefaultState, action: PayloadAction<RequestMovieByIdSuccessAction>) {
            state.loading = false;
            state.movie = action.payload.movie;
        },
        requestMovieByIdError(state: MoviesDefaultState) {
            state.loading = false;
        },
        resetMovies() {
            return moviesDefaultState;
        },
        setCurrentPage(state: MoviesDefaultState, action: PayloadAction<SetCurrentPageAction>) {
            state.currentPage = action.payload.currentPage;
        },
        requestMovieDetailsData(state: MoviesDefaultState, action: PayloadAction<RequestMovieDetailsDataAction>) {
            return state;
        },
    }
});
const { actions, reducer } = moviesSlice;

export const {
    requestMovies,
    requestMoviesSuccess,
    requestMoviesError,
    requestMovieById,
    requestMovieByIdSuccess,
    requestMovieByIdError,
    resetMovies,
    setCurrentPage,
    requestMovieDetailsData
} = actions;
export default reducer;

