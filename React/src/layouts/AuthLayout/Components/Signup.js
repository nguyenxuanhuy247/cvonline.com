import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, Redirect, Route } from 'react-router-dom';

import styles from './Signup.module.scss';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Validator from '~/components/formValidation/formValidation.js';
import * as userActions from '~/store/actions/userActions.js';
import { path } from '~/utils';
import FacebookGoogle from './FacebookGoogle.js';
import { SwitchButton, SubmitButton } from './Button.js';

const cx = className.bind(styles);

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            isShowPassword: false,
        };
    }

    handleChangeFistName = (event) => {
        this.setState({ firstName: event.target.value });
    };

    handleChangeLastName = (event) => {
        this.setState({ lastName: event.target.value });
    };

    handleChangeEmail = (event) => {
        this.props.removeSignUpMessage();
        this.setState({ email: event.target.value });
    };

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleChangePasswordConfirmation = (event) => {
        this.setState({ passwordConfirmation: event.target.value });
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    handleValidateForm = () => {
        this.props.removeSignUpMessage();
        Validator(
            {
                formSelector: `.${cx('form-signup')}`,
                formGroupSelector: `.${cx('form-group')}`,
                messageSelector: `.${cx('form-message')}`,
                rules: [
                    Validator.isRequired(`#${cx('firstName')}`),
                    Validator.isRequired(`#${cx('lastName')}`),
                    Validator.isRequired(`#${cx('email')}`),
                    Validator.isEmail(`#${cx('email')}`),
                    Validator.isRequired(`#${cx('password')}`),
                    Validator.minLength(`#${cx('password')}`, 6),
                    Validator.isRequired(`#${cx('password_confirmation')}`),
                    Validator.isConfirmed(`#${cx('password_confirmation')}`, () => {
                        return document.querySelector(`#${cx('password')}`).value;
                    }),
                ],
            },
            cx('invalid'),
            this.props.userSignUp,
        );
    };

    componentDidMount = () => {
        this.handleValidateForm();
    };

    render() {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;
        let { errorCode, errorMessage } = this.props.signUpMessage;
        let { isSignUp } = this.props;

        return (
            <Route exact path={path.SIGNUP}>
                {isSignUp ? (
                    <Redirect to={path.SIGNIN} />
                ) : (
                    <div className={cx('signup-container')}>
                        <form className={cx('form-signup')} autoComplete="on">
                            <img src={logoWithText} alt="mycompany" className={cx('form-logo')} />

                            <div className={cx('error-message')}>
                                {this.state.email && errorMessage && (
                                    <p className={`${errorCode ? 'alert alert-danger' : 'alert alert-success'}`}>
                                        {errorMessage}
                                    </p>
                                )}
                            </div>

                            <div className="row">
                                <div className={cx('col-6', 'form-group')}>
                                    <div className={cx('form-input')}>
                                        <label htmlFor="lastName" className={cx('form-label')}>
                                            Họ
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="VD: Nguyễn Xuân"
                                            className={cx('form-control')}
                                            value={this.state.lastName}
                                            onChange={(event) => this.handleChangeLastName(event)}
                                        />
                                    </div>
                                    <span className={cx('form-message')}></span>
                                </div>

                                <div className={cx('col-6', 'form-group')}>
                                    <div className={cx('form-input')}>
                                        <label htmlFor="firstName" className={cx('form-label')}>
                                            Tên
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="VD: Huy"
                                            className={cx('form-control')}
                                            value={this.state.firstName}
                                            onChange={(event) => this.handleChangeFistName(event)}
                                        />
                                    </div>
                                    <span className={cx('form-message')}></span>
                                </div>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('form-input')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="VD: nguyenxuanhuy@gmail.com"
                                        className={cx('form-control')}
                                        value={this.state.email}
                                        onChange={(event) => this.handleChangeEmail(event)}
                                    />
                                </div>
                                <span className={cx('form-message')}></span>
                            </div>

                            <div className="row">
                                <div className={cx('col-6', 'form-group')}>
                                    <div className={cx('form-input')}>
                                        <label htmlFor="password" className={cx('form-label')}>
                                            Mật khẩu
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type={this.state.isShowPassword ? 'type' : 'password'}
                                            placeholder="VD: Abc123456@#"
                                            className={cx('form-control')}
                                            value={this.state.password}
                                            onChange={(event) => this.handleChangePassword(event)}
                                        />
                                        <div className={cx('toggle-show-password')}>
                                            <Eye className={cx('eye')} onClick={() => this.handleShowHidePassword()} />
                                        </div>
                                    </div>
                                    <span className={cx('form-message')}></span>
                                </div>

                                <div className={cx('col-6', 'form-group')}>
                                    <div className={cx('form-input')}>
                                        <label htmlFor="password_confirmation" className={cx('form-label')}>
                                            Nhập lại mật khẩu
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="VD: Abc123456@#"
                                            type={this.state.isShowPassword ? 'type' : 'password'}
                                            className={cx('form-control')}
                                            value={this.state.confirmPassword}
                                            onChange={(event) => this.handleChangePasswordConfirmation(event)}
                                        />
                                        <div className={cx('toggle-show-password')}>
                                            <Eye className={cx('eye')} onClick={() => this.handleShowHidePassword()} />
                                        </div>
                                    </div>
                                    <span className={cx('form-message')}></span>
                                </div>
                            </div>
                            <SubmitButton text="Đăng ký" />
                        </form>

                        <p className={cx('signin-with')}>Hoặc đăng ký bằng :</p>
                        <FacebookGoogle />
                        <SwitchButton question="Bạn đã có tài khoản?" to="/signin" button="Đăng nhập" />
                    </div>
                )}
            </Route>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signUpMessage: state.user.signUpMessage,
        isSignUp: state.user.isSignUp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUp: (dataUser) => dispatch(userActions.userSignUpStart(dataUser)),
        removeSignUpMessage: () => dispatch(userActions.removeSignUpMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
