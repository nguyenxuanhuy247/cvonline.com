import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './PasswordSetting.module.scss';

const cx = classnames.bind(styles);

class PasswordSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowCurrentPassword: false,
            isShowNewPassword: false,
            isShowNewPasswordConfirmation: false,
        };
    }

    handleShowHidePassword = (text) => {
        let showPasswordState;
        let state;

        if (text === 'current') {
            showPasswordState = 'isShowCurrentPassword';
            state = this.state.isShowCurrentPassword;
        } else if (text === 'new') {
            showPasswordState = 'isShowNewPassword';
            state = this.state.isShowNewPassword;
        } else if (text === 'confirm') {
            showPasswordState = 'isShowNewPasswordConfirmation';
            state = this.state.isShowNewPasswordConfirmation;
        }

        this.setState({ [showPasswordState]: !state });
    };

    render() {
        const { isShowCurrentPassword, isShowNewPassword, isShowNewPasswordConfirmation } = this.state;

        const Eye1 = isShowCurrentPassword ? BsFillEyeFill : BsFillEyeSlashFill;
        const Eye2 = isShowNewPassword ? BsFillEyeFill : BsFillEyeSlashFill;
        const Eye3 = isShowNewPasswordConfirmation ? BsFillEyeFill : BsFillEyeSlashFill;

        return (
            <div className={cx('password-setting')}>
                <span className={cx('title')}>Cài đặt mật khẩu</span>
                <p className={cx('required')}>
                    Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%)
                </p>

                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', newPasswordConfirmation: '' }}
                    validationSchema={Yup.object().shape({
                        currentPassword: Yup.string()
                            .required('Hãy nhập mật khẩu hiện tại của bạn')
                            .min(6, 'Mật khẩu phải có độ dài tối thiểu 6 ký tự')
                            .max(25, 'Mật khẩu phải có độ dài tối đa 25 ký tự'),
                        newPassword: Yup.string()
                            .required('Hãy nhập mật khẩu mới của bạn')
                            .min(6, 'Mật khẩu phải có độ dài tối thiểu 6 ký tự')
                            .max(25, 'Mật khẩu phải có độ dài tối đa 25 ký tự'),
                        newPasswordConfirmation: Yup.string()
                            .required('Hãy nhập lại mật khẩu mới để xác nhận')
                            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận chưa đúng'),
                    })}
                    onSubmit={(values, actions) => {
                        console.log('value', values);
                        console.log('actions', actions);
                    }}
                >
                    {(props) => (
                        <Form className={cx('change-password-form')} onSubmit={props.handleSubmit}>
                            <div className={cx('form-group')}>
                                <div className={cx('input-form-password')}>
                                    <label htmlFor="current-password" className={cx('label')}>
                                        Mật khẩu hiện tại
                                    </label>
                                    <Field
                                        type={isShowCurrentPassword ? 'text' : 'password'}
                                        id="current-password"
                                        className={cx('input-form')}
                                        name="currentPassword"
                                        placeholder="Mật khẩu hiện tại"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.currentPassword}
                                    />
                                    <Eye1
                                        className={cx('toggle-show-password')}
                                        onClick={() => this.handleShowHidePassword('current')}
                                    />
                                </div>
                                <ErrorMessage component="p" name="password">
                                    {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('input-form-password')}>
                                    <label htmlFor="password" className={cx('label')}>
                                        Mật khẩu mới
                                    </label>
                                    <Field
                                        type={isShowNewPassword ? 'text' : 'password'}
                                        id="password"
                                        className={cx('input-form')}
                                        name="newPassword"
                                        placeholder="Mật khẩu mới"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.newPassword}
                                    />
                                    <Eye2
                                        className={cx('toggle-show-password')}
                                        onClick={() => this.handleShowHidePassword('new')}
                                    />
                                </div>
                                <ErrorMessage component="p" name="password">
                                    {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('input-form-password')}>
                                    <label htmlFor="newPasswordConfirmation" className={cx('label')}>
                                        Nhập lại mật khẩu mới
                                    </label>
                                    <Field
                                        type={isShowNewPasswordConfirmation ? 'text' : 'password'}
                                        id="newPasswordConfirmation"
                                        className={cx('input-form')}
                                        name="newPasswordConfirmation"
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmedNewPassword}
                                    />
                                    <Eye3
                                        className={cx('toggle-show-password')}
                                        onClick={() => this.handleShowHidePassword('confirm')}
                                    />
                                </div>
                                <ErrorMessage component="p" name="confirmedPassword">
                                    {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <button type="submit" className={cx('save-btn')}>
                                Đổi mật khẩu
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSetting);
