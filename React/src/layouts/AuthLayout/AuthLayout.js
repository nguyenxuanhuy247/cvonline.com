import { PureComponent } from 'react';
import className from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import styles from './AuthLayout.module.scss';
import SignIn from './Components/Signin.js';
import SignUp from './Components/Signup.js';
import { path } from '~/utils';

const cx = className.bind(styles);

class Auth extends PureComponent {
    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('grid wide')}>
                    <div className={cx('row no-gutters')}>
                        <div className={cx('col pc-6 pc-o-3 tb-8 tb-o-2 mb-12')}>
                            <Switch>
                                <Route path={path.SIGNIN} component={SignIn} />
                                <Route path={path.SIGNUP} component={SignUp} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;
