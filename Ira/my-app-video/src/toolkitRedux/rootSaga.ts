import { all } from 'redux-saga/effects';
import {moviesSagas} from "./moviesSaga";

export default function* rootSaga() {
  yield all([
    moviesSagas(),
  ]);
}