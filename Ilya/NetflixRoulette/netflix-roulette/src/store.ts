import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { MoviesDefaultState } from 'redux/moviesReducer';
import { rootReducer } from 'redux/rootReducer';
import rootSaga from 'rootSaga';

export interface RootState {
    store: MoviesDefaultState,
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;