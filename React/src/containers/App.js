import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import className from 'classnames/bind';
import 'reset-css';

import styles from './App.module.scss';
import { history } from '~/config/redux.js';
import { path } from '~/utils';
import { userIsAuthenticated, userIsNotAuthenticated } from '~/hoc/authentication.js';
import Auth from './Auth/Auth.js';
import ManageUser from './ManageUser/ManageUser.js';
import PersonalLayout from '~/layouts/PersonalLayout.js';

const cx = className.bind(styles);

class App extends Component {
    render() {
        console.log(process.env.REACT_APP_BACKEND_URL);
        return (
            <Fragment>
                <ConnectedRouter history={history}>
                    <div className={cx('App', "list-unstyled")}>
                        <Switch>
                            {/* <Route path={path.HOME} exact component={userIsNotAuthenticated(Auth)} /> */}
                            <Route path={path.MANAGEUSER} component={ManageUser} />

                            <Route path={path.PERSONAL}>
                                <PersonalLayout>
                                    <ManageUser />
                                </PersonalLayout>
                            </Route>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Fragment>
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
