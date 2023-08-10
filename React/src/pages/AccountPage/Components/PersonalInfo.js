import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './PersonalInfo.module.scss';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class PersonalInfo extends PureComponent {
    render() {
        return (
            <div className={cx('personal-info')}>
                <span className={cx('title')}>Thông tin tài khoản</span>
                <div className={cx('required')}>
                    <span className={cx('symbol')}>(*)</span> Các thông tin bắt buộc
                </div>

                <form className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="full-name" className={cx('form-label')}>
                            Họ và tên <span className={cx('symbol')}>*</span>
                        </label>
                        <input type="text" id="full-name" className={cx('form-input')} placeholder="Nguyễn Xuân Huy" />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={cx('form-input')}
                            placeholder="VD: nguyenxuanhuy@gmail.com"
                        />
                    </div>

                    <Button className={cx('save-btn')}>Lưu</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
