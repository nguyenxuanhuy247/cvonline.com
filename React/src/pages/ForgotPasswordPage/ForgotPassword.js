import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import className from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup';
import _ from 'lodash';

import styles from './ForgotPassword.module.scss';
import { path } from '~/utils';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions/userActions.js';
import * as appActions from '~/store/actions/appActions.js';
import Loading from '~/components/Modal/Loading.js';

const cx = className.bind(styles);

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetSucceeded: false,
            isVerified: false,
            userEmail: '',
        };
        this.debouncedVerifyEmail = _.debounce(this.handleVerifyUserEmail, 1000);
    }

    validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
        return regex.test(email);
    };

    handleVerifyUserEmail = (e) => {
        const FEErrorMessageEl = document.getElementById('forgot-password-error-message-FE');

        const userEmail = e.target.value;
        const isEmail = this.validateEmail(userEmail);

        if (isEmail && !FEErrorMessageEl) {
            this.props.verifyUserEmail(userEmail);
            this.setState({ userEmail: userEmail, isResetSucceeded: false });
        } else {
            this.setState({ userEmail: '', isResetSucceeded: false });
        }
    };

    render() {
        const FEErrorMessageEl = document.getElementById('forgot-password-error-message-FE');

        return (
            <Route path={path.FORGOTPASSWORD}>
                <div className={cx('forgot-password-container')}>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/, 'Định dạng email chưa đúng')
                                .required('Hãy nhập địa chỉ email của bạn'),
                        })}
                        onSubmit={async (values, actions) => {
                            const errorCode = await this.props.userForgotPassword(values);
                            if (errorCode === 0) {
                                actions.resetForm();
                                this.setState({ isResetSucceeded: true, userEmail: '' });
                            } else {
                                this.setState({ isResetSucceeded: false });
                            }
                        }}
                    >
                        {(props) => (
                            <Form
                                className={cx('form-forgot-password')}
                                onSubmit={props.handleSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                            >
                                <p className={cx('title')}>Quên mật khẩu</p>

                                <div className={cx('message-container')}>
                                    {this.state.isResetSucceeded ? (
                                        <p className={cx('success-message')}>
                                            Hãy kiểm tra email của bạn. Sau đó nhấn vào link trong hộp thư để đổi lại
                                            mật khẩu.
                                        </p>
                                    ) : (
                                        <>
                                            {!this.props.isLoading_verifyEmail &&
                                                this.state.userEmail &&
                                                (this.props.isVerified ? (
                                                    <p className={cx('message', 'OK', 'hide')}>
                                                        Email có thể sử dụng để lấy lại mật khẩu
                                                    </p>
                                                ) : (
                                                    <p className={cx('message', 'error', 'hide')}>
                                                        Email chưa được đăng ký tài khoản
                                                    </p>
                                                ))}

                                            {!this.props.isLoading_verifyEmail && (
                                                <ErrorMessage name="email">
                                                    {(msg) => (
                                                        <div
                                                            id="forgot-password-error-message-FE"
                                                            className={cx('message', 'error', 'yup')}
                                                        >
                                                            {msg}
                                                        </div>
                                                    )}
                                                </ErrorMessage>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Email
                                    </label>
                                    <div className={cx('input-form-container')}>
                                        <Field
                                            type="email"
                                            id="email"
                                            className={cx('input-form')}
                                            name="email"
                                            placeholder="Nhập email để lấy lại mật khẩu"
                                            spellCheck={false}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                            onInput={this.debouncedVerifyEmail}
                                        />

                                        {this.state.userEmail && !FEErrorMessageEl && (
                                            <span className={cx('icon-wrapper')}>
                                                {this.props.isVerified ? (
                                                    <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                                ) : (
                                                    <AiFillCloseCircle
                                                        className={cx('icon', 'error')}
                                                        onClick={() => {
                                                            props.setFieldValue('email', '');
                                                            this.setState({ userEmail: '', isResetSucceeded: false });
                                                        }}
                                                    />
                                                )}

                                                {this.props.isLoading_verifyEmail && <Loading inner verify />}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className={cx('submit-btn')}
                                    disabled={!this.props.isVerified || !this.state.userEmail}
                                >
                                    {this.props.isLoading_forgotPassword ? <Loading inner auth /> : `Tạo lại mật khẩu`}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <div className={cx('switch-to-signin-signup')}>
                        <Button className={cx('signin-btn')} route="/signin">
                            Đăng nhập
                        </Button>

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
        isLoading_forgotPassword: state.user.isLoading.forgotPassword,
        isLoading_verifyEmail: state.app.isLoading.verifiedUserEmail,
        isVerified: state.app.isUserEmailVerified,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyUserEmail: (userEmail) => dispatch(appActions.verifyUserEmail(userEmail)),
        userForgotPassword: (data) => dispatch(userActions.userForgotPassword(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
