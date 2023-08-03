import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Header from '~/containers/Header/Header.js';
import SideBar from '~/containers/SideBar/SideBar';
import styles from './HomeLayout.module.scss';
import HOCLayout from '../HOCLayout.js';

const cx = classnames.bind(styles);

class HomeLayout extends PureComponent {
    render() {
        return <div className={cx('home-layout')}>Nguyễn Xuân Huy</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(HOCLayout(HomeLayout));
