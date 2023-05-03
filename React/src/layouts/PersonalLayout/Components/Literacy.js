import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

import styles from './Literacy.module.scss';
import avatar from '~/assets/img/avatar.jpg';

const cx = className.bind(styles);

class Literacy extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('literacy')}>
                <p className={cx('text')}>Trình độ học vấn</p>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaUniversity />
                        </span>
                        <span className={cx('info-text')}>Trường Đại Học Công Nghiệp Hà Nội</span>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('icon')}>
                            <FaGraduationCap />
                        </span>
                        <span className={cx('info-text')}>Khoa Cơ Khí</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Literacy);
