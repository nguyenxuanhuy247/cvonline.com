import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'reset-css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userIsAuthenticated, userIsNotAuthenticated } from '~/hoc/authentication.js';
import { path } from '~/utils';
import { AuthLayout, PersonalLayout, HomeLayout } from '~/layouts';
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={path.HOME} component={userIsAuthenticated(HomeLayout)} />
                    <Route path={path.SIGNIN} component={userIsNotAuthenticated(AuthLayout)} />
                    <Route path={path.SIGNUP} component={userIsNotAuthenticated(AuthLayout)} />
                    <Route path={path.FORGOTPASSWORD} component={userIsNotAuthenticated(AuthLayout)} />
                    <Route path={`${path.HOME}:paramId`} component={userIsAuthenticated(PersonalLayout)} />
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
