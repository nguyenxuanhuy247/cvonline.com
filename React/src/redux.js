import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { createStateSyncMiddleware } from "redux-state-sync";

import createRootReducer from "./store/reducers/rootReducer.js";
import actionNames from "./store/actions/actionNames.js";


export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

const reduxStateSyncConfig = {
    whitelist: [
        actionNames.CHANGE_LANGUAGE,
    ]
}

const rootReducer = createRootReducer(history);
const middleware = [
    routerMiddleware(history),
    createStateSyncMiddleware(reduxStateSyncConfig),
]

const reduxStore = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;
