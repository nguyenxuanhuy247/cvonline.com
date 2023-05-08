import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import styles from './PersonalInfo.module.scss';

const cx = className.bind(styles);

class Personal_Info extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('candidate-info')}>
                <p className={cx('text')}>Thông tin cá nhân</p>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <BsFillCalendarDayFill />
                        </span>
                        <span className={cx('info-text')}>24/07/1993</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaUserCircle />
                        </span>
                        <span className={cx('info-text')}>Nam</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <BsFillTelephoneFill />
                        </span>
                        <span className={cx('info-text')}>0356 118 188</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <MdEmail />
                        </span>
                        <span className={cx('info-text')}>nguyenxuanhuy24dddddddddddd071993@gmail.com</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaAddressBook />
                        </span>
                        <span className={cx('info-text')}>
                            Số nhà 126, xóm 1, Vĩnh Thanh, Vĩnh Ngọc, Đông Anh, Hà Nội
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal_Info);
