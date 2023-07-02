import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStateSyncMiddleware } from 'redux-state-sync';
import thunk from 'redux-thunk';

import createRootReducer from '~/store/reducers/rootReducer.js';
// import actionNames from "~/store/actions/actionNames.js";

export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

// const reduxStateSyncConfig = {
//     whitelist: [
//         actionNames.CHANGE_LANGUAGE,
//     ]
// }

const rootReducer = createRootReducer(history);

const allMiddleware = [
    routerMiddleware(history),
    thunk,
    // createStateSyncMiddleware(reduxStateSyncConfig),
];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...allMiddleware)));
const store = createStore(rootReducer, applyMiddleware(...allMiddleware));

// export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export default store;
