import { createStore, combineReducers, applyMiddleware } from 'redux';
import { moviesReducer, MoviesReducerState } from "redux/moviesReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'rootSaga';

const rootReducer = combineReducers({
    moviesStore: moviesReducer,
});


export interface RootState {
    moviesStore: MoviesReducerState,
}

const composeEnhancers = composeWithDevTools({ trace: true });
const sagaMiddleware = createSagaMiddleware();



const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export default store;