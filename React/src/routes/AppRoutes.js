import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { path } from '~/utils';
import { AuthLayout } from '~/layouts';
import { HomePage, CVPage } from '~/pages';
import PersonalInfo from '~/pages/AccountPage/Components/PersonalInfo.js';
import PasswordSetting from '~/pages/AccountPage/Components/PasswordSetting.js';
import UserIDSetting from '~/pages/AccountPage/Components/UserIDSetting.js';

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={path.HOME} component={HomePage} />
                <Route path={path.SIGNIN} component={AuthLayout} />
                <Route path={path.SIGNUP} component={AuthLayout} />
                <Route path={path.FORGOTPASSWORD} component={AuthLayout} />
                <Route path={path.PERSONALINFO} component={PersonalInfo} />
                <Route path={path.PASSWORDSETTING} component={PasswordSetting} />
                <Route path={path.USERIDSETTING} component={UserIDSetting} />
                <Route path={`${path.HOME}:paramId`} component={CVPage} />
            </Switch>
        );
    }
}

export default AppRoutes;
