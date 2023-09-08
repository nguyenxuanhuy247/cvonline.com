import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { PERSIST } from 'redux-persist/es/constants';

import createRootReducer from '~/store/reducers/rootReducer.js';

export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

const rootReducer = createRootReducer(history);

const allMiddleware = [
    routerMiddleware(history),
    thunk,
    createStateSyncMiddleware({
        blacklist: [PERSIST],
    }),
];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...allMiddleware)));
// const store = createStore(rootReducer, {}, applyMiddleware(...allMiddleware));

initMessageListener(store);
export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export default store;
