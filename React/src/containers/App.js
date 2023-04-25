import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import 'reset-css';
import className from "classnames/bind";
import styles from "./App.module.scss";

import { history } from "~/redux";
import { path } from "~/utils";
import { userIsAuthenticated, userIsNotAuthenticated } from "~/hoc/authentication.js";
import Login from "./Auth/Login";

const cx = className.bind(styles);

class App extends Component {
  
    render() {
        return (
            <Fragment>
                <ConnectedRouter history={history}>
                    <div className={cx("App")}>
                        <Switch>
                            <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
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
