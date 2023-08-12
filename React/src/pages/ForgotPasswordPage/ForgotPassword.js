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
    }

    handleVerifyUserEmail = (e) => {
        const userEmail = e.target.value;

        if (userEmail) {
            const debouncedVerify = _.debounce(async (email) => {
                await this.props.verifyUserEmail(email);

                this.setState({ userEmail: userEmail, isResetSucceeded: false });
            }, 800);

            debouncedVerify(userEmail);
        } else {
            this.setState({ userEmail: '', isResetSucceeded: false });
        }
    };

    render() {
        return (
            <Route path={path.FORGOTPASSWORD}>
                <div className={cx('forgot-password-container')}>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .required('Hãy nhập địa chỉ email của bạn')
                                .email('Định dạng email không đúng'),
                        })}
                        onSubmit={async (values, actions) => {
                            console.log(values);
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
                            <Form className={cx('form-forgot-password')} onSubmit={props.handleSubmit}>
                                <p className={cx('title')}>Quên mật khẩu</p>
                                {this.state.isResetSucceeded && (
                                    <p className={cx('success-message')}>
                                        Hãy kiểm tra email của bạn. Sau đó nhấn vào link trong hộp thư để đổi lại mật
                                        khẩu.
                                    </p>
                                )}
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
                                            onInput={(e) => this.handleVerifyUserEmail(e)}
                                        />
                                        {this.state.userEmail ? (
                                            <span className={cx('icon-wrapper')}>
                                                {this.props.isVerified ? (
                                                    <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                                ) : (
                                                    <AiFillCloseCircle className={cx('icon', 'error')} />
                                                )}

                                                {this.props.isLoading_verifyEmail && <Loading inner verify />}
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    {this.state.userEmail ? (
                                        this.props.isVerified ? (
                                            <p className={cx('message', 'OK')}>Email người dùng khả dụng</p>
                                        ) : (
                                            <p className={cx('message', 'error')}>Email chưa được đăng ký</p>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <button type="submit" className={cx('submit-btn')}>
                                    {this.props.isLoading_resetPassword ? `Tạo lại mật khẩu` : <Loading inner verify />}
                                </button>
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
        isLoading_resetPassword: state.user.isLoading.resetPassword,
        isLoading_verifyEmail: state.app.isLoading.verifiedUserEmail,
        isVerified: state.app.isUserEmailVerified,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyUserEmail: (userEmail) => dispatch(appActions.verifyUserEmail(userEmail)),
        userForgotPassword: (data) => dispatch(userActions.userForgotPasswordStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
