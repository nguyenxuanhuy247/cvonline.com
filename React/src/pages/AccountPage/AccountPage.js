import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { FaUser, FaUsersCog } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';

import styles from './AccountPage.module.scss';
import { MainLayout } from '~/layouts';
import Image from '~/components/Image/Image.js';
import * as userActions from '~/store/actions';
import Loading from '~/components/Modal/Loading.js';
import { JpgImages } from '~/components/Image/Images';
import Button from '~/components/Button/Button.js';
import PersonalInfo from '~/pages/AccountPage/Components/PersonalInfo.js';
import PasswordSetting from '~/pages/AccountPage/Components/PasswordSetting.js';
import UserIDSetting from '~/pages/AccountPage/Components/UserIDSetting.js';
import { path } from '~/utils';

const cx = classnames.bind(styles);

class AccountPage extends PureComponent {
    render() {
        return (
            <MainLayout>
                <div className={cx('account-page')}>
                    <div className={cx('left-col')}>
                        <span className={cx('title')}>Cài đặt</span>
                        <div className={cx('item-list')}>
                            <Link to={path.PERSONALINFO} className={cx('item')}>
                                <FaUser className={cx('icon')} />
                                <span className={cx('text')}>Thông tin tài khoản</span>
                            </Link>
                            <Link to={path.PASSWORDSETTING} className={cx('item')}>
                                <MdVerifiedUser className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt mật khẩu</span>
                            </Link>
                            <Link to={path.USERIDSETTING} className={cx('item')}>
                                <FaUsersCog className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt ID người dùng</span>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('right-col')}>
                        <Switch>
                            <Route path={path.PERSONALINFO} component={PersonalInfo} />
                            <Route path={path.PASSWORDSETTING} component={PasswordSetting} />
                            <Route path={path.USERIDSETTING} component={UserIDSetting} />
                        </Switch>
                    </div>
                    {/* {this.props.isLoading && <Loading text="Đang tải..." />} */}
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
