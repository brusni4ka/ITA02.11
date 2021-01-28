import { IMovie } from "shared/interfaces/IMovie";

export interface RequestMoviesAction {
    search: string
}

export interface RequestMoviesSuccessAction {
    movies: IMovie[],
    total: number,
}

export interface RequestMovieByIdAction {
    id: string,
}

export interface RequestMovieByIdSuccessAction {
    movie: IMovie,
}

export interface RequestMovieDetailsDataAction {
    id: string,
    page: number,
}