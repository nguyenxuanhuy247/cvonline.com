import { Component } from 'react';
import className from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt, FaRoad, FaUniversity, FaUserCircle, FaAddressBook, FaGraduationCap } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import Header from '~/containers/Header/Header.js';
import Product from '~/containers/Personal/Product.js';
import styles from './PersonalLayout.module.scss';
import avatar from '~/assets/img/avatar.jpg';

const cx = className.bind(styles);

class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div>
                <header className={cx('header')}>
                    <Header />
                </header>
                <div className={cx('container')}>
                    <aside className={cx('sidebar')}>
                        <div className={cx('page')}>
                            <span className={cx('icon')}>
                                <AiFillHome />
                            </span>
                            <span className={cx('name')}>Home</span>
                        </div>
                        <div className={cx('page')}>
                            <span className={cx('icon')}>
                                <FaUserAlt />
                            </span>
                            <span className={cx('name')}>Personal</span>
                        </div>
                        <div className={cx('page')}>
                            <span className={cx('icon')}>
                                <FaRoad />
                            </span>
                            <span className={cx('name')}>Route</span>
                        </div>
                    </aside>
                    <main className={cx('main')}>
                        <div className={cx('wrapper')}>
                            {/* Column left */}
                            <div className={cx('col-left')}>
                                {/* Candidate */}
                                <div className={cx('candidate')}>
                                    <img src={avatar} className={cx('avatar')} alt="Nguyen Xuan Huy" />
                                    <strong className={cx('name')}>Nguyễn Xuân Huy</strong>
                                </div>

                                {/* Candidate info */}
                                <div className={cx('candidate-info')}>
                                    <p className={cx('text')}>Thông tin cá nhân</p>
                                    <div className={cx('content')}>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <BsFillCalendarDayFill />
                                            </span>
                                            <span className={cx('info-text')}>24/07/1993</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaUserCircle />
                                            </span>
                                            <span className={cx('info-text')}>Nam</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <BsFillTelephoneFill />
                                            </span>
                                            <span className={cx('info-text')}>0356 118 188</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <MdEmail />
                                            </span>
                                            <span className={cx('info-text')}>nguyenxuanhuy24071993@gmail.com</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaAddressBook />
                                            </span>
                                            <span className={cx('info-text')}>
                                                Số nhà 126, xóm 1, Vĩnh Thanh, Vĩnh Ngọc, Đông Anh, Hà Nội
                                            </span>
                                        </artical>
                                    </div>
                                </div>

                                {/* Literacy */}
                                <div className={cx('literacy')}>
                                    <p className={cx('text')}>Trình độ học vấn</p>
                                    <div className={cx('content')}>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaUniversity />
                                            </span>
                                            <span className={cx('info-text')}>Trường Đại Học Công Nghiệp Hà Nội</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaGraduationCap />
                                            </span>
                                            <span className={cx('info-text')}>Khoa Cơ Khí</span>
                                        </artical>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className={cx('Languages')}>
                                    <p className={cx('text')}>Trình độ ngoại ngữ</p>
                                    <div className={cx('content')}>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaUniversity />
                                            </span>
                                            <span className={cx('info-text')}>Tiếng Anh</span>
                                        </artical>
                                        <artical className={cx('info')}>
                                            <span className={cx('icon')}>
                                                <FaGraduationCap />
                                            </span>
                                            <span className={cx('info-text')}>Tiếng Nhật</span>
                                        </artical>
                                    </div>
                                </div>
                            </div>

                            {/* Column right */}
                            <div className={cx('col-right')}>
                                <div className={cx('row-job-title')}>
                                    <span className={cx('job-title')}>Fullstack developer</span>
                                </div>

                                {/* experience */}
                                <div className={cx('experience')}>
                                    <div className={cx('real-product')}>
                                        <p className={cx('title')}>SẢN PHẨM THỰC TẾ</p>
                                    </div>
                                    <div className={cx('product-list')}>
                                        <Product />
                                        <Product />
                                        <Product />
                                        <Product />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    };
}

export default PersonalPage;
