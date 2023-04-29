import { Component } from 'react';
import className from 'classnames/bind';
import { BsSearch } from 'react-icons/bs';

import styles from './Header.module.scss';
import logo from '~/assets/logo/logo-with-text.png';

const cx = className.bind(styles);

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('header')}>
                <img src={logo} className={cx('logo')} alt="cvonline.com" />
                <div className={cx('search')}>
                    <input className={cx('search-input')} />
                    <span className={cx('search-icon')} >
                        <BsSearch/>
                    </span>
                </div>

                <div className={cx('actions')}>
                    <a href="#!" className={cx('btn', 'signin')}>
                        Đăng nhập
                    </a>
                    <a href="#!" className={cx('btn', 'signup')}>
                        Đăng ký
                    </a>
                </div>
            </div>
        );
    };
}

export default Header;
