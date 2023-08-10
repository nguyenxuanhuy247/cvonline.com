import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { FaUser, FaUsersCog } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';

import styles from './UserIDSetting.module.scss';
import { MainLayout } from '~/layouts';
import Image from '~/components/Image/Image.js';
import * as userActions from '~/store/actions';
import Loading from '~/components/Modal/Loading.js';
import { JpgImages } from '~/components/Image/Images';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class UserIDSetting extends PureComponent {
    render() {
        return (
            <MainLayout>
                <div className={cx('account-page')}>
                    <div className={cx('left-col')}>
                        <span className={cx('title')}>Cài đặt</span>
                        <div className={cx('item-list')}>
                            <Button className={cx('item')}>
                                <FaUser className={cx('icon')} />
                                <span className={cx('text')}>Thông tin tài khoản</span>
                            </Button>
                            <Button className={cx('item')}>
                                <MdVerifiedUser className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt mật khẩu</span>
                            </Button>
                            <Button className={cx('item')}>
                                <FaUsersCog className={cx('icon')} />
                                <span className={cx('text')}>Cài đặt ID người dùng</span>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('right-col')}>Nguyễn Xuân Huy</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserIDSetting);
