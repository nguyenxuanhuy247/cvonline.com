import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import { HEADER_NAVBAR_DATA } from '~/components/MenuData/MenuData.js';
import styles from './HeaderNavbar.module.scss';
import Button from '~/components/Button/Button.js';
const cx = className.bind(styles);

class HeaderNavbar extends PureComponent {
    constructor(props) {
        super(props);
        this.data = HEADER_NAVBAR_DATA;
    }
    render() {
        return (
            <nav className={cx('navbar')}>
                <ul className={cx('menu')}>
                    {this.data &&
                        this.data.map((item) => {
                            return !item.children ? (
                                <li key={item.id} className={cx('menu-item')}>
                                    <Link to={item.route} className={cx('menu-link')}>
                                        {item.name}
                                    </Link>
                                </li>
                            ) : (
                                <li key={item.id} className={cx('menu-item')}>
                                    <Link to={item.route} className={cx('menu-link')}>
                                        {item.name}
                                    </Link>

                                    <ul className={cx('submenu-lv1')}>
                                        {item.children.map((subItem) => {
                                            return (
                                                <li key={subItem.id} className={cx('submenu-item')}>
                                                    <Button
                                                        to={'#!'}
                                                        buttonClass={cx('button')}
                                                        childrenClass={cx('submenu-link')}
                                                        rightIconClass={cx('right-icon')}
                                                        leftIcon={subItem.leftIcon}
                                                        rightIcon={subItem.rightIcon}
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