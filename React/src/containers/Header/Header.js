import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultTippy from '@tippyjs/react';
import { FaBell } from 'react-icons/fa';

import styles from './Header.module.scss';
import logoWithText from '~/assets/logo/logo-with-text.png';
import logo from '~/assets/logo/logo.png';
import Image from '~/components/Image/Image.js';
import { path } from '~/utils';
import Menu from '~/components/Popover/Menu/Menu.js';
import Button from '~/components/Button/Button.js';
import SearchBar from '~/containers/Header/SearchBar.js';
import { JpgImages } from '~/components/Image/Images.js';

import { MENU_AVATAR_DATA } from '~/components/Popover/Menu/MenuData.js';

const cx = classnames.bind(styles);

class Header extends PureComponent {
    handleChangeActiveButton = (e) => {
        const isActive = e.target.classList.contains(cx('active'));
        if (!isActive) {
            const allButtons = document.querySelectorAll(`.${cx('btn')}`);
            if (allButtons) {
                allButtons.forEach((button) => {
                    button.classList.remove(cx('active'));
                });
            }

            e.currentTarget.classList.add(cx('active'));
        }
    };

    render = () => {
        return (
            <div className={cx('header')}>
                <Link to={'/'} className={cx('logo-link', 'hide-on-table-mobile')}>
                    <img src={logoWithText} className={cx('logo')} alt="cvonline.com" />
                </Link>

                <Link to={'/'} className={cx('logo-link', 'hide-on-table-pc')}>
                    <img src={logo} className={cx('logo')} alt="cvonline.com" />
                </Link>

                <SearchBar className={cx('search-bar')} />

                {!this.props.isSignIn ? (
                    <div className={cx('actions')}>
                        <Button
                            route={path.SIGNIN}
                            className={cx('btn', 'active')}
                            onMouseOver={(e) => this.handleChangeActiveButton(e)}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            route={path.SIGNUP}
                            className={cx('btn', 'hide-on-mobile')}
                            onMouseOver={(e) => this.handleChangeActiveButton(e)}
                        >
                            Đăng ký
                        </Button>
                    </div>
                ) : (
                    <div className={cx('login')}>
                        <DefaultTippy content="Thông báo" arrow="" offset={[0, 10]}>
                            <Button className={cx('icon')}>
                                <FaBell />
                            </Button>
                        </DefaultTippy>

                        <Menu data={MENU_AVATAR_DATA}>
                            <Button className={cx('user')}>
                                <Image
                                    src={this.props?.avatar || JpgImages.avatarPlaceholder}
                                    wrapperClass={cx('wapper')}
                                    className={cx('avatar')}
                                    alt={this.props?.fullName}
                                    round
                                />
                                {this.props?.fullName && <span className={cx('fullname')}>{this.props?.fullName}</span>}
                            </Button>
                        </Menu>
                    </div>
                )}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
        fullName: state.user.owner?.fullName,
        avatar: state.user.owner?.avatar,
        productList: state.user.productList,
    };
};

export default connect(mapStateToProps, null)(Header);
