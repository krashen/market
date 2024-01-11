// import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
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
    reducer: persistedReducer,
    middleware: getMiddlewares
});

export const persistor = persistStore(store);