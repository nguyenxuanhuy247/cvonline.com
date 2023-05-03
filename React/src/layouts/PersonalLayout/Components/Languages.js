import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

import styles from './Languages.module.scss';
import avatar from '~/assets/img/avatar.jpg';

const cx = className.bind(styles);

class Languages extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('Languages')}>
                <p className={cx('text')}>Trình độ ngoại ngữ</p>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaUniversity />
                        </span>
                        <span className={cx('info-text')}>Tiếng Anh</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaGraduationCap />
                        </span>
                        <span className={cx('info-text')}>Tiếng Nhật</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
