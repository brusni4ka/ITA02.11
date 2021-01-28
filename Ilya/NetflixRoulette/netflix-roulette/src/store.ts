import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducer } from 'redux/moviesSlice';
import rootSaga from 'rootSaga';

export const rootReducer = combineReducers({
    store: reducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(rootSaga);
export default store;