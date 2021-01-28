import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./rootSaga";
import {reducer} from "./toolkitSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  store: reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});
export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(rootSaga);

export default store;
