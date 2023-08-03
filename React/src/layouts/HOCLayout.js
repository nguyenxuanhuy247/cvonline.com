import { PureComponent } from 'react';
import classnames from 'classnames/bind';

import Header from '~/containers/Header/Header.js';
import SideBar from '~/containers/SideBar/SideBar';
import styles from './HOCLayout.module.scss';

const cx = classnames.bind(styles);

const HOCLayout = (Layout) => {
    return class HeaderAndSideBarLayout extends PureComponent {
        render() {
            return (
                <div className={cx('header-sidebar-layout')}>
                    <Header />
                    <SideBar />

                    <div className={cx('header-sidebar-section')}>
                        <Layout />
                    </div>
                </div>
            );
        }
    };
};

export default HOCLayout;
