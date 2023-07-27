import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaUserCircle, FaAddressBook, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import HeadlessTippy from '@tippyjs/react/headless';

import { Toast } from '~/components/Toast/Toast.js';
import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import * as userActions from '~/store/actions';
import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    // =================================================================
    // CRUD USER INFORMATION

    handleOpenChangeAvatarModal = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseChangeAvatarModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleUpdateAvatarFromChangeImageModal = async (url) => {
        const { id: userId, avatar } = this.props?.user ?? {};

        if (url !== avatar) {
            // Update avatar to Database
            const data = { userId: userId, avatar: url, label: 'Avatar' };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        } else {
            Toast.TOP_CENTER_WARN(`Ảnh này đang được sử dụng làm Avatar, hãy chọn ảnh khác`, 3000);
        }
    };

    handleUpdateUserInformation = async (e, name, label) => {
        const { id: userId } = this.props?.user ?? {};

        let value;
        if (name === 'jobPosition') {
            value = e.target.value;
        } else {
            value = e.target.innerText?.trim();
        }

        if (value !== this.props?.user?.[name]) {
            const data = { userId: userId, [name]: value, label: label };

            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        }
    };

    handleUpdateLanguagesToDatabase = async (e) => {
        const { id: userId, languages } = this.props?.user ?? {};
        const value = e.target.innerText;

        if (value !== languages) {
            const data = { userId: userId, languages: value, label: 'Ngoại ngữ' };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        }
    };

    // =================================================================
    // CRUD TECHNOLOGY

    handleCreateTechnology = async (data) => {
        const { id: userId } = this.props?.user ?? {};
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.createTechnology(newData);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);

            if (errorCode === 0) {
                return errorCode;
            }
        }
    };

    handleUpdateTechnology = async (data) => {
        const { id: userId } = this.props?.user ?? {};
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.updateTechnology(newData);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);

            if (errorCode === 0) {
                return errorCode;
            }
        }
    };

    handleDeleteTechnology = async (technologyId, label) => {
        const { id: userId } = this.props?.user ?? {};

        const errorCode = await this.props.deleteTechnology(technologyId, label);
        if (errorCode === 0) {
            await this.props.readProductList(userId);
        }
    };

    // =================================================================
    // CRUD PRODUCT

    handleCreateProduct = async () => {
        const { id: userId } = this.props?.user ?? {};

        const errorCode = await this.props.createProduct(userId);

        if (errorCode === 0) {
            const lastProductData = this.props.productInfoList?.at(-1);
            const lastProductId = lastProductData?.id;

            const lastProductName = document.getElementById(`js-product-name-${lastProductId}`);
            lastProductName?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    handleDeleteProduct = (productId) => {
        this.props.deleteProduct(productId);
    };

    // =================================================================
    // MOVE PRODUCT

    exchangeDataBetween2Product = (order, operator) => {
        const productList_IDAndOrder = this.props.productInfoList?.map((productData) => {
            return { productId: productData.id, productOrder: productData.productOrder };
        });

        const moveItemIndex = productList_IDAndOrder.findIndex((product) => product.productOrder === order);

        const siblingIndex = operator === 'move up' ? moveItemIndex - 1 : moveItemIndex + 1;
        const siblingItem_IDAndOrder = productList_IDAndOrder[siblingIndex];
        const movedItem_IDAndOrder = productList_IDAndOrder[moveItemIndex];

        if (movedItem_IDAndOrder && siblingItem_IDAndOrder) {
            const newDataOfMovedItem = {
                productId: movedItem_IDAndOrder.productId,
                productOrder: siblingItem_IDAndOrder.productOrder,
                label: 'Vị trí của sản phẩm',
            };

            const newDataOfSiblingItem = {
                productId: siblingItem_IDAndOrder.productId,
                productOrder: movedItem_IDAndOrder.productOrder,
                label: 'Vị trí của sản phẩm',
            };

            return { newDataOfMovedItem, newDataOfSiblingItem };
        } else {
            const text = operator === 'move up' ? 'lên trên' : 'xuống dưới';
            Toast.TOP_CENTER_WARN(`Không thể di chuyển sản phẩm này ${text}`, 3000);
        }
    };

    handleMoveProduct = async (order, operator) => {
        const productList_IDAndOrder = this.props.productInfoList?.map((productData) => {
            return { productId: productData.id, productOrder: productData.productOrder };
        });

        const moveItemIndex = productList_IDAndOrder.findIndex((product) => product.productOrder === order);

        const siblingIndex = operator === 'move up' ? moveItemIndex - 1 : moveItemIndex + 1;
        const siblingItem_IDAndOrder = productList_IDAndOrder[siblingIndex];
        const movedItem_IDAndOrder = productList_IDAndOrder[moveItemIndex];

        if (movedItem_IDAndOrder && siblingItem_IDAndOrder) {
            const data = {
                movedItemID: movedItem_IDAndOrder.productId,
                movedItemOrder: siblingItem_IDAndOrder.productOrder,
                siblingItemID: siblingItem_IDAndOrder.productId,
                siblingItemOrder: movedItem_IDAndOrder.productOrder,
            };

            const errorCode1 = await this.props.moveProduct(data);
            // if (errorCode1 === 0) {
            //     const upperEditProduct = document.getElementById(`js-edit-product-${newDataOfMovedItem.productId}`);
            //     if (upperEditProduct) {
            //         upperEditProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
            //     }
            // }
        } else {
            const text = operator === 'move up' ? 'lên trên' : 'xuống dưới';
            Toast.TOP_CENTER_WARN(`Không thể di chuyển sản phẩm này ${text}`, 3000);
        }
    };

    // =================================================================
    async componentDidMount() {
        const { id: userId, isPassword } = this.props?.user ?? {};

        if (userId) {
            // Get all data for CV Layout when sign in
            await this.props.readUserInformation(userId);
            await this.props.readProductList(userId);

            if (!isPassword) {
                Toast.TOP_CENTER_INFO('Vào mục Tài khoản để thiết lập mật khẩu', 100000000);
            }

            // Set languages from database by JS
            const languagesElement = document.getElementById(`js-language-desc`);
            if (languagesElement) {
                languagesElement.innerText = this.props?.user?.languages || '';
            }

            // Press ENTER to change input field or submit
            const container = document.querySelector(`.${cx('content')}`);
            if (container) {
                const inputArray = container.querySelectorAll(`[contentEditable]`);
                Array.from(inputArray).forEach((input, index) => {
                    input.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            let nextEl = inputArray[index + 1];

                            if (nextEl) {
                                nextEl.focus();
                            } else {
                                nextEl = inputArray[0];
                                nextEl.focus();
                            }
                        }
                    };
                });
            }
        } else {
            Toast.TOP_CENTER_WARN('Vui lòng đăng nhập lại');
            await this.props.userSignOut();
        }

        // Set event for scroll to top button
        const goToTopButton = document.getElementById('go-top-button');
        const goToBottomButton = document.getElementById('go-bottom-button');

        if (goToTopButton && goToBottomButton) {
            const checkHeight = () => {
                const documentHeight = document.body.scrollHeight;
                const scrollTY_innerHeight = window.scrollY + window.innerHeight;

                if (scrollTY_innerHeight >= documentHeight - 50) {
                    goToTopButton.style.display = 'grid';
                    goToBottomButton.style.display = 'none';
                } else if (window.scrollY > 0) {
                    goToTopButton.style.display = 'grid';
                    goToBottomButton.style.display = 'grid';
                } else if (window.scrollY === 0) {
                    goToTopButton.style.display = 'none';
                }
            };

            window.addEventListener('scroll', checkHeight);

            goToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            goToBottomButton.addEventListener('click', () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <Header productList={this.props.productInfoList} />

                <div className={cx('cv-container')}>
                    <div className={cx('user-information')}>
                        <div className={cx('user-information-basic')}>
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
                                                    onClick={() => this.handleOpenChangeAvatarModal()}
                                                >
                                                    Sửa ảnh
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <Image
                                            className={cx('avatar')}
                                            src={this.props.user?.avatar || JpgImages.avatarPlaceholder}
                                            alt={`${this.props?.user?.fullName}`}
                                            round
                                        />
                                    </HeadlessTippy>

                                    {this.state.isModalOpen && (
                                        <ChangeImageModal
                                            round
                                            src={this.props.user?.avatar}
                                            onClose={() => this.handleCloseChangeAvatarModal()}
                                            onGetUrl={this.handleUpdateAvatarFromChangeImageModal}
                                        />
                                    )}
                                </div>
                            </div>
                            <ContentEditableTag
                                content={this.props?.user?.fullName || ''}
                                className={cx('full-name')}
                                placeholder="Nguyễn Xuân Huy"
                                onBlur={(e) => this.handleUpdateUserInformation(e, 'fullName', 'Họ và tên')}
                            />
                            <select
                                value={this.props?.user?.jobPosition || ''}
                                className={cx('select-job-title')}
                                onChange={(e) => this.handleUpdateUserInformation(e, 'jobPosition', 'Vị trí ứng tuyển')}
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
                        </div>
                        <div className={cx('user-information-detail')}>
                            <div className={cx('candidate-info')}>
                                <p className={cx('text')}>Thông tin cá nhân</p>
                                <div className={cx('content')}>
                                    <div className={cx('info')}>
                                        <span className={cx('icon')}>
                                            <BsFillCalendarDayFill />
                                        </span>
                                        <ContentEditableTag
                                            content={this.props?.user?.dateOfBirth || ''}
                                            className={cx('info-text')}
                                            placeholder="Ngày tháng năm sinh"
                                            onBlur={(e) =>
                                                this.handleUpdateUserInformation(e, 'dateOfBirth', 'Ngày sinh')
                                            }
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <span className={cx('icon')}>
                                            <FaUserCircle />
                                        </span>
                                        <ContentEditableTag
                                            content={this.props?.user?.gender || ''}
                                            className={cx('info-text')}
                                            placeholder="Giới tính"
                                            onblur={(e) => this.handleUpdateUserInformation(e, 'gender', 'Giới tính')}
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <span className={cx('icon')}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <ContentEditableTag
                                            content={this.props?.user?.phoneNumber || ''}
                                            className={cx('info-text')}
                                            placeholder="Số điện thoại"
                                            onblur={(e) =>
                                                this.handleUpdateUserInformation(e, 'phoneNumber', 'Số điện thoại')
                                            }
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <span className={cx('icon')}>
                                            <MdEmail />
                                        </span>
                                        <ContentEditableTag
                                            content={this.props?.user?.email || ''}
                                            className={cx('info-text', 'email')}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <span className={cx('icon')}>
                                            <FaAddressBook />
                                        </span>
                                        <ContentEditableTag
                                            content={this.props?.user?.address || ''}
                                            className={cx('info-text')}
                                            placeholder="Địa chỉ"
                                            onblur={(e) => this.handleUpdateUserInformation(e, 'address', 'Địa chỉ')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('candidate-info')}>
                                <p className={cx('text')}>Trình độ ngoại ngữ</p>
                                <p
                                    id={`js-language-desc`}
                                    contentEditable
                                    placeholder="Nhập chứng chỉ hoặc trình độ tương đương"
                                    className={cx('language-desc')}
                                    spellCheck={false}
                                    onBlur={(e) => this.handleUpdateLanguagesToDatabase(e)}
                                ></p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('product-list-container')}>
                        <div className={cx('product-list')}>
                            {this.props.productInfoList?.map((product, index) => {
                                const totalPage = this.props.productInfoList?.length;

                                return (
                                    <Product
                                        key={index}
                                        // =================================================================
                                        jobTitle={this.props?.user?.jobPosition}
                                        productData={product}
                                        index={index}
                                        totalPage={totalPage}
                                        // =================================================================
                                        onCreateProduct={this.handleCreateProduct}
                                        onDeleteProduct={this.handleDeleteProduct}
                                        // =================================================================
                                        onMoveUpProduct={(order) => this.handleMoveProduct(order, 'move up')}
                                        onMoveDownProduct={(order) => this.handleMoveProduct(order, 'move down')}
                                        // =================================================================
                                        onCreateTechnology={this.handleCreateTechnology}
                                        onUpdateTechnology={this.handleUpdateTechnology}
                                        onDeleteTechnology={this.handleDeleteTechnology}
                                    />
                                );
                            })}
                        </div>
                        <div className={cx('add-new-product-container')}>
                            <Button className={cx('add-new-product-button')} onClick={() => this.handleCreateProduct()}>
                                <span className={cx('add-new-product-icon')}>
                                    <IoIosAddCircle />
                                </span>
                                THÊM SẢN PHẨM
                            </Button>
                        </div>
                    </div>

                    {this.props.isLoading && <Loading />}
                </div>

                <div className={cx('scroll-to-top-bottom')}>
                    <span className={cx('go-to-button', 'go-top')} id="go-top-button">
                        <FaArrowUp />
                    </span>
                    <span className={cx('go-to-button', 'go-bottom')} id="go-bottom-button">
                        <FaArrowDown />
                    </span>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isLoading: state.user.isLoading.CVLayout,

        productInfoList: state.user.productInfoList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // CRUD User information
        readUserInformation: (userId) => dispatch(userActions.readUserInformation(userId)),
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),

        // CRUD Product
        createProduct: (userId) => dispatch(userActions.createProduct(userId)),
        readProductList: (userId) => dispatch(userActions.readProductList(userId)),
        updateProduct: (data) => dispatch(userActions.updateProduct(data)),
        deleteProduct: (productId) => dispatch(userActions.deleteProduct(productId)),
        moveProduct: (data) => dispatch(userActions.moveProduct(data)),

        // Sign out
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
