import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Redirect, Route } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './Signup.module.scss';
import * as userActions from '~/store/actions/userActions.js';
import { path } from '~/utils';
import Button from '~/components/Button/Button.js';

const cx = className.bind(styles);

class Signup extends Component {
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

    componentWillUnmount() {
        clearInterval(this.id.current);
    }

    render() {
        const { isShowPassword, isShowConfirmationPassword } = this.state;

        const Eye1 = isShowPassword ? FaEye : FaEyeSlash;
        const Eye2 = isShowConfirmationPassword ? FaEye : FaEyeSlash;

        const { delayRedirect } = this.state;

        return (
            <Route exact path={path.SIGNUP}>
                {delayRedirect ? (
                    <Redirect to={path.SIGNIN} />
                ) : (
                    <div className={cx('signup-container')}>
                        <Formik
                            initialValues={{ fullName: '', email: '', password: '', confirmedPassword: '' }}
                            validationSchema={Yup.object().shape({
                                fullName: Yup.string().required('Hãy nhập họ và tên của bạn'),
                                email: Yup.string()
                                    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/, 'Định dạng email chưa đúng')
                                    .required('Hãy nhập địa chỉ email của bạn'),
                                password: Yup.string()
                                    .required('Hãy nhập mật khẩu của bạn')
                                    .min(6, 'Mật khẩu phải có độ dài từ 6 ký tự')
                                    .max(25, 'Mật khẩu phải có độ dài nhỏ hơn 25 ký tự')
                                    .matches(/.*[A-Z].*/, 'Mật khẩu phải bao gồm chữ hoa')
                                    .matches(/.*[a-z].*/, 'Mật khẩu phải bao gồm chữ thường')
                                    .matches(/.*\d.*/, 'Mật khẩu phải bao gồm chữ số')
                                    .matches(/.*\W.*/, 'Mật khẩu phải bao gồm ký tự đặc biệt'),
                                confirmedPassword: Yup.string()
                                    .required('Hãy nhập mật khẩu xác nhận')
                                    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận chưa đúng'),
                            })}
                            onSubmit={(values, actions) => {
                                this.setState({
                                    isShowPassword: false,
                                    isShowConfirmationPassword: false,
                                });

                                this.props.userSignUp(values);
                            }}
                        >
                            {(props) => (
                                <Form className={cx('form-signup')} onSubmit={props.handleSubmit}>
                                    <p className={cx('title')}>Chào mừng bạn đến với CV online</p>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="fullName" className={cx('label')}>
                                            Họ và tên
                                        </label>
                                        <div className={cx('input-form-container')}>
                                            <Field
                                                type="text"
                                                id="fullName"
                                                className={cx('input-form')}
                                                name="fullName"
                                                placeholder="Nhập họ và tên"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.fullName}
                                                spellCheck={false}
                                            />
                                        </div>
                                        <ErrorMessage component="p" name="fullName">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="email" className={cx('label')}>
                                            Email
                                        </label>
                                        <div className={cx('input-form-container')}>
                                            <Field
                                                type="email"
                                                id="email"
                                                className={cx('input-form')}
                                                name="email"
                                                placeholder="Nhập email"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.email}
                                                spellCheck={false}
                                            />
                                        </div>
                                        <ErrorMessage component="p" name="email">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="password" className={cx('label')}>
                                            Mật khẩu
                                        </label>
                                        <div className={cx('input-form-container')}>
                                            <Field
                                                type={isShowPassword ? 'text' : 'password'}
                                                id="password"
                                                className={cx('input-form')}
                                                name="password"
                                                placeholder="Nhập mật khẩu"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.password}
                                                spellCheck={false}
                                            />
                                            <div className={cx('toggle-show-password')}>
                                                <Eye1
                                                    className={cx('eye', { 'green-eye': isShowPassword })}
                                                    onClick={() => this.handleShowHidePassword(true)}
                                                />
                                            </div>
                                        </div>
                                        {props.errors.password && props.touched.password ? (
                                            <div className={cx('error-message')}>{props.errors.password}</div>
                                        ) : (
                                            <ul className={cx('rule-password')}>
                                                <li>Mật khẩu từ 6 đến 25 ký tự</li>
                                                <li>Bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt</li>
                                            </ul>
                                        )}
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="confirmedPassword" className={cx('label')}>
                                            Nhập lại mật khẩu
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
                                                spellCheck={false}
                                            />
                                            <div className={cx('toggle-show-password')}>
                                                <Eye2
                                                    className={cx('eye', { 'green-eye': isShowConfirmationPassword })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
