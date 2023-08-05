import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './HomePage.module.scss';
import { MainLayout } from '~/layouts';

const cx = classnames.bind(styles);

class HomePage extends PureComponent {
    render() {
        return (
            <MainLayout>
                <div className={cx('home-page')}>Nguyễn Xuân Huy</div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(HomePage);
