import { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Signin from '~/containers/Auth/Signin/Signin.js';
import Signup from '~/containers/Auth/Signup/Signup.js';
import { path } from '~/utils';

class Auth extends Component {
    render() {
        return (
            <Switch>
                <Route path={path.SIGNIN} exact component={Signin} />
                <Route path={path.SIGNUP} component={Signup} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
