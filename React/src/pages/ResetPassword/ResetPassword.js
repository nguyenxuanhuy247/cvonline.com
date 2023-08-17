import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Redirect, Route } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './ResetPassword.module.scss';
import * as userActions from '~/store/actions/userActions.js';
import { path } from '~/utils';
import Button from '~/components/Button/Button.js';

const cx = className.bind(styles);

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isShowConfirmationPassword: false,
            delayRedirect: false,
        };
    }

    id = React.createRef();

    handleShowHidePassword = (isPassword) => {
        const showPasswordState = isPassword ? 'isShowPassword' : 'isShowConfirmationPassword';
        const state = isPassword ? this.state.isShowPassword : this.state.isShowConfirmationPassword;
        this.setState({ [showPasswordState]: !state });
    };

    componentDidUpdate(prevProps) {
        if (this.props.isSignUp !== prevProps.isSignUp) {
            this.id.current = setTimeout(() => this.setState({ delayRedirect: true }), 1500);
        }
    }

    handleFocusOnInputPassword = () => {
        const rulePassword = document.getElementById('reset-password-rule-password');
        if (rulePassword) {
            rulePassword.style.display = 'none';
        }
    };

    componentWillUnmount() {
        clearInterval(this.id.current);
    }

    render() {
        const { isShowPassword, isShowConfirmationPassword } = this.state;

        const Eye1 = isShowPassword ? FaEye : FaEyeSlash;
        const Eye2 = isShowConfirmationPassword ? FaEye : FaEyeSlash;

        const { delayRedirect } = this.state;

        return (
            <Route exact path={path.RESETPASSWORD}>
                {delayRedirect ? (
                    <Redirect to={path.SIGNIN} />
                ) : (
                    <div className={cx('reset-password-container')}>
                        <Formik
                            initialValues={{ fullName: '', email: '', password: '', confirmedPassword: '' }}
                            validationSchema={Yup.object().shape({
                                fullName: Yup.string().required('Hãy nhập họ và tên của bạn'),
                                email: Yup.string()
                                    .required('Hãy nhập địa chỉ email của bạn')
                                    .email('Định dạng email không đúng'),
                                password: Yup.string()
                                    .required('Hãy nhập mật khẩu của bạn')
                                    .min(6, 'Mật khẩu phải có độ dài từ 6 ký tự')
                                    .max(25, 'Mật khẩu phải có độ dài nhỏ hơn 25 ký tự'),
                                confirmedPassword: Yup.string()
                                    .required('Hãy nhập mật khẩu xác nhận')
                                    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận chưa đúng'),
                            })}
                            onSubmit={(values, actions) => {
                                this.props.userSignUp(values);
                            }}
                        >
                            {(props) => (
                                <Form className={cx('form-reset-password')} onSubmit={props.handleSubmit}>
                                    <p className={cx('title')}>Tạo lại mật khẩu của bạn</p>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="password" className={cx('label')}>
                                            Mật khẩu mới
                                        </label>
                                        <div className={cx('input-form-container')}>
                                            <Field
                                                type={isShowPassword ? 'text' : 'password'}
                                                id="password"
                                                className={cx('input-form')}
                                                name="password"
                                                placeholder="Nhập mật khẩu mới"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.password}
                                                onFocusout={() => this.handleFocusOnInputPassword()}
                                            />
                                            <div className={cx('toggle-show-password')}>
                                                <Eye1
                                                    className={cx('eye')}
                                                    onClick={() => this.handleShowHidePassword(true)}
                                                />
                                            </div>
                                        </div>
                                        <ul className={cx('rule-password')} id="reset-password-rule-password">
                                            <li>Mật khẩu từ 6 đến 25 ký tự</li>
                                            <li>Bao gồm chữ hoa, chữ thường và ký tự số</li>
                                        </ul>
                                        <ErrorMessage component="p" name="password">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="confirmedPassword" className={cx('label')}>
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className={cx('input-form-container')}>
                                            <Field
                                                type={isShowConfirmationPassword ? 'text' : 'password'}
                                                id="confirmedPassword"
                                                className={cx('input-form')}
                                                name="confirmedPassword"
                                                placeholder="Nhập lại mật khẩu"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.confirmedPassword}
                                            />
                                            <div className={cx('toggle-show-password')}>
                                                <Eye2
                                                    className={cx('eye')}
                                                    onClick={() => this.handleShowHidePassword()}
                                                />
                                            </div>
                                        </div>
                                        <ErrorMessage component="p" name="confirmedPassword">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <button type="submit" className={cx('submit-btn')}>
                                        Đăng ký
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className={cx('switch-to-signin-signup')}>
                            <span className={cx('text')}>Bạn chưa có tài khoản?</span>
                            <Button className={cx('signin-btn')} route="/signin">
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                )}
            </Route>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignUp: state.user.isSignUp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUp: (dataUser) => dispatch(userActions.userSignUpStart(dataUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
