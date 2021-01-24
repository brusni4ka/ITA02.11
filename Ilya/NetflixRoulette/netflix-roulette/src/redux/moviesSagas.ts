import {
    MoviesActionTypes,
    RequestMoviesAction,
    requestMoviesSuccess,
    requestMoviesError,
    RequestMovieByIdAction,
    requestMovieByIdSuccess,
    requestMovieByIdError,

    RequestMovieDetailsDataAction,
    requestMovieById,
    requestMovies,

} from "./moviesActions";
import { all, call, put, takeLatest } from 'redux-saga/effects';
import queryString from "query-string";

function* requestMoviesSaga(action: RequestMoviesAction) {
    let search: string = action.payload.search;
    let offset = 0;

    if (search === "") {
        search = "sortBy=release_date&offset=0";
    } else {
        let parsed = queryString.parse(search);
        if ('page' in parsed) {
            offset = (Number(parsed.page) - 1) * 9;
            delete parsed.page;
        }
        parsed.offset = String(offset);
        search = queryString.stringify({ ...parsed });
    }

    try {
        const films = yield call(() => {
            return (fetch(`https://reactjs-cdp.herokuapp.com/movies?sortOrder=desc&${search}&limit=9`)
                .then(response => response.json()));
        });

        yield put(requestMoviesSuccess(films.data, films.total));

    } catch (error) {
        yield put(requestMoviesError());
    }
}

function* requestMovieByIdSaga(action: RequestMovieByIdAction) {

    try {
        const film = yield call(() => {
            return (fetch(`https://reactjs-cdp.herokuapp.com/movies/${action.payload.id}`)
                .then(response => response.json()));
        });
        yield put(requestMovieByIdSuccess(film));
        return film;
    } catch (error) {
        yield put(requestMovieByIdError());
    }
}

//------------------ FetchMovieDetailsData
function* requestMovieDetailsDataSaga(action: RequestMovieDetailsDataAction) {
    const actionPayload = yield* requestMovieByIdSaga(requestMovieById(action.payload.id));
    const searchBySameGenre = `search=${actionPayload.genres[0]}&searchBy=genres`;
    yield* requestMoviesSaga(requestMovies(searchBySameGenre));
}
//--------------

const fetchMoviesSub = () => {
    return takeLatest(MoviesActionTypes.REQUEST_MOVIES, requestMoviesSaga);
};

const fetchMovieByIdSub = () => {
    return takeLatest(MoviesActionTypes.REQUEST_MOVIE_BY_ID, requestMovieByIdSaga);
};
const fetchMovieDetailsDataSub = () => {
    return takeLatest(MoviesActionTypes.REQUEST_MOVIE_DETAILS_DATA, requestMovieDetailsDataSaga);
};

export function* moviesSagas() {
    return yield all([
        fetchMoviesSub(),
        fetchMovieByIdSub(),
        fetchMovieDetailsDataSub(),
    ]);
}