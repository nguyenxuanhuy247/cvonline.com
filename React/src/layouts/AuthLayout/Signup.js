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
            this.id.current = setTimeout(() => this.setState({ delayRedirect: true }), 2000);
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
                                    .required('Hãy nhập địa chỉ email của bạn')
                                    .email('Hãy nhập đúng định dạng email'),
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
                                <Form className={cx('form-signup')} onSubmit={props.handleSubmit}>
                                    <p className={cx('title')}>Chào mừng bạn đến với cvonline.com</p>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="fullName" className={cx('label')}>
                                            Họ và tên
                                        </label>
                                        <Field
                                            type="text"
                                            id="fullName"
                                            className={cx('input-form')}
                                            name="fullName"
                                            placeholder="VD: Nguyễn Xuân Huy"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.fullName}
                                        />
                                        <ErrorMessage component="p" name="fullName">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="email" className={cx('label')}>
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            className={cx('input-form')}
                                            name="email"
                                            placeholder="VD: nguyenxuanhuy@gmail.com"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                        <ErrorMessage component="p" name="email">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="password" className={cx('label')}>
                                            Mật khẩu
                                        </label>
                                        <div className={cx('input-form-password')}>
                                            <Field
                                                type={isShowPassword ? 'text' : 'password'}
                                                id="password"
                                                className={cx('input-form')}
                                                name="password"
                                                placeholder="VD: Abc123456@"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.password}
                                            />
                                            <div className={cx('toggle-show-password')}>
                                                <Eye1
                                                    className={cx('eye')}
                                                    onClick={() => this.handleShowHidePassword(true)}
                                                />
                                            </div>
                                        </div>
                                        <ErrorMessage component="p" name="password">
                                            {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label htmlFor="confirmedPassword" className={cx('label')}>
                                            Nhập lại mật khẩu
                                        </label>
                                        <div className={cx('input-form-password')}>
                                            <Field
                                                type={isShowConfirmationPassword ? 'text' : 'password'}
                                                id="confirmedPassword"
                                                className={cx('input-form')}
                                                name="confirmedPassword"
                                                placeholder="VD: Abc123456@"
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
