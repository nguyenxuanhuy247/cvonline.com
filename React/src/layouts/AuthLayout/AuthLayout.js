import { PureComponent } from 'react';
import className from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import styles from './AuthLayout.module.scss';
import SignIn from './Components/Signin.js';
import SignUp from './Components/Signup.js';
import Carousel from '~/components/Carousel/Carousel';
import { path } from '~/utils';

const cx = className.bind(styles);

class Auth extends PureComponent {
    render() {
        return (
            <div className={cx('grid wide max-wide')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col lpc-6', 'hide-on-mobile-tablet')}>
                        <Carousel />
                    </div>

                    <div className={cx('col lpc-6 pc-12 tb-8 tb-o-2 mb-10 mb-o-1')}>
                        <Switch>
                            <Route path={path.SIGNIN} component={SignIn} />
                            <Route path={path.SIGNUP} component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;
