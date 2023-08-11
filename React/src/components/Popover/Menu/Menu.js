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
        };
    }

    static defaultProps = {
        data: [],
    };

    handleShowSubMenu = (subTitle, data) => {
        this.setState({
            menuList: data,
            isHeaderShow: true,
            subMenuHeaderTitle: subTitle,
        });
    };

    handleBackToShowMenu = () => {
        this.setState({
            menuList: this.props.data,
            isHeaderShow: false,
        });
    };

    handleHideMenu = () => {
        this.setState({
            menuList: this.props.data,
            isHeaderShow: false,
        });
    };

    handleShowMenuContent = (attrs) => {
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
                        {this.state.menuList.length > 0 &&
                            this.state.menuList.map((item) => {
                                const isChildren = !!item.children;
                                let props = {};

                                if (item.route) {
                                    props.route = item.route;
                                }

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
                                            }

                                            if (item.title === 'Đăng xuất') {
                                                await this.props.userSignOut();
                                            }
                                        }}
                                        {...props}
                                    >
                                        {item.leftIcon && <i className={cx('left-icon')}>{item.leftIcon}</i>}
                                        <span className={cx('text')}>{item.title}</span>
                                        {item.rightIcon && <i className={cx('arrow-right')}>{item.rightIcon}</i>}
                                    </Button>
                                );
                            })}
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
                onHide={() => this.handleHideMenu()}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
