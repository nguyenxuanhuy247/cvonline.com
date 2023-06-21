import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import styles from './PersonalInformation.module.scss';

const cx = className.bind(styles);

class PersonalInformation extends PureComponent {
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
                        <ContentEditableTag className={cx('info-text')} placeholder="Ngày tháng năm sinh" />
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaUserCircle />
                        </span>
                        <ContentEditableTag className={cx('info-text')} placeholder="Giới tính" />
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <BsFillTelephoneFill />
                        </span>
                        <ContentEditableTag className={cx('info-text')} placeholder="Số điện thoại" />
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <MdEmail />
                        </span>
                        <ContentEditableTag
                            content={this.props?.email}
                            className={cx('info-text')}
                            placeholder="Email"
                        />
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaAddressBook />
                        </span>
                        <ContentEditableTag className={cx('info-text')} placeholder="Địa chỉ" />
                    </div>
                </div>
            </div>
        );
    };
}

export default PersonalInformation;
