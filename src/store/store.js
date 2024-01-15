// import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware].filter(
  Boolean
);

const persistConfig = {
  key:'root',
  storage,
  blacklist:['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const getMiddlewares = () => {
    return [...middleWares]
};

export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: getMiddlewares
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);