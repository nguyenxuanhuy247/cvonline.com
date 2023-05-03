import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaFacebookF, FaEyeSlash, FaEye } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import styles from './Signup.module.scss';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Validator from '~/components/formValidation/formValidation.js';
import * as userActions from '~/store/actions/userActions.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const cx = className.bind(styles);

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            isShowPassword: false,
        };
    }

    handleChangeFullName = (event) => {
        this.setState({ fullName: event.target.value });
    };

    handleChangeEmail = (event) => {
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
        Validator(
            {
                formSelector: `.${cx('form-signup')}`,
                formGroupSelector: `.${cx('form-group')}`,
                messageSelector: `.${cx('form-message')}`,
                rules: [
                    Validator.isRequired(`#${cx('fullname')}`),
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

        return (
            <div className={cx('signup')}>
                <div className={cx('signup-container')}>
                    <form className={cx('form-signup')} autoComplete="on">
                        <img src={logoWithText} alt="mycompany" className={cx('form-logo')} />

                        <div className={cx('form-group')}>
                            <div className={cx('form-input')}>
                                <label htmlFor="fullname" className={cx('form-label')}>
                                    Họ và tên
                                </label>
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    placeholder="VD: Nguyễn Xuân Huy"
                                    className={cx('form-control')}
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleChangeFullName(event)}
                                />
                            </div>
                            <span className={cx('form-message')}></span>
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

                        <div className={cx('form-group')}>
                            <div className={cx('form-input')}>
                                <label htmlFor="password" className={cx('form-label')}>
                                    Mật khẩu
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={this.state.isShowPassword ? 'type' : 'password'}
                                    placeholder="Nhập mật khẩu"
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

                        <div className={cx('form-group')}>
                            <div className={cx('form-input')}>
                                <label htmlFor="password_confirmation" className={cx('form-label')}>
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Nhập lại mật khẩu"
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

                        <button className={cx('form-submit')}>Đăng ký</button>
                    </form>

                    <p className={cx('signin-with')}>Hoặc đăng ký bằng :</p>
                    <div className={cx('social-network')}>
                        <a href="#!" className={cx('facebook')}>
                            <FaFacebookF className={cx('icon', 'facebook-icon')} />
                        </a>
                        <a href="#!" className={cx('google')}>
                            <GrGoogle className={cx('icon', 'google-icon')} />
                        </a>
                    </div>
                    <div className={cx('signin')}>
                        <p className={cx('signin-question')}>Bạn đã có tài khoản?</p>
                        <Link to={'/signin'} className={cx('signin-btn')}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginIn: state.user.isLoginIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUp: (dataUser) => dispatch(userActions.userSignUpStart(dataUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
