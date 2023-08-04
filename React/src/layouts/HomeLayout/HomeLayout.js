import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from '~/containers/Header/Header';
import SideBar from '~/containers/SideBar/SideBar';

const cx = classnames.bind(styles);

class HomeLayout extends PureComponent {
    render() {

        return (
            <div className={cx('home-layout')}>
                <Header />
                <SideBar />

                <div className={cx('home-section')}>Nguyễn Xuân Huy</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(HomeLayout);
