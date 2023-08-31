import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import styles from './AuthLayout.module.scss';
import SignIn from '~/pages/SignInPage/Signin.js';
import SignUp from '~/pages/SignUpPage/Signup.js';
import ForgotPassword from '~/pages/ForgotPasswordPage/ForgotPassword.js';
import { path } from '~/utils';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Loading from '~/components/Modal/Loading.js';

const cx = className.bind(styles);

class Auth extends PureComponent {
    render() {
        const { history } = this.props;
        const { state } = this.props.location;

        if (this.props.isSignIn) {
            history.push(state?.from || '/');
        }

        return (
            <div className={cx('auth-container')}>
                <div className={cx('inner')}>
                    <a href="/">
                        <img src={logoWithText} alt="cvonline.com" className={cx('form-logo')} />
                    </a>
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
        isSignIn: state.user.isSignIn,
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(Auth);
