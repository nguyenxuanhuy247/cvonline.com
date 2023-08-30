import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import styles from './PasswordSetting.module.scss';
import * as appActions from '~/store/actions';
import * as userActions from '~/store/actions';
import Loading from '~/components/Modal/Loading.js';
import { Toast } from '~/components/Toast/Toast.js';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class PasswordSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowCurrentPassword: false,
            isShowNewPassword: false,
            isShowNewPasswordConfirmation: false,

            startVerify: false,
            currentPassword: '',
            isCurrentPasswordVerified: false,
        };

        this.debouncedVerifyCurrentPassword = _.debounce(this.VerifyCurrentPassword, 1000);
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

    VerifyCurrentPassword = async (e) => {
        const { id: userId } = this.props.owner ?? {};
        const currentPasswordValue = e.target.value?.trimStart();

        await this.setState({ startVerify: true, currentPassword: currentPasswordValue });

        if (currentPasswordValue) {
            const data = { userId: userId, currentPassword: currentPasswordValue };
            const errorCode = await this.props.verifyCurrentPassword(data);

            if (errorCode === 0) {
                await this.setState({ isCurrentPasswordVerified: true });
            } else {
                await this.setState({ isCurrentPasswordVerified: false });
            }
        }
    };

    render() {
        const { isShowCurrentPassword, isShowNewPassword, isShowNewPasswordConfirmation } = this.state;

        const Eye1 = isShowCurrentPassword ? BsFillEyeFill : BsFillEyeSlashFill;
        const Eye2 = isShowNewPassword ? BsFillEyeFill : BsFillEyeSlashFill;
        const Eye3 = isShowNewPasswordConfirmation ? BsFillEyeFill : BsFillEyeSlashFill;

        return (
            <div className={cx('password-setting')}>
                <span className={cx('title')}>Cài đặt mật khẩu</span>

                <ul className={cx('rule-password')}>
                    <li>Mật khẩu từ 6 đến 25 ký tự</li>
                    <li>Bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt</li>
                </ul>

                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', newPasswordConfirmation: '' }}
                    validationSchema={Yup.object().shape({
                        currentPassword: Yup.string().required('Hãy nhập mật khẩu hiện tại của bạn'),
                        newPassword: Yup.string()
                            .required('Hãy nhập mật khẩu mới của bạn')
                            .min(6, 'Mật khẩu phải có độ dài tối thiểu 6 ký tự')
                            .max(25, 'Mật khẩu phải có độ dài tối đa 25 ký tự'),
                        newPasswordConfirmation: Yup.string()
                            .required('Hãy nhập lại mật khẩu mới để xác nhận')
                            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận chưa đúng'),
                    })}
                    onSubmit={async (values, actions) => {
                        const { id: userId } = this.props.owner ?? {};
                        if (this.state.isCurrentPasswordVerified) {
                            const data = { userId: userId, password: values.newPassword, label: 'Mật khẩu mới' };
                            delete data.currentPassword;

                            const errorCode = await this.props.updateUserInformation(data);
                            if (errorCode === 0) {
                                Toast.TOP_CENTER_SUCCESS('Cập nhật mật khẩu mới thành công', 3000);
                                actions.resetForm();
                                this.setState({ startVerify: false, currentPassword: '' });
                            }
                        }
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
                                        className={cx('input-form', {
                                            verify: this.state.startVerify && this.state.currentPassword,
                                        })}
                                        name="currentPassword"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.currentPassword}
                                        onInput={this.debouncedVerifyCurrentPassword}
                                    />

                                    {this.state.startVerify && this.state.currentPassword && (
                                        <span className={cx('icon-wrapper')}>
                                            {this.props.isCurrentPasswordVerified ? (
                                                <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                            ) : (
                                                <AiFillCloseCircle className={cx('icon', 'error')} />
                                            )}

                                            {this.props.isLoading_verifyCurrentPassword && <Loading inner verify />}
                                        </span>
                                    )}

                                    <Eye1
                                        className={cx('toggle-show-password', { 'green-eye': isShowCurrentPassword })}
                                        onClick={() => this.handleShowHidePassword('current')}
                                    />
                                </div>

                                {this.state.currentPassword && !this.props.isCurrentPasswordVerified && (
                                    <div className={cx('error-message')}>Mật khẩu không chính xác</div>
                                )}
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.newPassword}
                                    />
                                    <Eye2
                                        className={cx('toggle-show-password', { 'green-eye': isShowNewPassword })}
                                        onClick={() => this.handleShowHidePassword('new')}
                                    />
                                </div>
                                <ErrorMessage name="newPassword">
                                    {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('input-form-password')}>
                                    <label htmlFor="newPasswordConfirmation" className={cx('label')}>
                                        Xác nhận mật khẩu mới
                                    </label>
                                    <Field
                                        type={isShowNewPasswordConfirmation ? 'text' : 'password'}
                                        id="newPasswordConfirmation"
                                        className={cx('input-form')}
                                        name="newPasswordConfirmation"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.newPasswordConfirmation}
                                    />
                                    <Eye3
                                        className={cx('toggle-show-password', {
                                            'green-eye': isShowNewPasswordConfirmation,
                                        })}
                                        onClick={() => this.handleShowHidePassword('confirm')}
                                    />
                                </div>
                                <ErrorMessage name="newPasswordConfirmation">
                                    {(msg) => <div className={cx('error-message')}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <Button
                                disabled={
                                    !props.values.currentPassword ||
                                    !props.values.newPassword ||
                                    !props.values.newPasswordConfirmation
                                }
                                type="submit"
                                className={cx('save-btn')}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        isLoading_verifyCurrentPassword: state.app.isLoading.verifiedCurrentPassword,
        isCurrentPasswordVerified: state.app.isCurrentPasswordVerified,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyCurrentPassword: (data) => dispatch(appActions.verifyCurrentPassword(data)),
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSetting);
