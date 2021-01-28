import { all, call, put, takeLatest } from 'redux-saga/effects';
import queryString from "query-string";
import { RequestMovieByIdAction, RequestMovieDetailsDataAction, RequestMoviesAction } from './moviesActionTypes';
import { requestMovieById, requestMovieByIdError, requestMovieByIdSuccess, requestMovieDetailsData, requestMovies, requestMoviesError, requestMoviesSuccess } from './moviesSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* requestMoviesSaga(action: PayloadAction<RequestMoviesAction>) {
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

        yield put(requestMoviesSuccess({ movies: films.data, total: films.total }));

    } catch (error) {
        yield put(requestMoviesError());
    }
}

function* requestMovieByIdSaga(action: PayloadAction<RequestMovieByIdAction>) {

    try {
        const film = yield call(() => {
            return (fetch(`https://reactjs-cdp.herokuapp.com/movies/${action.payload.id}`)
                .then(response => response.json()));
        });
        yield put(requestMovieByIdSuccess({ movie: film }));
        return film;
    } catch (error) {
        yield put(requestMovieByIdError());
    }
}

//------------------ FetchMovieDetailsData
function* requestMovieDetailsDataSaga(action: PayloadAction<RequestMovieDetailsDataAction>) {
    const actionPayload = yield* requestMovieByIdSaga(requestMovieById({ id: action.payload.id }));
    const searchBySameGenre = `search=${actionPayload.genres[0]}&searchBy=genres&page=${action.payload.page}`;
    yield* requestMoviesSaga(requestMovies({ search: searchBySameGenre }));
}
//--------------

const fetchMoviesSub = () => {
    return takeLatest(requestMovies.type, requestMoviesSaga);
};

const fetchMovieByIdSub = () => {
    return takeLatest(requestMovieById.type, requestMovieByIdSaga);
};
const fetchMovieDetailsDataSub = () => {
    return takeLatest(requestMovieDetailsData.type, requestMovieDetailsDataSaga);
};

export function* moviesSagas() {
    return yield all([
        fetchMoviesSub(),
        fetchMovieByIdSub(),
        fetchMovieDetailsDataSub(),
    ]);
}