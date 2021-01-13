import { all } from 'redux-saga/effects';
import {moviesSagas} from "./movies/movieSaga";

export default function* rootSaga() {
  yield all([
    moviesSagas(),
  ]);
}