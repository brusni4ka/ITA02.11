import { IMovie } from "shared/interfaces/IMovie";

export interface RequestMoviesAction {
    search: string
}

export interface RequestMoviesSuccessAction {
    movies: IMovie[],
    total: number,
}

// export interface RequestMoviesErrorAction {
// }

export interface RequestMovieByIdAction {
    id: string,
}
export interface RequestMovieByIdSuccessAction {
    movie: IMovie,
}

// export interface RequestMovieByIdErrorAction {
// }

// export interface ResetMoviesAction {
// }

export interface SetCurrentPageAction {
    currentPage: number
}

// requestMovieDetailsData
export interface RequestMovieDetailsDataAction {
    id: string,
}