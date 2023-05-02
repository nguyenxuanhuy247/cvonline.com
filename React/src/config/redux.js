import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStateSyncMiddleware } from 'redux-state-sync';
import thunk from 'redux-thunk';

import createRootReducer from '~/store/reducers/rootReducer.js';
// import actionNames from "~/store/actions/actionNames.js";

const environment = process.env.NODE_ENV || 'development';

export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

// const reduxStateSyncConfig = {
//     whitelist: [
//         actionNames.CHANGE_LANGUAGE,
//     ]
// }

const rootReducer = createRootReducer(history);

const allMiddleware = [
    routerMiddleware(history),
    // createStateSyncMiddleware(reduxStateSyncConfig),
    thunk,
];
const composeEnhancers =
    environment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...allMiddleware)));

// export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export default store;
