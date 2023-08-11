import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { path } from '~/utils';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions/userActions.js';

const cx = className.bind(styles);

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetSucceeded: false,
        };
    }

    render() {
        return (
            <Route path={path.FORGOTPASSWORD}>
                <div className={cx('forgot-password-container')}>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .required('Hãy nhập địa chỉ email của bạn')
                                .email('Hãy nhập đúng định dạng email'),
                        })}
                        onSubmit={async (values, actions) => {
                            actions.resetForm();
                            const errorCode = await this.props.userResetPassword(values);
                            if (errorCode === 0) {
                                this.setState({ isResetSucceeded: true });
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
                                    />
                                    <ErrorMessage component="p" name="email">
                                        {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                    </ErrorMessage>
                                </div>

                                <button type="submit" className={cx('submit-btn')}>
                                    Tạo lại mật khẩu
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        userResetPassword: (data) => dispatch(userActions.userForgotPasswordStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
