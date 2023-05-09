import { Component } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultTippy from '@tippyjs/react';
import { FaBell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';

import styles from './Header.module.scss';
import logo from '~/assets/logo/logo-with-text.png';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import { path } from '~/utils';
import Menu from '~/components/Popover/Menu/Menu.js';
import Button from '~/components/Button/Button';
import HeaderNavbar from '~/containers/Header/HeaderNavbar.js';

import { MENU_AVATAR_DATA } from '~/components/MenuData/MenuData.js';

const cx = className.bind(styles);

class Header extends Component {
    render = () => {
        return (
            <header className={cx('header')}>
                <Link to={'/personal'} className={cx('logo-link')}>
                    <img src={logo} className={cx('logo')} alt="cvonline.com" />
                </Link>

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
                        <DefaultTippy content="Thông báo" arrow="" offset={[0, 10]}>
                            <Button className={cx('icon')}>
                                <FaBell />
                            </Button>
                        </DefaultTippy>

                        <DefaultTippy content="Tin nhắn" arrow="">
                            <Button className={cx('icon')}>
                                <RiMessage2Fill />
                            </Button>
                        </DefaultTippy>

                        <Menu data={MENU_AVATAR_DATA}>
                            <button className={cx('user')}>
                                <ImageWithRef src={JpgImages.avatar} className={cx('avatar')} alt="Nguyễn Xuân Huy" />
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
