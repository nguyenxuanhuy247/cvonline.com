import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import styles from './AuthLayout.module.scss';
import SignIn from './Signin.js';
import SignUp from './Signup.js';
import ForgotPassword from './ForgotPassword.js';
import { path } from '~/utils';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Loading from '~/components/Modal/Loading.js';

const cx = className.bind(styles);

class Auth extends PureComponent {
    render() {
        return (
            <div className={cx('auth-container')}>
                <div className={cx('inner')}>
                    <img src={logoWithText} alt="cvonline.com" className={cx('form-logo')} />
                    <Switch>
                        <Route path={path.SIGNIN} component={SignIn} />
                        <Route path={path.SIGNUP} component={SignUp} />
                        <Route path={path.FORGOTPASSWORD} component={ForgotPassword} />
                    </Switch>
                </div>
                {this.props.isLoading && <Loading text="Đang xác thực..." />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
