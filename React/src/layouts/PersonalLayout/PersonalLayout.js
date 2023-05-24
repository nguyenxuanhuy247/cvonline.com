import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';
import { RiEnglishInput } from 'react-icons/ri';
import { TbLanguageHiragana } from 'react-icons/tb';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import Modal from '~/components/Modal/Modal.js';

const cx = classnames.bind(styles);

const PERSONAL_INFO = [
    {
        id: 1,
        icon: <BsFillCalendarDayFill />,
        placeholder: 'Ngày tháng năm sinh',
    },
    {
        id: 2,
        icon: <FaUserCircle />,
        placeholder: 'Giới tính',
    },
    {
        id: 3,
        icon: <BsFillTelephoneFill />,
        placeholder: 'Số điện thoại',
    },
    {
        id: 4,
        icon: <MdEmail />,
        placeholder: 'Email',
    },
    {
        id: 5,
        icon: <FaAddressBook />,
        placeholder: 'Địa chỉ',
    },
];

const LITERACY = [
    {
        id: 1,
        icon: <FaUniversity />,
        placeholder: 'Trường đại hoc',
    },
    {
        id: 2,
        icon: <FaGraduationCap />,
        placeholder: 'Khoa - chuyên ngành',
    },
];

const LANGUAGES = [
    {
        id: 1,
        icon: <RiEnglishInput />,
        placeholder: 'Tiếng anh',
    },
    {
        id: 2,
        icon: <TbLanguageHiragana />,
        placeholder: 'Tiếng nhật',
    },
];

class CVLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            isModalOpen: false,
        };
    }

    handleGetContent(data) {
        console.log(data);
    }

    render = () => {
        const { fullName = 'Nguyễn Xuân Huy', isModalOpen } = this.state;

        return (
            <div className={cx('body')}>
                <Header />
                <Modal isModalOpen={isModalOpen}/>
                <div className={cx('container')}>
                    <div className={cx('grid')}>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-9')}>
                                <div className={cx('wrapper')}>
                                    <div className={cx('row no-gutters')}>
                                        <div className={cx('col pc-3')}>
                                            <div className={cx('col-left')}>
                                                <div className={cx('avatar-wrapper')}>
                                                    <Image
                                                        wrapperClass={cx('inner')}
                                                        className={cx('avatar')}
                                                        src={JpgImages.avatar}
                                                        width="170px"
                                                        height="170px"
                                                        alt={`${fullName}`}
                                                        editButton="Sửa ảnh"
                                                        round
                                                    />
                                                </div>
                                                <ContentEditableTag
                                                    className={cx('full-name')}
                                                    placeholder="Nguyễn Xuân Huy"
                                                    innerText={`${fullName}`}
                                                    onKeyDown={this.handleGetContent}
                                                />
                                                <ContentEditableTag
                                                    className={cx('job-title')}
                                                    placeholder="VD: Fullstack developer"
                                                    reduxName="jobTitle"
                                                />
                                                <PersonalInfo title="Thông tin cá nhân" data={PERSONAL_INFO} />
                                                <div className={cx('separate')}></div>
                                                <PersonalInfo title="Trình độ học vấn" data={LITERACY} />
                                                <div className={cx('separate')}></div>
                                                <PersonalInfo title="Trình độ ngoại ngữ" data={LANGUAGES} />
                                            </div>
                                        </div>
                                        <div className={cx('col pc-9')}>
                                            <div className={cx('col-right')}>
                                                <div className={cx('product-list')}>
                                                    <Product />
                                                    <Product />
                                                    <Product />
                                                    <Product />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('col pc-3')}>
                                <div className={cx('text')}>Đăng nhập Facebook để giao lưu với nhau</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        signInMessage: state.user.signInMessage.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CVLayout);
