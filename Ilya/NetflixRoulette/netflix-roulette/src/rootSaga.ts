import { moviesSagas } from "redux/moviesSagas";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        moviesSagas()
    ])
}