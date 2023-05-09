import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer.js';
import userReducer from './userReducer.js';
import userCVReducer from './userCVReducer.js';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { contenteditableReducer } from './HOR.js';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isSignIn'],
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language'],
};

const userCVPersistConfig = {
    ...persistCommonConfig,
    key: 'userCV',
    whitelist: ['jobTitle', 'productDesc', 'jobPosition', 'companyName'],
};

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
        userCV: userCVReducer,

        jobTitle: persistReducer(userCVPersistConfig, contenteditableReducer('jobTitle')),
        companyName: persistReducer(userCVPersistConfig, contenteditableReducer('companyName')),
        jobPosition: persistReducer(userCVPersistConfig, contenteditableReducer('jobPosition')),
        productDesc: persistReducer(userCVPersistConfig, contenteditableReducer('productDesc')),
    });

export default createRootReducer;
