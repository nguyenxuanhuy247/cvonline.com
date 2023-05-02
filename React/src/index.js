import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { persistor } from '~/config/redux.js';
import { history } from '~/config/redux.js';
import IntlProviderWrapper from './hoc/IntlProviderWrapper.js';
import App from './App.js';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <IntlProviderWrapper>
                <GlobalStyles>
                    <App persistor={persistor} />
                </GlobalStyles>
            </IntlProviderWrapper>
        </ConnectedRouter>
    </Provider>,
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
