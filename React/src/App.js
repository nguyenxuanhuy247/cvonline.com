import { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import 'reset-css';

import { path } from '~/utils';
import { userIsAuthenticated, userIsNotAuthenticated } from '~/hoc/authentication.js';

import SignIn from '~/containers/Auth/Signin/Signin.js';
import SignUp from '~/containers/Auth/Signup/Signup.js';
import Home from '~/pages/Home.js';
import PersonalLayout from '~/layouts/PersonalLayout.js';
import ManageUser from '~/containers/ManageUser/ManageUser.js';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={path.HOME} exact component={userIsNotAuthenticated(Home)} />
                    <Route path={path.SIGNIN} component={userIsNotAuthenticated(SignIn)} />
                    <Route path={path.SIGNUP} component={userIsNotAuthenticated(SignUp)} />
                    <Route path={path.MANAGEUSER} component={ManageUser} />
                    <Route path={path.PERSONAL} component={userIsAuthenticated(PersonalLayout)} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
