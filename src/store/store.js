// import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const getMiddlewares = () => {
    return [...middleWares]
}

//const composedEnhancers = compose(applyMiddleware(...middleWares));

//export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = configureStore({
    reducer: rootReducer,
    middleware: getMiddlewares
})