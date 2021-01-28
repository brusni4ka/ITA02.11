import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {IMovieInitialState, MoviesReducer} from "./movies/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "./rootSaga";


export interface IRootState {
  moviesState: IMovieInitialState,
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  moviesState: MoviesReducer,
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
