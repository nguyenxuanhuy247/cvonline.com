import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';

import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';
import { RiEnglishInput } from 'react-icons/ri';
import { TbLanguageHiragana } from 'react-icons/tb';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import AvatarFullname from '~/layouts/PersonalLayout/Components/AvatarFullname.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';

const cx = className.bind(styles);

const PERSONAL_INFO = [
    {
        id: 1,
        icon: <BsFillCalendarDayFill />,
        text: '24/07/1993',
    },
    {
        id: 2,
        icon: <FaUserCircle />,
        text: 'Nam',
    },
    {
        id: 3,
        icon: <BsFillTelephoneFill />,
        text: '0356 118 188',
    },
    {
        id: 4,
        icon: <MdEmail />,
        text: 'nguyenxuanhuy24dddddddddddd071993@gmail.com',
    },
    {
        id: 5,
        icon: <FaAddressBook />,
        text: 'Số nhà 126, xóm 1, Vĩnh Thanh, Vĩnh Ngọc, Đông Anh, Hà Nội',
    },
];

const LITERACY = [
    {
        id: 1,
        icon: <FaUniversity />,
        text: 'Trường Đại Học Công Nghiệp Hà Nội',
    },
    {
        id: 2,
        icon: <FaGraduationCap />,
        text: 'Khoa Cơ Khí',
    },
];

const LANGUAGES = [
    {
        id: 1,
        icon: <RiEnglishInput />,
        text: 'Tiếng Anh',
    },
    {
        id: 2,
        icon: <TbLanguageHiragana />,
        text: 'Tiếng Nhật',
    },
];

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <Header />
                <div className={cx('wrapper', 'container')}>
                    <div className={cx('col-left', 'col-3')}>
                        <AvatarFullname />
                        <PersonalInfo title="Thông tin cá nhân" data={PERSONAL_INFO} />
                        <div className={cx('separate')}></div>
                        <PersonalInfo title="Trình độ học vấn" data={LITERACY} />
                        <div className={cx('separate')}></div>
                        <PersonalInfo title="Trình độ ngoại ngữ" data={LANGUAGES} />
                    </div>

                    <div className={cx('col-right', 'col-9')}>
                        <div className={cx('job-title')}>
                            <ContentEditableTag
                                className="job-title"
                                placeholder="VD: Fullstack developer"
                                reduxName="jobTitle"
                            />
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
        );
    };
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
