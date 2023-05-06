import { Component } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultTippy from '@tippyjs/react';
import { FaBell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

import styles from './Header.module.scss';
import logo from '~/assets/logo/logo-with-text.png';
import { AvatarRef } from '~/components/Image/ImageComponent.js';
import { JpgImages, SignOutIcon, AccountIcon, LanguageIcon, HelpIcon } from '~/components/Image/Images.js';
import { path } from '~/utils';
import Menu from '~/components/Popover/Menu/Menu.js';
import Button from '~/components/Button/Button';
import HeaderNavbar from '~/containers/Header/HeaderNavbar.js';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <AccountIcon />,
        title: 'Tài khoản',
        to: '/feedback',
    },
    {
        icon: <LanguageIcon />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'Ngôn ngữ',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Ngôn ngữ',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <HelpIcon />,
        title: 'Trợ giúp',
    },
    {
        icon: <SignOutIcon />,
        title: 'Đăng xuất',
    },
];

class Header extends Component {
    render = () => {
        return (
            <header className={cx('header')}>
                <Link to={'/personal'} className={cx('logo-link')}>
                    <img src={logo} className={cx('logo')} alt="cvonline.com" />
                </Link>

                <nav className={cx('navbar')}>
                    <ul className={cx('list')}>
                        <li className={cx('item')}>
                            <Link to={'#!'} className={cx('link')}>
                                Việc làm
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to={'#!'} className={cx('link')}>
                                Hồ sơ & CV
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to={'#!'} className={cx('link')}>
                                Công ty
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to={'#!'} className={cx('link')}>
                                Phát triển sự nghiệp
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to={'#!'} className={cx('link')}>
                                Công cụ
                            </Link>
                        </li>
                    </ul>
                </nav>
                <HeaderNavbar />
            

                {!this.props.isSignIn ? (
                    <div className={cx('actions')}>
                        <Link to={path.SIGNIN} className={cx('signin')}>
                            Đăng nhập
                        </Link>
                        <Link to={path.SIGNUP} className={cx('signup')}>
                            Đăng ký
                        </Link>
                    </div>
                ) : (
                    <div className={cx('login')}>
                        <DefaultTippy content="Thông báo">
                            <button className={cx('icon')}>
                                <FaBell />
                            </button>
                        </DefaultTippy>
                        <DefaultTippy content="Tin nhắn">
                            <button className={cx('icon')}>
                                <RiMessage2Fill />
                            </button>
                        </DefaultTippy>
                        <Menu data={MENU_ITEMS}>
                            <button className={cx('user')}>
                                <AvatarRef src={JpgImages.avatar} className={cx('avatar')} alt="Nguyễn Xuân Huy" />
                                <span className={cx('fullname')}>Nguyễn Xuân Huy</span>
                            </button>
                        </Menu>
                    </div>
                )}
            </header>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
