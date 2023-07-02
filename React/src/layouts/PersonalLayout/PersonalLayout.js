import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaUserCircle, FaAddressBook } from 'react-icons/fa';
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import HeadlessTippy from '@tippyjs/react/headless';
import { Buffer } from 'buffer';
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
            languages: '',
        };
    }

    // =================================================================
    // CRUD USER INFORMATION

    getAvatarUrlFromChangeImageModal = async (url) => {
        const userId = this.props?.user?.id;
        console.log(userId);
        const avatarDB = this.props?.user?.avatar;
        let binaryAvatarDB;

        if (avatarDB) {
            binaryAvatarDB = Buffer.from(avatarDB, 'base64').toString('binary');
        }

        if (url !== binaryAvatarDB) {
            // Update avatar to Database
            const data = { userId: userId, avatar: url };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                const errorCode = await this.props.readUserInformation(userId);
                if (errorCode !== 0) {
                    Toast.TOP_CENTER_ERROR(`Tải thông tin người dùng thất bại`, 3000);
                }
            } else {
                Toast.TOP_CENTER_ERROR(`Thay đổi avatar thất bại`, 3000);
            }
        } else {
            Toast.TOP_CENTER_WARN(`Avatar này đã được sử dụng, hãy chọn ảnh khác`, 3000);
        }
    };

    handleUpdateUserInformation = async (e, name, toastTextError) => {
        const userId = this.props?.user?.id;
        let value;
        if (name === 'jobPosition') {
            value = e.target.value;
        } else {
            value = e.target.innerText?.trim();
        }

        if (value !== this.props?.user?.[name]) {
            const data = { userId: userId, [name]: value };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                const errorCode = await this.props.readUserInformation(userId);
                if (errorCode !== 0) {
                    Toast.TOP_CENTER_ERROR(`Tải thông tin người dùng thất bại`, 3000);
                }
            } else {
                Toast.TOP_CENTER_ERROR(`Cập nhật ${toastTextError} thất bại`, 3000);
            }
        }
    };

    handleInputLanguagesAndSetRowsForTextarea = (e) => {
        const textAreaElement = e.target;
        const value = e.target.value;

        // Get number of rows of textarea and set rows attribute
        const rows = textAreaElement?.textContent?.split(/\r\n|\r|\n/).length;
        textAreaElement.rows = rows;

        this.setState({ languages: value });
    };

    handleUpdateLanguages = async () => {
        const userId = this.props?.user?.id;
        const value = this.state.languages;

        if (value !== this.props?.user?.languages) {
            const data = { userId: userId, languages: value };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                const errorCode = await this.props.readUserInformation(userId);
                if (errorCode !== 0) {
                    Toast.TOP_CENTER_ERROR(`Tải thông tin người dùng thất bại`, 3000);
                }
            } else {
                Toast.TOP_CENTER_ERROR(`Cập nhật ngoại ngữ thất bại`, 3000);
            }
        }
    };

    // =================================================================
    // CRUD PRODUCT
    handleCreateNewTechnology = async (data, label) => {
        const userId = this.props?.user?.id;
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.createTechnology(newData);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode === 0) {
                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau tạo mới ${label} thất bại`, 3000);
                return errorCode;
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Tạo mới ${label} thất bại`, 3000);
        }
    };

    handleUpdateTechnology = async (data, label) => {
        const userId = this.props?.user?.id;
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.updateTechnology(newData);
        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode === 0) {
                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau cập nhật ${label} thất bại`, 3000);
                return errorCode;
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Cập nhật ${label} thất bại`, 3000);
        }
    };

    handleDeleteTechnology = async (id, label) => {
        const userId = this.props?.user?.id;

        const errorCode = await this.props.deleteTechnology(id);
        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau xóa ${label} thất bại`, 3000);
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Xóa ${label} thất bại`, 3000);
        }
    };

    // =================================================================
    // CRUD Product

    handleCreateProduct = async () => {
        const userId = this.props?.user?.id;
        const errorCode = await this.props.createProduct(userId);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau tạo mới sản phẩm thất bại`, 3000);
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Tạo sản phẩm mới thất bại`, 3000);
        }
    };

    handleUpdateProduct = async (data, toastText) => {
        const userId = this.props?.user?.id;
        const newData = { ...data, userId: userId };

        const errorCode = await this.props.updateProduct(newData, toastText);
        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau cập nhật ${toastText} thất bại`, 3000);
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Cập nhật ${toastText} thất bại`, 3000);
        }
    };

    handleDeleteProduct = async (productId) => {
        const userId = this.props?.user?.id;
        const errorCode = await this.props.deleteProduct(userId, productId);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);
            if (errorCode !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm sau xóa sản phẩm thất bại`, 3000);
            }
        } else {
            Toast.TOP_RIGHT_ERROR(`Xóa sản phẩm thất bại`, 3000);
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

            const errorCode1 = await this.props.updateProduct(changedUpperItem, 'vị trí');
            if (errorCode1 === 0) {
                const errorCode2 = await this.props.updateProduct(changedMoveItem, 'vị trí');

                if (errorCode2 === 0) {
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
        const userId = this.props?.user?.id;
        if (userId) {
            const errorCode_userInfo = await this.props.readUserInformation(userId);
            if (errorCode_userInfo !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải thông tin người dùng thất bại`, 3000);
            }

            await this.setState({ languages: this.props?.user?.languages });

            const errorCode_productList = await this.props.readProductList(userId);
            if (errorCode_productList !== 0) {
                Toast.TOP_CENTER_ERROR(`Tải danh sách sản phẩm thất bại`, 3000);
            }

            const textAreaElement = document.getElementById(`js-language-desc`);
            const rows = textAreaElement?.innerHTML?.split(/\r\n|\r|\n/).length;
            textAreaElement.rows = rows;
        } else {
            Toast.TOP_CENTER_ERROR(`Không tìm thấy ID của người dùng để tải CV`, 3000);
        }
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
                                        name="job-title"
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
                                            id={`js-language-desc`}
                                            placeholder="Nhập chứng chỉ hoặc trình độ tương đương"
                                            className={cx('language-desc')}
                                            spellCheck={false}
                                            value={this.state?.languages ?? ''}
                                            onInput={(e) => this.handleInputLanguagesAndSetRowsForTextarea(e)}
                                            onBlur={() => this.handleUpdateLanguages()}
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

                    {this.props.isLoading && <Loading />}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
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
        readProductList: (userId) => dispatch(userActions.readProductList(userId)),
        updateProduct: (data) => dispatch(userActions.updateProduct(data)),
        deleteProduct: (userId, productId) => dispatch(userActions.deleteProduct(userId, productId)),

        // CRUD Source code, Technology, Library
        createTechnology: (data) => dispatch(userActions.createTechnology(data)),
        updateTechnology: (data) => dispatch(userActions.updateTechnology(data)),
        deleteTechnology: (id) => dispatch(userActions.deleteTechnology(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
