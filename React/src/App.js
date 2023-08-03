import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'reset-css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userIsAuthenticated, userIsNotAuthenticated } from '~/hoc/authentication.js';
import { publicRoutes, authenticatedRoutes } from './routes/routes.js';
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {authenticatedRoutes.map((route, index) => {
                        let Authenticated = route.Authenticated ? userIsAuthenticated : userIsNotAuthenticated;

                        let path = route.path;
                        if (route.isURLParams) {
                            path = `${route.path}:paramId`;
                        }

                        let Component = Authenticated(route.component);

                        return <Route key={index} path={path} component={Component} />;
                    })}

                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} component={route.component} />;
                    })}
                </Switch>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{ width: 'fit-content', textAlign: 'center' }}
                />
            </div>
        );
    }
}

export default App;
