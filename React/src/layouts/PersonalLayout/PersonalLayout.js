import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import HeadlessTippy from '@tippyjs/react/headless';
import { Buffer } from 'buffer';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import * as userActions from '~/store/actions';

const cx = classnames.bind(styles);

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            avatarBase64: '',

            visible: false,
            // User DB
            avatar: '',
            fullName: this.props?.user?.fullName || '',
            jobPosition: this.props?.user?.jobPosition || '',
            dateOfBirth: this.props?.user?.dateOfBirth || '',
            gender: this.props?.user?.gender || '',
            phoneNumber: this.props?.user?.phoneNumber || '',
            email: this.props?.user?.email || '',
            address: this.props?.user?.address || '',
            languages: this.props?.user?.languages || '',
            // Product Data sent to DB
            productDataSentToBD: [],
        };
        this.languagesRef = React.createRef();
    }

    handleCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getAvatarUrlFromChangeImageModal = (url) => {
        if (url !== this.state.avatar) {
            // Up avtar to Database
            const data = { id: this.props?.user?.id, avatar: url };
            this.props.updateUserInformation('avatar', data);
            this.setState({ avatar: url });
        }
    };

    handleUpdateUserInformation = async (e, name, toastText) => {
        let value;
        if (name === 'jobPosition') {
            value = e.target.value;
        } else {
            value = e.target.innerText?.trim();
        }

        if (value !== this.state[name]) {
            // Fix Bug
            console.log('value', value);
            console.log('this.state[name]', this.state[name] ? 'Undefined' : 'Không có gì');
            const data = { id: this.props?.user?.id, [name]: value };
            await this.props.updateUserInformation(toastText, data);
            await this.setState({ [name]: value });
        }
    };

    handleInputLanguages = (e) => {
        this.setState({
            languages: e.target.value,
        });
    };

    handleUpdateLanguages = (e) => {
        let value = e.target.value?.trim();
        if (value !== this.languagesRef.current) {
            const data = { id: this.props?.user?.id, languages: this.state.languages || '' };
            this.props.updateUserInformation('ngoại ngữ', data);
            this.languagesRef.current = value;
        }
    };

    async componentDidMount() {
        await this.props.readUserInformation(this.props?.user?.id);
        await this.props.readProductList(this.props?.user?.id);

        const productDataSentToBD = this.props.productList.map((product) => {
            return {
                productId: product.productInfo.id,
                FE: {
                    page: 1,
                    pageSize: 10,
                },
                BE: {
                    page: 1,
                    pageSize: 10,
                },
            };
        });

        this.setState({ productDataSentToBD });

        // Fix bug
        const textarea = document.getElementById('js-languages-input');
        textarea?.addEventListener('change', function () {
            console.log(123);
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        // Convert Buffer Image type to Base 64 and finally Binary
        let binaryImage;
        const avatar = this.props.user?.avatar;
        if (avatar) {
            binaryImage = Buffer.from(avatar, 'base64').toString('binary');
            this.setState({ avatar: binaryImage });
        }

        this.languagesRef.current = this.state.languages;
    }

    render = () => {
        console.log('this.props.productList ', this.state.productDataSentToBD);
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
                                                    src={this.state.avatar || JpgImages.avatarPlaceholder}
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
                                        onblur={(e) => this.handleUpdateUserInformation(e, 'fullName', 'họ và tên')}
                                    />
                                    <select
                                        className={cx('select-job-title')}
                                        onMouseEnter={(e) => e.target.focus()}
                                        onChange={(e) =>
                                            this.handleUpdateUserInformation(e, 'jobPosition', 'vị trí ứng tuyển')
                                        }
                                    >
                                        <option className={cx('option-job-title')} value="Fullstack developer">
                                            Fullstack developer
                                        </option>
                                        <option className={cx('option-job-title')} value="Frontend developer">
                                            Frontend developer
                                        </option>
                                        <option className={cx('option-job-title')} value="Backend developer">
                                            Backend developer
                                        </option>
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
                                                    onblur={(e) =>
                                                        this.handleUpdateUserInformation(e, 'dateOfBirth', 'ngày sinh')
                                                    }
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
                                                    onblur={(e) =>
                                                        this.handleUpdateUserInformation(e, 'gender', 'giới tính')
                                                    }
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
                                                    onblur={(e) =>
                                                        this.handleUpdateUserInformation(
                                                            e,
                                                            'phoneNumber',
                                                            'số điện thoại',
                                                        )
                                                    }
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
                                                    onblur={(e) =>
                                                        this.handleUpdateUserInformation(e, 'email', 'email')
                                                    }
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
                                                    onblur={(e) =>
                                                        this.handleUpdateUserInformation(e, 'address', 'địa chỉ')
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('separate')}></div>

                                    <div className={cx('candidate-info')}>
                                        <p className={cx('text')}>Trình độ ngoại ngữ</p>
                                        <textarea
                                            id="js-languages-input"
                                            placeholder="Nhập chứng chỉ hoặc trình độ tương đương"
                                            className={cx('language-desc')}
                                            spellCheck={false}
                                            value={this.state.languages}
                                            onInput={(e) => this.handleInputLanguages(e)}
                                            onBlur={(e) => this.handleUpdateLanguages(e)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('col pc-9')}>
                                <div className={cx('product-list')}>
                                    <Product />
                                    {this.props.productList?.map((product, index) => {
                                        return <Product key={index} productData={product} />;
                                    })}
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
        productList: state.user.productList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // CRUD user information
        readUserInformation: (id) =>
            dispatch(userActions.readUserInformation('thông tin người dùng', 'USER_INFORMATION', id)),
        updateUserInformation: (toastText, data) =>
            dispatch(userActions.updateUserInformation(toastText, 'USER_INFORMATION', data, true)),

        // CRUD product list
        readProductList: (id) => dispatch(userActions.readProductList('danh sách sản phẩm', 'PRODUCT_LIST', id)),
        updateProductList: (userId, productId) =>
            dispatch(userActions.readProductList('danh sách sản phẩm', 'PRODUCT_LIST', userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
