import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import 'reset-css';
import className from 'classnames/bind';

import styles from './App.module.scss';
import { history } from '~/config/redux.js';
import { path } from '~/utils';
import { userIsAuthenticated, userIsNotAuthenticated } from '~/hoc/authentication.js';
import Auth from './Auth/Auth.js';

const cx = className.bind(styles);

class App extends Component {
    render() {
        console.log(process.env.REACT_APP_BACKEND_URL);
        return (
            <Fragment>
                <ConnectedRouter history={history}>
                    <div className={cx('App')}>
                        <Switch>
                            <Route path={path.HOME} component={userIsNotAuthenticated(Auth)} />
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
