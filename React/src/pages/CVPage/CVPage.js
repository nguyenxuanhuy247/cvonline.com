import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaUserCircle, FaAddressBook, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

import { Toast } from '~/components/Toast/Toast.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import { JpgImages } from '~/components/Image/Images.js';
import Image from '~/components/Image/Image.js';
import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';

import { MainLayout } from '~/layouts';

import Product from '~/pages/CVPage/Components/Product.js';
import ContentEditableTag from '~/pages/CVPage/Components/ContentEditableTag.js';
import NotFound404 from '~/pages/CVPage/Components/404Page.js';

import * as userActions from '~/store/actions';
import styles from './CVPage.module.scss';

const cx = classnames.bind(styles);

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalChangeAvatarOpen: false,
        };
    }

    // =================================================================
    // CRUD USER INFORMATION

    handleOpenChangeAvatarModal = () => {
        this.setState({ isModalChangeAvatarOpen: true });
    };

    handleCloseChangeAvatarModal = () => {
        this.setState({ isModalChangeAvatarOpen: false });
    };

    handleUpdateAvatarFromChangeImageModal = async (url) => {
        const { id: userId, avatar } = this.props?.userInfo ?? {};

        if (url !== avatar) {
            // Update avatar to Database
            const data = { userId: userId, avatar: url, label: 'Avatar' };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);

                return 0;
            }
        } else {
            Toast.TOP_CENTER_WARN(`Ảnh này đang được sử dụng làm Avatar, hãy chọn ảnh khác`, 3000);

            return 1;
        }
    };

    handleUpdateUserInformation = async (e, name, label) => {
        const { id: userId } = this.props?.userInfo ?? {};

        let value;
        if (name === 'jobPosition') {
            value = e.target.value;
        } else if (name === 'languages') {
            value = e.target.innerText;
        } else {
            value = e.target.innerText?.trim();
        }

        if (value !== this.props?.userInfo?.[name]) {
            const data = { userId: userId, [name]: value, label: label };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                await this.props.readUserInformation(userId);
            }
        }
    };

    // =================================================================
    // CRUD PRODUCT

    handleCreateProduct = async () => {
        const { id: userId } = this.props?.userInfo ?? {};

        const errorCode = await this.props.createProduct(userId);

        if (errorCode === 0) {
            const lastProductData = this.props.productList?.at(-1);
            const lastProductId = lastProductData?.productInfo?.id;

            const lastProductName = document.getElementById(`js-product-name-${lastProductId}`);
            lastProductName?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    handleDeleteProduct = (productId, index) => {
        this.props.deleteProduct(productId, index);
    };

    handleMoveProduct = async (order, operator) => {
        const productList_IDAndOrder = this.props.productList?.map((productData) => {
            const productInfo = productData.productInfo;
            return { productId: productInfo.id, productOrder: productInfo.productOrder };
        });

        const movedItemIndex = productList_IDAndOrder.findIndex((product) => product.productOrder === order);

        const siblingItemIndex = operator === 'move up' ? movedItemIndex - 1 : movedItemIndex + 1;
        const siblingItem_IDAndOrder = productList_IDAndOrder[siblingItemIndex];
        const movedItem_IDAndOrder = productList_IDAndOrder[movedItemIndex];

        if (movedItem_IDAndOrder && siblingItem_IDAndOrder) {
            const data = {
                movedItemID: movedItem_IDAndOrder.productId,
                movedItemOrder: siblingItem_IDAndOrder.productOrder,
                siblingItemID: siblingItem_IDAndOrder.productId,
                siblingItemOrder: movedItem_IDAndOrder.productOrder,
            };

            const index = {
                movedItemIndex,
                siblingItemIndex,
            };

            const errorCode = await this.props.moveProduct(data, index);

            if (errorCode === 0) {
                const siblingItem_EditProduct = document.getElementById(
                    `js-edit-product-${movedItem_IDAndOrder.productId}`,
                );

                if (siblingItem_EditProduct) {
                    siblingItem_EditProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        } else {
            const text = operator === 'move up' ? 'lên trên' : 'xuống dưới';
            Toast.TOP_CENTER_WARN(`Không thể di chuyển sản phẩm này ${text}`, 3000);
        }
    };

    // =================================================================
    fetchUserInformationAndProductList = async () => {
        const { paramId } = this.props?.match?.params ?? {};
        const { languages } = this.props?.userInfo ?? {};

        const errorCode1 = await this.props.readUserInformation(paramId);

        // Set languages from database by JS
        const languagesElement = document.getElementById(`js-language-desc`);
        if (languagesElement) {
            languagesElement.innerText = languages || '';
        }

        if (errorCode1 === 0) {
            await this.props.readProduct(paramId);
        }
    };

    async componentDidMount() {
        this.fetchUserInformationAndProductList();

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

    componentDidUpdate(prevProps) {
        if (this.props.userInfo?.id !== prevProps.userInfo?.id) {
            this.fetchUserInformationAndProductList();
        }
    }

    render = () => {
        const { id: userID } = this.props?.userInfo ?? {};
        const { id: ownerID } = this.props?.owner ?? {};

        const isCanEdit = userID === ownerID;

        return (
            <MainLayout>
                <div className={cx('cv-page')}>
                    {userID !== 0 ? (
                        <div>
                            <div className={cx('cv-page-section')}>
                                <div className={cx('cv-container')}>
                                    <div className={cx('user-information-container')}>
                                        <div className={cx('user-information-basic')}>
                                            <div className={cx('avatar-wrapper')}>
                                                <div className={cx('border-outline')}>
                                                    {isCanEdit && (
                                                        <Button
                                                            className={cx('change-avatar-button')}
                                                            onClick={() => this.handleOpenChangeAvatarModal()}
                                                        >
                                                            Sửa ảnh
                                                        </Button>
                                                    )}

                                                    <Image
                                                        className={cx('avatar')}
                                                        src={this.props.userInfo?.avatar || JpgImages.avatarPlaceholder}
                                                        alt={`${this.props?.userInfo?.fullName}`}
                                                        round
                                                    />

                                                    {isCanEdit && this.state.isModalChangeAvatarOpen && (
                                                        <ChangeImageModal
                                                            round
                                                            title="Thay đổi Avatar"
                                                            src={this.props.userInfo?.avatar}
                                                            onClose={() => this.handleCloseChangeAvatarModal()}
                                                            onGetUrl={this.handleUpdateAvatarFromChangeImageModal}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <ContentEditableTag
                                                isCanEdit={isCanEdit}
                                                content={this.props?.userInfo?.fullName || ''}
                                                className={cx('full-name', { contentEditable: isCanEdit })}
                                                placeholder="Nguyễn Xuân Huy"
                                                onBlur={(e) =>
                                                    this.handleUpdateUserInformation(e, 'fullName', 'Họ và tên')
                                                }
                                            />
                                            <select
                                                disabled={!isCanEdit}
                                                value={this.props?.userInfo?.jobPosition || ''}
                                                className={cx('select-job-title')}
                                                onChange={(e) =>
                                                    this.handleUpdateUserInformation(
                                                        e,
                                                        'jobPosition',
                                                        'Vị trí ứng tuyển',
                                                    )
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
                                                            isCanEdit={isCanEdit}
                                                            content={this.props?.userInfo?.dateOfBirth || ''}
                                                            className={cx('info-text', { contentEditable: isCanEdit })}
                                                            placeholder="Ngày tháng năm sinh"
                                                            onBlur={(e) =>
                                                                this.handleUpdateUserInformation(
                                                                    e,
                                                                    'dateOfBirth',
                                                                    'Ngày sinh',
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cx('info')}>
                                                        <span className={cx('icon')}>
                                                            <FaUserCircle />
                                                        </span>
                                                        <ContentEditableTag
                                                            isCanEdit={isCanEdit}
                                                            content={this.props?.userInfo?.gender || ''}
                                                            className={cx('info-text', { contentEditable: isCanEdit })}
                                                            placeholder="Giới tính"
                                                            onBlur={(e) =>
                                                                this.handleUpdateUserInformation(
                                                                    e,
                                                                    'gender',
                                                                    'Giới tính',
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cx('info')}>
                                                        <span className={cx('icon')}>
                                                            <BsFillTelephoneFill />
                                                        </span>
                                                        <ContentEditableTag
                                                            isCanEdit={isCanEdit}
                                                            content={this.props?.userInfo?.phoneNumber || ''}
                                                            className={cx('info-text', { contentEditable: isCanEdit })}
                                                            placeholder="Số điện thoại"
                                                            onBlur={(e) =>
                                                                this.handleUpdateUserInformation(
                                                                    e,
                                                                    'phoneNumber',
                                                                    'Số điện thoại',
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cx('info')}>
                                                        <span className={cx('icon')}>
                                                            <MdEmail />
                                                        </span>
                                                        <ContentEditableTag
                                                            isCanEdit={false}
                                                            content={this.props?.userInfo?.email || ''}
                                                            className={cx('email', {
                                                                contentEditable: isCanEdit,
                                                            })}
                                                            placeholder="Email"
                                                        />
                                                    </div>
                                                    <div className={cx('info')}>
                                                        <span className={cx('icon')}>
                                                            <FaAddressBook />
                                                        </span>
                                                        <ContentEditableTag
                                                            isCanEdit={isCanEdit}
                                                            content={this.props?.userInfo?.address || ''}
                                                            className={cx('info-text', { contentEditable: isCanEdit })}
                                                            placeholder="Địa chỉ"
                                                            onBlur={(e) =>
                                                                this.handleUpdateUserInformation(
                                                                    e,
                                                                    'address',
                                                                    'Địa chỉ',
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('candidate-info')}>
                                                <p className={cx('text')}>Trình độ ngoại ngữ</p>
                                                <p
                                                    id={`js-language-desc`}
                                                    contentEditable={isCanEdit}
                                                    placeholder="Nhập chứng chỉ hoặc trình độ tương đương"
                                                    className={cx('language-desc', { contentEditable: isCanEdit })}
                                                    spellCheck={false}
                                                    onBlur={(e) =>
                                                        this.handleUpdateUserInformation(e, 'languages', 'Ngoại ngữ')
                                                    }
                                                ></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('product-list-container')}>
                                        {this.props.productList && (
                                            <div className={cx('product-list')}>
                                                {this.props.productList?.map((product, index) => {
                                                    const totalPage = this.props.productList?.length;
                                                    return (
                                                        <Product
                                                            key={index}
                                                            jobTitle={this.props?.userInfo?.jobPosition}
                                                            productData={product}
                                                            // =================================================================
                                                            index={index}
                                                            totalPage={totalPage}
                                                            // =================================================================
                                                            onCreateProduct={this.handleCreateProduct}
                                                            onDeleteProduct={this.handleDeleteProduct}
                                                            // =================================================================
                                                            onMoveUpProduct={(order) =>
                                                                this.handleMoveProduct(order, 'move up')
                                                            }
                                                            onMoveDownProduct={(order) =>
                                                                this.handleMoveProduct(order, 'move down')
                                                            }
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                        
                                        {isCanEdit && (
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
                                        )}
                                    </div>

                                    {this.props.isLoading && <Loading text="Đang tải..." />}
                                </div>
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
                    ) : (
                        <NotFound404 />
                    )}
                </div>
            </MainLayout>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
        productList: state.user.productList,
        isLoading: state.user.isLoading.CVLayout,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // CRUD User information
        readUserInformation: (userId) => dispatch(userActions.readUserInformation(userId)),
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),

        // CRUD Product
        createProduct: (userId) => dispatch(userActions.createProduct(userId)),
        readProduct: (userId) => dispatch(userActions.readProduct(userId)),
        deleteProduct: (productId, index) => dispatch(userActions.deleteProduct(productId, index)),
        moveProduct: (data, index) => dispatch(userActions.moveProduct(data, index)),

        // Sign out
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersonalLayout));
