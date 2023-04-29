import { Component } from 'react';
import className from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt, FaRoad, FaUniversity, FaUserCircle, FaAddressBook } from 'react-icons/fa';
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
                        {/* Section 1 */}
                        <div className={cx('section-1')}>
                            <div className={cx('candidate')}>
                                <img src={avatar} className={cx('avatar')} alt="Nguyen Xuan Huy" />
                                <strong className={cx('name')}>Nguyễn Xuân Huy</strong>
                            </div>
                            <div className={cx('apply-job')}>
                                <span className={cx('job-title')}>Fullstack developer</span>
                                <div className={cx('skills')}>React + Express</div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className={cx('section-2')}>
                            <section className={cx('detail-info')}>
                                <p className={cx('text')}>Giới thiệu</p>
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
                            </section>
                        </div>

                        {/* Section 3 */}
                        <div className={cx('section-3')}>
                            <section className={cx('experience')}>
                                <Product />
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        );
    };
}

export default PersonalPage;
