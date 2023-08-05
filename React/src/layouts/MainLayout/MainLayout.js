import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '~/containers/Header/Header';
import SideBar from '~/containers/SideBar/SideBar';

const cx = classnames.bind(styles);

class MainLayout extends PureComponent {
    render() {
        return (
            <div className={cx('main-layout')}>
                <Header />
                <SideBar />

                <div className={cx('main-section')}>{this.props.children}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(MainLayout);
