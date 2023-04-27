import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaFacebookF, FaEyeSlash, FaEye } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import logoWithText from '~/assets/logo/logo-with-text.png';
import Validator from '~/components/formValidation.js';
import * as userService from '~/services';
import styles from './Signin.module.scss';

const cx = className.bind(styles);

class Login extends Component {
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
        this.setState({ email: event.target.value });
    };

    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    fetchData = async (dataReq) => {
        let isEqual = _.isEqual(this.state.prevFormData, dataReq);
        if (!isEqual) {
            try {
                console.log('call nAPI');
                await this.setState({ errorMessage: '' });
                await this.setState({ prevFormData: dataReq });
                let dataRes = await userService.handleLogin(dataReq.email, dataReq.password);
                if (dataRes?.errorCode !== 0) {
                    this.setState({ errorMessage: dataRes.errorMessage });
                } else if (dataRes?.errorCode === 0) {
                    this.props.userLoginSuccess(dataRes.user);
                }
            } catch (error) {
                console.log('An error in fetchData() in Login.js: ', error);
            }
        }
    };

    handleValidateForm = () => {
        Validator(
            {
                formSelector: `.${cx('form')}`,
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
            this.fetchData,
        );
    };

    componentDidMount = () => {
        this.handleValidateForm();
    };

    render() {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;

        return (
            <div className={cx('signin')}>
                <div className={cx('signin-container')}>
                    <form className={cx('form')} autoComplete="on">
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
                            <span className={cx('form-message')}>{this.state.errorMessage}</span>
                        </div>

                        <a href="#!" className={cx('forgot-password')}>
                            Quên mật khẩu?
                        </a>
                        <button type="submit" className={cx('form-submit')}>
                            Đăng nhập
                        </button>
                    </form>

                    <p className={cx('signin-with')}>Hoặc đăng nhập bằng :</p>
                    <div className={cx('social-network')}>
                        <a href="#!" className={cx('facebook')}>
                            <FaFacebookF className={cx('icon', 'facebook-icon')} />
                        </a>
                        <a href="#!" className={cx('google')}>
                            <GrGoogle className={cx('icon', 'google-icon')} />
                        </a>
                    </div>
                    <div className={cx('signup')}>
                        <p className={cx('signup-question')}>Bạn chưa có tài khoản?</p>
                        <Link to={'/signup'} className={cx('signup-btn')}>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
