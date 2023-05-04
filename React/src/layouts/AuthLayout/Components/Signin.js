import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import logoWithText from '~/assets/logo/logo-with-text.png';
import Validator from '~/components/formValidation/formValidation.js';
import styles from './Signin.module.scss';
import * as userActions from '~/store/actions';
import FacebookGoogle from './FacebookGoogle.js';
import { SwitchButton, SubmitButton } from './Button.js';

const cx = className.bind(styles);

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isShowPassword: false,
            prevFormData: {},
        };
    }

    handleOnChangeEmail = (event) => {
        this.props.removeSignInMessage();
        this.setState({ email: event.target.value });
    };

    handleOnChangePassword = (event) => {
        this.props.removeSignInMessage();
        this.setState({ password: event.target.value });
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    handleValidateForm = () => {
        this.props.removeSignInMessage();
        Validator(
            {
                formSelector: `.${cx('form-signin')}`,
                formGroupSelector: `.${cx('form-group')}`,
                messageSelector: `.${cx('form-message')}`,
                rules: [
                    Validator.isRequired(`#${cx('email')}`),
                    Validator.isEmail(`#${cx('email')}`),
                    Validator.isRequired(`#${cx('password')}`),
                    Validator.minLength(`#${cx('password')}`, 6),
                ],
            },
            cx('invalid'),
            this.props.userSignIn,
        );
    };

    componentDidMount = () => {
        this.handleValidateForm();
    };

    render() {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;
        let { errorMessage } = this.props.signInMessage;

        return (
            <div className={cx('signin-container')}>
                <form className={cx('form-signin')} autoomplete="on">
                    <img src={logoWithText} alt="mycompany" className={cx('form-logo')} />

                    <div className={cx('form-group')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="email" className={cx('form-label')}>
                                <MdEmail className={cx('form-icon')} />
                            </label>
                            <input
                                type="email"
                                className={cx('form-control')}
                                id="email"
                                placeholder="Nhập email của bạn"
                                name="email"
                                spellCheck={false}
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <p className={cx('form-message')}></p>
                    </div>

                    <div className={cx('form-group')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="password" className={cx('form-label')}>
                                <RiLockPasswordFill className={cx('form-icon')} />
                            </label>
                            <input
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                className={cx('form-control')}
                                id="password"
                                placeholder="Nhập mật khẩu"
                                name="password"
                                spellCheck={false}
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                            />
                            <div className={cx('toggle-show-password')}>
                                <Eye className={cx('eye')} onClick={() => this.handleShowHidePassword()} />
                            </div>
                        </div>
                        <span className={cx('form-message')}></span>
                        <span className={cx('form-message')}>{errorMessage}</span>
                    </div>

                    <a href="#!" className={cx('forgot-password')}>
                        Quên mật khẩu?
                    </a>
                    <SubmitButton text="Đăng nhập" />
                </form>

                <p className={cx('signin-with')}>Hoặc đăng nhập bằng :</p>
                <FacebookGoogle />
                <SwitchButton question="Bạn chưa có tài khoản?" to="/signup" button="Đăng ký" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signInMessage: state.user.signInMessage,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignIn: (userData) => dispatch(userActions.userSignInStart(userData)),
        removeSignInMessage: () => dispatch(userActions.removeSignInMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
