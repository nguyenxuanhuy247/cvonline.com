import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { FaFacebookF, FaEyeSlash, FaEye } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import styles from './Signup.module.scss';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Validator from '~/components/formValidation.js';
import * as userService from '~/services';

const cx = className.bind(styles);

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isShowPassword: false,
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

    handleValidateForm = () => {
        Validator({
            formSelector: `.${cx('form-login')}`,
            formGroupSelector: `.${cx('form-group')}`,
            messageSelector: `.${cx('form-message')}`,
            rules: [
                Validator.isRequired(`#${cx('email')}`),
                Validator.isEmail(`#${cx('email')}`),
                Validator.isRequired(`#${cx('password')}`),
                Validator.minLength(`#${cx('password')}`, 6),
            ],
            onSubmit: async (data) => {
                try {
                    let dataRes = await userService.handleLogin(data.email, data.password);
                    if (dataRes?.errorCode !== 0) {
                        this.setState({ errorMessage: dataRes.errorMessage });
                    } else if (dataRes?.errorCode === 0) {
                        this.props.userLoginSuccess(dataRes.user);
                    }
                } catch (error) {
                    console.log('An error in ComponentDidMount() in Login.js: ', error);
                }
            },
        });
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        this.handleValidateForm();
    };

    componentDidMount = () => {
        this.handleValidateForm();
    };

    render() {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;

        return (
            <div className={cx('signup')}>
                <form action="" method="POST" className={cx('form')} id="form-1">
                    <h3 className={cx('heading')}>Thành viên đăng ký</h3>
                    <p className={cx('desc')}>Cùng nhau học lập trình miễn phí tại F8 ❤️</p>

                    <div className={cx('spacer')}></div>

                    <div className={cx('form-group')}>
                        <label for="fullname" className={cx('form-label')}>
                            Tên đầy đủ
                        </label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            placeholder="VD: Sơn Đặng"
                            className={cx('form-control')}
                        />
                        <span className={cx('form-message')}></span>
                    </div>

                    <div className={cx('form-group')}>
                        <label for="email" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="VD: email@domain.com"
                            className={cx('form-control')}
                        />
                        <span className={cx('form-message')}></span>
                    </div>

                    <div className={cx('form-group')}>
                        <label for="password" className={cx('form-label')}>
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className={cx('form-control')}
                        />
                        <span className={cx('form-message')}></span>
                    </div>

                    <div className={cx('form-group')}>
                        <label for="password_confirmation" className={cx('form-label')}>
                            Nhập lại mật khẩu
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            className={cx('form-control')}
                        />
                        <span className={cx('form-message')}></span>
                    </div>

                    <button className={cx('form-submit')}>Đăng ký</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
