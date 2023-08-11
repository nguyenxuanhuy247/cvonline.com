import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './userReducer.js';
import appReducer from './appReducer.js';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const userPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['isSignIn', 'owner', 'prevUserID'],
};

const appPersistConfig = {
    key: 'app',
    storage: storage,
    // whitelist: ['isSignIn', 'owner', 'prevUserID'],
};

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
    });

export default createRootReducer;
