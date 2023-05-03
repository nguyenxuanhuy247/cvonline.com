import { Component } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

import styles from './Header.module.scss';
import logo from '~/assets/logo/logo-with-text.png';

const cx = className.bind(styles);

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        console.log(this.props.isSignIn)
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
                                Công cụ
                            </Link>
                        </li>
                    </ul>
                </nav>

                {!this.props.isSignIn ? (
                    <div className={cx('actions')}>
                        <Link to={'/signin'} className={cx('signin')}>
                            Đăng nhập
                        </Link>
                        <Link to={'/signup'} className={cx('signup')}>
                            Đăng ký
                        </Link>
                    </div>
                ) : (
                    <div className={cx('login')}>
                        <button className={cx('icon')}>
                            <FaBell />
                        </button>
                        <button className={cx('icon')}>
                            <RiMessage2Fill />
                        </button>
                        <span className={cx('icon')}></span>
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

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
