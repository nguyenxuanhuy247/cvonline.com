import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";

import { history } from "~/redux";
import { path } from "~/utils";
import { userIsAuthenticated, userIsNotAuthenticated } from "~/hoc/authentication.js";
import Login from "./Auth/Login";

class App extends Component {
  
    render() {
        return (
            <Fragment>
                <ConnectedRouter history={history}>
                    <div className="App">
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
