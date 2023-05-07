import { Component } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import HeaderNavbarData from './HeaderNavbarData.json';
import styles from './HeaderNavbar.module.scss';
import Button from '~/components/Button/Button.js';

const cx = className.bind(styles);

class HeaderNavbar extends Component {
    constructor(props) {
        super(props);
        this.data = HeaderNavbarData;
    }
    render() {
        return (
            <nav className={cx('navbar')}>
                <ul className={cx('menu')}>
                    {this.data &&
                        this.data.map((item) => {
                            return !item.children ? (
                                <li key={item.id} className={cx('menu-item')}>
                                    <Link to={'#!'} className={cx('menu-link')}>
                                        {item.name}
                                    </Link>
                                </li>
                            ) : (
                                <li key={item.id} className={cx('menu-item')}>
                                    <Link to={'#!'} className={cx('menu-link')}>
                                        {item.name}
                                    </Link>
                                    <ul className={cx('submenu-lv1')}>
                                        {item.children.map((subItem) => {
                                            return (
                                                <li key={subItem.id} className={cx('submenu-item')}>
                                                    <Button
                                                        to={'#!'}
                                                        childrenClass={cx('submenu-link')}
                                                        // leftIcon={<LeftIcon />}
                                                    >
                                                        {subItem.name}
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        );
    }
}

export default HeaderNavbar;
