import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
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
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.languagesRef = React.createRef();
    }

    // =================================================================
    // CRUD USER INFORMATION

    getAvatarUrlFromChangeImageModal = async (url) => {
        const userId = this.props?.user?.id;
        const avatarDB = this.props?.user?.avatar;
        let binaryAvatarDB;

        if (avatarDB) {
            binaryAvatarDB = Buffer.from(avatarDB, 'base64').toString('binary');
        }

        if (url !== binaryAvatarDB) {
            // Update avatar to Database
            const data = { userId: userId, avatar: url };
            const errorCode = await this.props.updateUserInformation('avatar', data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        }
    };

    handleUpdateUserInformation = async (e, name, toastText) => {
        const userId = this.props?.user?.id;
        let value;
        if (name === 'jobPosition') {
            value = e.target.value;
        } else {
            value = e.target.innerText?.trim();
        }

        if (value !== this.props.user[name]) {
            const data = { userId: userId, [name]: value };
            const errorCode = await this.props.updateUserInformation(toastText, data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        }
    };

    handleUpdateLanguages = (e) => {
        let value = e.target.value?.trim();
        if (value !== this.languagesRef.current) {
            const data = { id: this.props?.user?.id, languages: this.state.languages || '' };
            this.props.updateUserInformation('ngoại ngữ', data);
            this.languagesRef.current = value;
        }
    };

    // =================================================================
    // CRUD PRODUCT
    handleCreateNewTechnology = async (data, type) => {
        const newData = {
            ...data,
            userId: this.props?.user?.id,
        };
        console.log(newData);
        const errorCode = await this.props.createTechnology(newData, type);

        if (errorCode === 0) {
            await this.props.readProductList(this.props?.user?.id);
            return errorCode;
        }
    };

    handleUpdateTechnology = async (data, type, showToast = true) => {
        const newData = {
            ...data,
            userId: this.props?.user?.id,
        };

        const errorCode = await this.props.updateTechnology(newData, type, showToast);
        if (errorCode === 0) {
            await this.props.readProductList(this.props?.user?.id);
            return errorCode;
        }
    };

    handleDeleteTechnology = async (id, type) => {
        const errorCode = await this.props.deleteTechnology(id, type);
        if (errorCode === 0) {
            await this.props.readProductList(this.props?.user?.id);
            return errorCode;
        }
    };

    // =================================================================
    // CRUD Product

    handleCreateProduct = async () => {
        const userId = this.props?.user?.id;
        const errorCode = await this.props.createProduct(userId);

        if (errorCode === 0) {
            await this.props.readProductList(this.props?.user?.id);
        }
    };

    handleUpdateProduct = async (data, toastText) => {
        const userId = this.props?.user?.id;
        const newData = { ...data, userId: userId };

        const errorCode = await this.props.updateProduct(newData, toastText);
        if (errorCode === 0) {
            await this.props.readProductList(userId);
        }
    };

    handleDeleteProduct = async (productId) => {
        const userId = this.props?.user?.id;
        const errorCode = await this.props.deleteProduct(userId, productId);

        if (errorCode === 0) {
            await this.props.readProductList(userId);
        }
    };

    handleMoveUpProduct = async (order) => {
        const userId = this.props?.user?.id;

        const ASCOrderProductList = this.props.productList?.sort(function (a, b) {
            return a.order - b.order;
        });
        const productExchange = ASCOrderProductList?.map((productID) => {
            return { userId: userId, productId: productID.productInfo.id, productOrder: productID.order };
        });

        const index = productExchange.findIndex((product) => product.productOrder === order);

        let upperItemOrder = productExchange[index - 1];
        let moveItemOrder = productExchange[index];

        if (upperItemOrder) {
            const changedUpperItem = {
                userId: userId,
                productId: upperItemOrder.productId,
                productOrder: moveItemOrder.productOrder,
            };

            const changedMoveItem = {
                userId: userId,
                productId: moveItemOrder.productId,
                productOrder: upperItemOrder.productOrder,
            };

            const errorCode = await this.props.updateProduct(changedUpperItem, 'vị trí');
            if (errorCode === 0) {
                const errorCode = await this.props.updateProduct(changedMoveItem, 'vị trí');

                if (errorCode === 0) {
                    await this.props.readProductList(userId);
                }
            }
        }
    };

    handleMoveDownProduct = async (order) => {
        const userId = this.props?.user?.id;

        const ASCOrderProductList = this.props.productList?.sort(function (a, b) {
            return a.order - b.order;
        });
        const productExchange = ASCOrderProductList?.map((productID) => {
            return { userId: userId, productId: productID.productInfo.id, productOrder: productID.order };
        });

        const index = productExchange.findIndex((product) => product.productOrder === order);

        let lowerItemOrder = productExchange[index + 1];
        let moveItemOrder = productExchange[index];

        if (lowerItemOrder) {
            const changedUpperItem = {
                userId: userId,
                productId: lowerItemOrder.productId,
                productOrder: moveItemOrder.productOrder,
            };

            const changedMoveItem = {
                userId: userId,
                productId: moveItemOrder.productId,
                productOrder: lowerItemOrder.productOrder,
            };

            const errorCode = await this.props.updateProduct(changedUpperItem, 'vị trí');
            if (errorCode === 0) {
                const errorCode = await this.props.updateProduct(changedMoveItem, 'vị trí');

                if (errorCode === 0) {
                    await this.props.readProductList(userId);
                }
            }
        }
    };

    // =================================================================
    async componentDidMount() {
        // Get all data for CV Layout when sign in
        await this.props.readUserInformation(this.props?.user?.id);
        await this.props.readProductList(this.props?.user?.id);

        // Fix bug
        const textarea = document.getElementById('js-languages-input');
        textarea?.addEventListener('change', function () {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        this.languagesRef.current = this.state.languages;
    }

    render = () => {
        // Make product List in ascending order
        const ASCOrderProductList = this.props.productList?.sort(function (a, b) {
            return a.order - b.order;
        });

        // Convert Buffer Image type to Base 64 and finally Binary
        const avatar = this.props.user?.avatar;
        let binaryImage;
        if (avatar) {
            binaryImage = Buffer.from(avatar, 'base64').toString('binary');
        }

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
                                                    src={binaryImage || JpgImages.avatarPlaceholder}
                                                    width="170px"
                                                    height="170px"
                                                    alt={`${this.props?.user?.fullName}`}
                                                    round
                                                />
                                            </HeadlessTippy>

                                            {this.state.isModalOpen && (
                                                <ChangeImageModal
                                                    round
                                                    onClose={() =>
                                                        this.setState({
                                                            isModalOpen: false,
                                                        })
                                                    }
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
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: this.props?.user?.email }}
                                                    className={cx('info-text', 'email')}
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
                                            value={this.props?.user?.languages}
                                            onBlur={(e) => this.handleUpdateLanguages(e)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('col pc-9')}>
                                <div className={cx('product-list')}>
                                    {ASCOrderProductList?.map((product, index) => {
                                        return (
                                            <Product
                                                key={index}
                                                productData={product}
                                                index={index}
                                                // =================================================================
                                                onCreateProduct={this.handleCreateProduct}
                                                onUpdateProduct={this.handleUpdateProduct}
                                                onDeleteProduct={this.handleDeleteProduct}
                                                onMoveUpProduct={this.handleMoveUpProduct}
                                                onMoveDownProduct={this.handleMoveDownProduct}
                                                // =================================================================
                                                onCreateTechnology={this.handleCreateNewTechnology}
                                                onUpdateTechnology={this.handleUpdateTechnology}
                                                onDeleteTechnology={this.handleDeleteTechnology}
                                            />
                                        );
                                    })}
                                </div>
                                <div className={cx('add-new-product-container')}>
                                    <Button
                                        className={cx('add-new-product-button')}
                                        onClick={() => this.handleCreateProduct()}
                                    >
                                        <span className={cx('add-new-product-icon')}>
                                            <IoIosAddCircle />
                                        </span>
                                        THÊM SẢN PHẨM
                                    </Button>
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
        // CRUD User information
        readUserInformation: (userId) =>
            dispatch(userActions.readUserInformation('thông tin người dùng', 'USER_INFORMATION', userId)),
        updateUserInformation: (toastText, data) =>
            dispatch(userActions.updateUserInformation(toastText, 'USER_INFORMATION', data, true)),

        // CRUD Product
        createProduct: (userId) => dispatch(userActions.createProduct(userId)),
        readProductList: (userId) => dispatch(userActions.readProductList('PRODUCT_LIST', userId)),
        updateProduct: (data, toastText) => dispatch(userActions.updateProduct(data, toastText)),
        deleteProduct: (userId, productId) => dispatch(userActions.deleteProduct(userId, productId)),

        // CRUD Source code, Technology, Library
        createTechnology: (data, type) => dispatch(userActions.createTechnology(data, type)),
        updateTechnology: (data, type, isToastSuccess) =>
            dispatch(userActions.updateTechnology(data, type, isToastSuccess)),
        deleteTechnology: (id, type) => dispatch(userActions.deleteTechnology(id, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
