import {createStore , applyMiddleware} from 'redux';
import reducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'users',
    storage
}

const persistedReducer = persistReducer(persistConfig,reducer);

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware()));

const persistor = persistStore(store);

export {store,persistor};