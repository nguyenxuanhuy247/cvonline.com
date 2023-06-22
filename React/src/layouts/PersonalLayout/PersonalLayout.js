import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { TbLanguageHiragana } from 'react-icons/tb';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { BsPlusCircleDotted } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';
import DefaultTippy from '@tippyjs/react';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';

const cx = classnames.bind(styles);

const LANGUAGES = [
    {
        id: 1,
        placeholder: 'Tiếng anh',
    },
    {
        id: 2,
        placeholder: 'Tiếng nhật',
    },
];

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            avatarUrl: '',
            avatarBase64: '',

            visible: false,
            dateOfBirth: '',
        };
    }

    handleCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getAvatarUrlFromChangeImageModal = (url) => {
        const data = { id: this.props?.user?.id, avatar: url };
        this.props.updateUserInformation(data);
        this.setState({ avatarUrl: url });
    };

    handleInputUserInformation = (e, name) => {
        this.setState({ name: e.target.innerHTML });
    };

    componentDidMount() {
        this.props.readUserInformation(this.props?.user?.id);
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('grid wide')}>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-3')}>
                                <div className={cx('col-left')}>
                                    <div className={cx('avatar-wrapper')}>
                                        <div className={cx('border-outline')}>
                                            <HeadlessTippy
                                                zIndex="10"
                                                placement="bottom"
                                                interactive
                                                delay={[0, 300]}
                                                offset={[0, -100]}
                                                render={(attrs) => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <div
                                                            className={cx('tooltip')}
                                                            onClick={() => this.setState({ isModalOpen: true })}
                                                        >
                                                            Sửa ảnh
                                                        </div>
                                                    </div>
                                                )}
                                            >
                                                <Image
                                                    className={cx('avatar')}
                                                    src={this.state.avatarUrl || JpgImages.avatarPlaceholder}
                                                    width="170px"
                                                    height="170px"
                                                    alt={`${this.props?.user?.fullName}`}
                                                    round
                                                />
                                            </HeadlessTippy>
                                            {this.state.isModalOpen && (
                                                <ChangeImageModal
                                                    round
                                                    onClose={this.handleCloseChangeImageModal}
                                                    onGetUrl={this.getAvatarUrlFromChangeImageModal}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <ContentEditableTag
                                        content={this.props?.user?.fullName}
                                        className={cx('full-name')}
                                        placeholder="Nguyễn Xuân Huy"
                                    />
                                    <select className={cx('select-job-title')} onMouseEnter={(e) => e.target.focus()}>
                                        <option className={cx('option-job-title')}>Fullstack developer</option>
                                        <option className={cx('option-job-title')}>Frontend developer</option>
                                        <option className={cx('option-job-title')}>Backend developer</option>
                                    </select>

                                    <div className={cx('separate')}></div>

                                    <div className={cx('candidate-info')}>
                                        <p className={cx('text')}>Thông tin cá nhân</p>
                                        <div className={cx('content')}>
                                            <div className={cx('info')}>
                                                <span className={cx('icon')}>
                                                    <BsFillCalendarDayFill />
                                                </span>
                                                <ContentEditableTag
                                                    content={this.props?.user?.dateOfBirth}
                                                    className={cx('info-text')}
                                                    placeholder="Ngày tháng năm sinh"
                                                    oninput={(e) => this.handleInputUserInformation(e, 'dateOfBirth')}
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <span className={cx('icon')}>
                                                    <FaUserCircle />
                                                </span>
                                                <ContentEditableTag
                                                    content={this.props?.user?.gender}
                                                    className={cx('info-text')}
                                                    placeholder="Giới tính"
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <span className={cx('icon')}>
                                                    <BsFillTelephoneFill />
                                                </span>
                                                <ContentEditableTag
                                                    content={this.props?.user?.phoneNumber}
                                                    className={cx('info-text')}
                                                    placeholder="Số điện thoại"
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <span className={cx('icon')}>
                                                    <MdEmail />
                                                </span>
                                                <ContentEditableTag
                                                    content={this.props?.user?.email}
                                                    className={cx('info-text')}
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <span className={cx('icon')}>
                                                    <FaAddressBook />
                                                </span>
                                                <ContentEditableTag
                                                    content={this.props?.user?.address}
                                                    className={cx('info-text')}
                                                    placeholder="Địa chỉ"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('separate')}></div>

                                    <div className={cx('candidate-info')}>
                                        <p className={cx('text')}>Trình độ ngoại ngữ</p>
                                        <div className={cx('content')}>
                                            {LANGUAGES &&
                                                LANGUAGES.map((item) => (
                                                    <div key={item.id} className={cx('info')}>
                                                        <span className={cx('icon')}>
                                                            <TbLanguageHiragana />
                                                        </span>

                                                        <DefaultTippy
                                                            content="Nhập chứng chỉ hoặc trình độ tương đương"
                                                            arrow={false}
                                                        >
                                                            <ContentEditableTag
                                                                className={cx('info-text')}
                                                                placeholder={item.placeholder}
                                                            />
                                                        </DefaultTippy>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className={cx('add-new-language-container')}>
                                            {!this.state.visible ? (
                                                <DefaultTippy content="Thêm ngoại ngữ" arrow={false}>
                                                    <Button
                                                        className={cx('add-new-language')}
                                                        onClick={() => this.setState({ visible: true })}
                                                    >
                                                        <span className={cx('add-new-language-icon')}>
                                                            <BsPlusCircleDotted />
                                                        </span>
                                                    </Button>
                                                </DefaultTippy>
                                            ) : (
                                                <div className={cx('add-language-container')}>
                                                    <label className={cx('add-language-label')}>Thêm ngoại ngữ</label>
                                                    <input
                                                        className={cx('add-language-input')}
                                                        placeholder="Nhập chứng chỉ"
                                                    />
                                                    <div className={cx('add-language-actions')}>
                                                        <Button
                                                            className={cx('btn', 'cancel')}
                                                            onClick={() => this.setState({ visible: false })}
                                                        >
                                                            Hủy
                                                        </Button>
                                                        <Button
                                                            className={cx('btn', 'add')}
                                                            onClick={() => this.setState({ visible: true })}
                                                        >
                                                            Thêm
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('col pc-9')}>
                                <div className={cx('product-list')}>
                                    <Product />
                                </div>
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
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readUserInformation: (id) =>
            dispatch(userActions.readUserInformation('thông tin người dùng', 'USER_INFORMATION', id)),
        updateUserInformation: (data) =>
            dispatch(userActions.updateUserInformation('thông tin người dùng', 'USER_INFORMATION', data, true)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
