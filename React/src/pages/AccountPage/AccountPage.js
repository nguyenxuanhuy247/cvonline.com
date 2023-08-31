import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames/bind';
import { FaUser, FaUsersCog } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';

import styles from './AccountPage.module.scss';
import { MainLayout } from '~/layouts';
import { path } from '~/utils';

const cx = classnames.bind(styles);

class AccountPage extends PureComponent {
    render() {
        const pathName = window.location.pathname;

        return this.props.isSignIn ? (
            <MainLayout>
                <div className={cx('account-page')}>
                    <div className={cx('left-col')}>
                        <span className={cx('title')}>Cài đặt</span>
                        <div className={cx('item-list')}>
                            <Link
                                to={path.PERSONALINFO}
                                className={cx('item', { hover: pathName === path.PERSONALINFO })}
                            >
                                <FaUser className={cx('icon')} />
                                <span className={cx('text')}>Thông tin tài khoản</span>
                            </Link>
                            <Link
                                to={path.PASSWORDSETTING}
                                className={cx('item', { hover: pathName === path.PASSWORDSETTING })}
                            >
                                <MdVerifiedUser className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt mật khẩu</span>
                            </Link>
                            <Link
                                to={path.USERIDSETTING}
                                className={cx('item', { hover: pathName === path.USERIDSETTING })}
                            >
                                <FaUsersCog className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt ID người dùng</span>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('right-col')}>{this.props.children}</div>
                </div>
            </MainLayout>
        ) : (
            <Redirect
                to={{
                    pathname: path.SIGNIN,
                    state: { from: pathName },
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
