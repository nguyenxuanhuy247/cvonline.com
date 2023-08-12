import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import className from 'classnames/bind';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import jwt_decode from 'jwt-decode';

import styles from './Signin.module.scss';
import * as userActions from '~/store/actions';
import Button from '~/components/Button/Button.js';
import { path } from '~/utils';

const cx = className.bind(styles);

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
        };
    }

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    handleSignInWithGoogle = (response) => {
        const user = jwt_decode(response.credential);

        if (user) {
            const userData = { email: user.email, fullName: user.name, isGoogle: true };

            this.props.userSignIn(userData);
        }
    };

    componentDidMount = () => {
        window.google?.accounts?.id?.initialize?.({
            client_id: '926424110135-dpsp6egfi7g128s401rparkaba2gtq1c.apps.googleusercontent.com',
            callback: this.handleSignInWithGoogle,
        });

        window.google?.accounts?.id?.renderButton?.(document.getElementById('google_id_signin'), {
            theme: 'outline',
            size: 'large',
            type: 'standard',
        });
    };

    render() {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;

        return (
            <Route exact path={path.SIGNIN}>
                <div className={cx('signin-container')}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .required('Hãy nhập địa chỉ email của bạn')
                                .email('Định dạng email không đúng'),
                            password: Yup.string()
                                .required('Hãy nhập mật khẩu của bạn')
                                .min(6, 'Mật khẩu phải có độ dài từ 6 ký tự')
                                .max(25, 'Mật khẩu phải có độ dài nhỏ hơn 25 ký tự'),
                        })}
                        onSubmit={async (values, actions) => {
                            this.props.userSignIn(values);
                        }}
                    >
                        {(props) => (
                            <Form className={cx('form-signin')}>
                                <p className={cx('title')}>Chào mừng bạn đến với cvonline.com</p>

                                <div className={cx('form-group')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Email
                                    </label>
                                    <div className={cx('input-form-container')}>
                                        <label htmlFor="email" className={cx('label')}>
                                            <MdEmail className={cx('form-icon')} />
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            className={cx('input-form')}
                                            name="email"
                                            placeholder="Email"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>
                                    <ErrorMessage component="p" name="email">
                                        {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="password" className={cx('form-label')}>
                                        Mật khẩu
                                    </label>
                                    <div className={cx('input-form-container')}>
                                        <label htmlFor="password" className={cx('label')}>
                                            <RiLockPasswordFill className={cx('form-icon')} />
                                        </label>
                                        <Field
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            id="password"
                                            className={cx('input-form')}
                                            name="password"
                                            placeholder="Mật khẩu"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.password}
                                        />
                                        <div className={cx('toggle-show-password')}>
                                            <Eye
                                                className={cx('eye', { 'green-eye': this.state.isShowPassword })}
                                                onClick={() => this.handleShowHidePassword(true)}
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage component="p" name="password">
                                        {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <Link to={path.FORGOTPASSWORD} className={cx('forgot-password')}>
                                    Quên mật khẩu?
                                </Link>
                                <button type="submit" className={cx('submit-btn')}>
                                    Đăng nhập
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className={cx('signin-with-google')}>
                        <p className={cx('text')}>Hoặc đăng nhập bằng</p>
                        <div id="google_id_signin"></div>
                    </div>

                    <div className={cx('switch-to-signin-signup')}>
                        <span className={cx('text')}>Bạn chưa có tài khoản?</span>
                        <Button className={cx('signup-btn')} route="/signup">
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </Route>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignIn: (userData) => dispatch(userActions.userSignInStart(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
