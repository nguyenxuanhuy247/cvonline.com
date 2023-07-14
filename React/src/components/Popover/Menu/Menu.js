import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';
import { BiArrowBack } from 'react-icons/bi';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import * as userActions from '~/store/actions/userActions.js';
import styles from './Menu.module.scss';
import Button from '~/components/Button/Button';
import { Toast } from '~/components/Toast/Toast.js';

const cx = className.bind(styles);

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: this.props.data,
            isHeaderShow: false,
            subMenuHeaderTitle: '',
            isSetPassword: false,
            isShowPassword: false,
            password: '',
        };
    }

    static defaultProps = {
        data: [],
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    handleShowSubMenu = (subTitle, data) => {
        this.setState({
            menuList: data,
            isHeaderShow: true,
            subMenuHeaderTitle: subTitle,
        });
    };

    handleShowSetPassword = (subTitle) => {
        this.setState({
            isHeaderShow: true,
            subMenuHeaderTitle: subTitle,
            isSetPassword: true,
        });
    };

    handleBackToShowMenu = () => {
        this.setState({
            menuList: this.props.data,
            isHeaderShow: false,
            isSetPassword: false,
            isShowPassword: false,
            password: '',
        });
    };

    handleInputPassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleChangePassword = async () => {
        const { id: userId } = this.props?.user ?? {};

        const passwordState = this.state.password?.trim();
        if (passwordState) {
            if (passwordState.length >= 6) {
                const data = { userId: userId, password: this.state.password };
                const errorCode = await this.props.userChangePassword(data);
                if (errorCode === 0) {
                    this.handleBackToShowMenu();
                }
            } else {
                Toast.TOP_CENTER_INFO('Vui lòng nhập mật khẩu lớn hơn 6 kí tự', 3000);
            }
        } else {
            Toast.TOP_CENTER_INFO('Vui lòng nhập mật khẩu', 3000);
        }
    };

    handleShowMenuContent = (attrs) => {
        let Eye = this.state.isShowPassword ? FaEye : FaEyeSlash;

        return (
            <div tabIndex="-1" {...attrs}>
                <div className={cx('menu-container')}>
                    {this.state.isHeaderShow && (
                        <div className={cx('submenu-header')}>
                            <Button className={cx('back-button')} onClick={() => this.handleBackToShowMenu()}>
                                <span className={cx('arrow-left')}>
                                    <BiArrowBack />
                                </span>
                            </Button>
                            <span className={cx('text')}>{this.state.subMenuHeaderTitle}</span>
                        </div>
                    )}

                    <div className={cx('container')}>
                        {!this.state.isSetPassword ? (
                            this.state.menuList.length > 0 &&
                            this.state.menuList.map((item) => {
                                const isChildren = !!item.children;

                                return (
                                    <Button
                                        key={item.id}
                                        className={cx('button', {
                                            separate: item.separate,
                                        })}
                                        onClick={async () => {
                                            if (isChildren) {
                                                const { title: subTitle, data } = item.children;
                                                if (subTitle === 'Ngôn ngữ') {
                                                    this.handleShowSubMenu(subTitle, data);
                                                }

                                                if (subTitle === 'Thiết lập mật khẩu') {
                                                    this.handleShowSetPassword(subTitle);
                                                }
                                            }

                                            if (item.title === 'Đăng xuất') {
                                                await this.props.userSignOut();
                                            }
                                        }}
                                    >
                                        <i className={cx('left-icon')}>{item.leftIcon}</i>
                                        <span className={cx('text')}>{item.title}</span>
                                        <i className={cx('arrow-right')}>{item.rightIcon}</i>
                                    </Button>
                                );
                            })
                        ) : (
                            <>
                                <div className={cx('set-password-container')}>
                                    <input
                                        value={this.state.password}
                                        className={cx('set-password')}
                                        placeholder="Nhập mật khẩu"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        onInput={(e) => this.handleInputPassword(e)}
                                    />
                                    <Eye className={cx('show-hide')} onClick={() => this.handleShowHidePassword()} />
                                </div>
                                <div className={cx('actions')}>
                                    <Button className={cx('btn', 'cancel')} onClick={() => this.handleBackToShowMenu()}>
                                        Hủy
                                    </Button>
                                    <Button className={cx('btn', 'add')} onClick={() => this.handleChangePassword()}>
                                        Thiết lập
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <TippyHeadless
                interactive
                hideOnClick
                trigger="click"
                placement="bottom-end"
                offset={[0, 4]}
                render={() => this.handleShowMenuContent()}
            >
                {this.props.children}
            </TippyHeadless>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOut: () => dispatch(userActions.userSignOut()),
        userChangePassword: (userData) => dispatch(userActions.userChangePasswordStart(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
