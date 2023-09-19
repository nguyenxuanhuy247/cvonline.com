import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AiOutlineSortAscending, AiOutlineSortDescending, AiFillCloseCircle } from 'react-icons/ai';
import _ from 'lodash';

import { JpgImages } from '~/components/Image/Images.js';
import { Toast } from '~/components/Toast/Toast.js';
import Image from '~/components/Image/Image.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import Button from '~/components/Button/Button.js';

import TechnologyList from '~/pages/CVPage/Components/TechnologyList.js';
import ContentEditableTag from '~/pages/CVPage/Components/ContentEditableTag.js';
import EditProduct from '~/pages/CVPage/Components/EditProduct.js';

import * as userActions from '~/store/actions';
import styles from './Product.module.scss';

const cx = classnames.bind(styles);

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: 'var(--green-color-01)',
                    backgroundColor: '#fff !important',
                    borderColor: 'var(--green-color-01) !important',
                    fontSize: '1.2rem',

                    '&:hover': {
                        color: '#fff',
                        backgroundColor: 'var(--green-color-01) !important',
                    },

                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'var(--green-color-01) !important',
                    },
                },
            },
        },
    },
});

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFE: true,
            FE_isPagination: true,
            FE_Page: 1,
            FE_PageSize: 10,
            FE_sortBy: '',
            FE_isSearch: false,
            FE_searchInputValue: '',

            isBE: true,
            BE_isPagination: true,
            BE_Page: 1,
            BE_PageSize: 10,
            BE_sortBy: '',
            BE_isSearch: false,
            BE_searchInputValue: '',

            isChangeImageModalOpen: false,
        };

        this.updateDescErrorCode = React.createRef();
    }

    // =================================================================
    // CHANGE PRODUCT DESCRIPTION

    handleUpdateProductNameOrDesc = async (e, updatedItem) => {
        const { index } = this.props ?? {};
        const { id: ownerID } = this.props?.owner ?? {};
        const { productInfo } = this.props?.productData ?? {};
        const { id: productId, name: productName, desc: productDesc } = productInfo ?? {};

        const value = e.target.innerText?.trimEnd();

        if (updatedItem === 'name') {
            const data = { userId: ownerID, productId: productId, name: value, label: 'Tên sản phẩm' };
            if (value !== productName) {
                await this.props.updateProduct(data, index, updatedItem);
            }
        } else {
            const data = { userId: ownerID, productId: productId, desc: value, label: 'Mô tả sản phẩm' };
            if (value !== productDesc) {
                await this.props.updateProduct(data, index, updatedItem);
            }
        }
    };

    handleUpdateProductImage = async (url) => {
        const { id: ownerID } = this.props?.owner ?? {};
        const { index } = this.props ?? {};
        const { productInfo } = this.props?.productData ?? {};
        const { id: productId, image: imageDB } = productInfo ?? {};

        if (productId) {
            const data = { userId: ownerID, productId: productId, image: url, label: 'Hình ảnh sản phẩm' };

            if (url !== imageDB) {
                const errorCode = await this.props?.updateProduct(data, index, 'image');

                return errorCode;
            } else {
                Toast.TOP_CENTER_WARN(`Ảnh này đã được sử dụng, hãy chọn ảnh khác`, 3000);
            }
        } else {
            Toast.TOP_CENTER_ERROR(`Thiếu Product ID để cập nhật Hình ảnh sản phẩm. Vui lòng thử lại`);
        }
    };

    handleOpenChangeImageModal = () => {
        this.setState({ isChangeImageModalOpen: true });
    };

    handleCloseChangeImageModal = () => {
        this.setState({ isChangeImageModalOpen: false });
    };

    handlePressEnterKeyBoard = (e, productInfo) => {
        // Press Enter to blur out product name and focus on product description
        const producDescElement = document.getElementById(`js-product-desc-${productInfo}`);
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();

            if (producDescElement) {
                producDescElement.focus();
            }
        }
    };

    // =================================================================
    // PAGINATION

    handleChangePage = (event, value, side) => {
        this.setState({ [`${side === 'FE' ? 'FE_Page' : 'BE_Page'}`]: value });
    };

    handleChangePageSize = (e, side) => {
        const value = e.target.innerText;

        if (value === 'Tất cả') {
            this.setState({ [`${side === 'FE' ? 'FE_isPagination' : 'BE_isPagination'}`]: false });
        } else {
            this.setState({
                [`${side === 'FE' ? 'FE_isPagination' : 'BE_isPagination'}`]: true,
                [`${side === 'FE' ? 'FE_PageSize' : 'BE_PageSize'}`]: +value,
                [`${side === 'FE' ? 'FE_Page' : 'BE_Page'}`]: 1,
            });
        }

        // Remove active class in all buttons before set active for button is clicked
        const parentElement = e.target.parentNode;
        const allDisplayButtons = parentElement?.childNodes;
        allDisplayButtons?.forEach((displayButton) => {
            const isActive = displayButton.classList.contains(cx('active'));
            if (isActive) {
                displayButton.classList.remove(cx('active'));
            }
        });
        e.target.classList.add(cx('active'));
    };

    // =================================================================
    // SORT AND FILTER

    handeSortLibrary = (e, side, sort) => {
        const element = e.currentTarget;
        const isActive = element.classList.contains(cx('active-sort'));

        if (isActive) {
            element.classList.remove(cx('active'));
            this.setState({ [`${side === 'FE' ? 'FE_sortBy' : 'BE_sortBy'}`]: '' });
        } else {
            this.setState({ [`${side === 'FE' ? 'FE_sortBy' : 'BE_sortBy'}`]: sort });
        }
    };

    handleSearchLibrary = async (side, productID) => {
        const { FELibraryList, BELibraryList } = this.props?.productData ?? {};

        const isSearch = side === 'FE' ? 'FE_isSearch' : 'BE_isSearch';
        const searchInputValue = side === 'FE' ? 'FE_searchInputValue' : 'BE_searchInputValue';
        const libraryList = side === 'FE' ? FELibraryList : BELibraryList;

        const searchLibraryList = document.getElementById(`js-library-list-${side}-${productID}`);
        const resultNotFound = document.getElementById(`js-result-not-found-${side}`);
        const searchInputElement = document.getElementById(`js-search-input-${side}-${productID}`);

        const value = searchInputElement?.value?.trim();

        if (value) {
            await this.setState({ [isSearch]: true, [searchInputValue]: value });
            // Loop through all library button in list
            _.forEach(libraryList, function (library) {
                const libraryName = document.getElementById(`js-name-button-${side}-LIBRARY-${library.id}`);

                if (libraryName) {
                    const buttonContainer = libraryName.closest(`#js-container-button-${side}-LIBRARY-${library.id}`);

                    if (buttonContainer) {
                        // Clear background-color: yellow of all previous button
                        buttonContainer.style.display = 'flex';
                        libraryName.innerHTML = library.name;

                        // Set background-color: yellow for button matches search value input
                        const regex = new RegExp(value, 'gi');
                        const name = libraryName.innerHTML.replace(/(<span}>|<\/span>)/gim);
                        const newName = name.replace(regex, `<span>$&</span>`);

                        // Only set background-color: yellow for result matches search value input
                        if (name !== newName) {
                            libraryName.innerHTML = newName;
                        } else {
                            // Hide library button does not match
                            buttonContainer.style.display = 'none';
                        }
                    }
                }
            });

            // Remove not found text of all buttons
            if (resultNotFound) {
                resultNotFound.remove();
            }

            if (searchLibraryList) {
                const childArray = searchLibraryList.childNodes;

                // Check whether Library List dose not have 'display: none;' or not
                const isEmptyArray = Array.from(childArray).some(
                    (item) => item.getAttribute('style') !== 'display: none;',
                );

                // if library list doesn't have nay 'display: block' button, set Not found Text
                if (!isEmptyArray) {
                    const notFoundElement = document.createElement('p');
                    notFoundElement.className = cx(`search-result-not-found-${side}`);
                    notFoundElement.id = `js-result-not-found-${side}`;
                    notFoundElement.innerText = 'Không tìm thấy kết quả';

                    searchLibraryList.appendChild(notFoundElement);
                }
            }
        } else {
            await this.setState({ [isSearch]: false, [searchInputValue]: value });

            // Remove not found text when search input is empty
            if (resultNotFound) {
                resultNotFound.remove();
            }

            // Restore the original state of the button
            _.forEach(libraryList, function (library) {
                const libraryName = document.getElementById(`js-name-button-${side}-LIBRARY-${library.id}`);

                if (libraryName) {
                    libraryName.innerHTML = library.name;
                    const closest = libraryName.closest(`#js-container-button-${side}-LIBRARY-${library.id}`);

                    if (closest) {
                        closest.style.display = 'flex';
                    }
                }
            });
        }
    };

    handleClearSearchValueInput = async (side) => {
        const { productInfo } = this.props?.productData ?? {};

        const searchInputValue = side === 'FE' ? 'FE_searchInputValue' : 'BE_searchInputValue';

        await this.setState({ [searchInputValue]: '' });
        await this.handleSearchLibrary(side, productInfo.id);
    };

    // =================================================================

    displayJobPositionLayout = (jobTitle) => {
        if (jobTitle === 'Fullstack developer') {
            this.setState({ isFE: true, isBE: true });
        } else if (jobTitle === 'Frontend developer') {
            this.setState({ isFE: true, isBE: false });
        } else if (jobTitle === 'Backend developer') {
            this.setState({ isFE: false, isBE: true });
        }
    };

    setTextForProductDesc = (productInfo) => {
        const productName = document.getElementById(`js-product-name-${productInfo?.id}`);
        const productDesc = document.getElementById(`js-product-desc-${productInfo?.id}`);
        productName.innerText = productInfo.name;
        if (productDesc && productName) {
            productName.innerText = productInfo?.name;
            productDesc.innerText = productInfo?.desc;
        }
    };

    async componentDidUpdate(prevProps) {
        const { productInfo, FELibraryList, numberofFELibrary, BELibraryList, numberofBELibrary } =
            this.props?.productData ?? {};
        const { jobTitle } = this.props;

        const previousFELibraryListLength = prevProps.productData.FELibraryList?.length;
        const updatedFELibraryListLength = FELibraryList?.length;
        const isCreateFELibrary = updatedFELibraryListLength > previousFELibraryListLength;

        // Turn to last page when add or delete a library
        if (numberofFELibrary !== prevProps?.productData?.numberofFELibrary && isCreateFELibrary) {
            const FE_FinalPage = Math.ceil(numberofFELibrary / this.state.FE_PageSize);
            this.setState({ FE_Page: FE_FinalPage });
        }

        const previousBELibraryListLength = prevProps.productData.BELibraryList?.length;
        const updatedBELibraryListLength = BELibraryList?.length;
        const isCreateBELibrary = updatedBELibraryListLength > previousBELibraryListLength;

        if (numberofBELibrary !== prevProps?.productData?.numberofBELibrary && isCreateBELibrary) {
            const BE_FinalPage = Math.ceil(numberofBELibrary / this.state.BE_PageSize);
            this.setState({ BE_Page: BE_FinalPage });
        }

        // Set product desc after updateing from database by JS
        if (this.props.shouldUpdateProductNameAndDesc) {
            this.setTextForProductDesc(productInfo);
        }

        // Set display BE, FE Technology
        this.displayJobPositionLayout(jobTitle);

        // Reset parameters when change param URL
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                isFE: true,
                FE_isPagination: true,
                FE_Page: 1,
                FE_PageSize: 10,
                FE_sortBy: '',
                FE_isSearch: false,
                FE_searchInputValue: '',

                isBE: true,
                BE_isPagination: true,
                BE_Page: 1,
                BE_PageSize: 10,
                BE_sortBy: '',
                BE_isSearch: false,
                BE_searchInputValue: '',

                isChangeImageModalOpen: false,
            });
        }
    }

    async componentDidMount() {
        const { productInfo } = this.props?.productData ?? {};
        const { jobTitle } = this.props;

        // Set product desc from database by JS
        this.setTextForProductDesc(productInfo);

        // Set display BE, FE Technology
        this.displayJobPositionLayout(jobTitle);
    }

    render() {
        const {
            productInfo,
            sourceCodeList,
            FETechnologyList,
            BETechnologyList,
            FELibraryList: FE_AllLibraryList,
            numberofFELibrary,
            BELibraryList: BE_AllLibraryList,
            numberofBELibrary,
        } = this.props?.productData ?? {};

        const { id: productID, productOrder, name: productName } = productInfo ?? {};
        const { id: userID } = this.props?.userInfo ?? {};
        const { id: ownerID } = this.props?.owner ?? {};

        const isCanEdit = userID === ownerID;

        // =================================================================
        // PAGINATION

        const FETotalPage = Math.ceil(numberofFELibrary / this.state.FE_PageSize);
        const BETotalPage = Math.ceil(numberofBELibrary / this.state.BE_PageSize);

        const FE_paginatedLibraryList = _.chunk(FE_AllLibraryList, this.state.FE_PageSize);
        const FE_paginationLibraryList = FE_paginatedLibraryList[this.state.FE_Page - 1];
        const BE_paginatedLibraryList = _.chunk(BE_AllLibraryList, this.state.BE_PageSize);
        const BE_paginationLibraryList = BE_paginatedLibraryList[this.state.BE_Page - 1];

        const FELibraryListArray = this.state.FE_isPagination ? FE_paginationLibraryList : FE_AllLibraryList;
        const BELibraryListArray = this.state.BE_isPagination ? BE_paginationLibraryList : BE_AllLibraryList;

        // =================================================================
        // SORT LIST

        // Check FE_isSearch and FE_sortBy in order to use FE Library List
        const FE_LibraryList = this.state.FE_isSearch ? FE_AllLibraryList : FELibraryListArray;

        let FE_LibraryList_SortedOrNot;
        if (FE_LibraryList?.length > 0) {
            FE_LibraryList_SortedOrNot = this.state.FE_sortBy
                ? _.orderBy(
                      [...FE_LibraryList],
                      [
                          (value) => {
                              return value.name?.toLowerCase();
                          },
                      ],
                      [this.state.FE_sortBy],
                  )
                : FE_LibraryList;
        }

        // Check BE_isSearch and BE_sortBy in order to use BE Library List
        const BE_LibraryList = this.state.BE_isSearch ? BE_AllLibraryList : BELibraryListArray;

        let BE_LibraryList_SortedOrNot;
        if (BE_LibraryList?.length > 0) {
            BE_LibraryList_SortedOrNot = this.state.BE_sortBy
                ? _.orderBy(
                      [...BE_LibraryList],
                      [
                          (value) => {
                              return value.name?.toLowerCase();
                          },
                      ],
                      [this.state.BE_sortBy],
                  )
                : BE_LibraryList;
        }

        return (
            <div className={cx('product-container')} id={`js-product-${productID}`}>
                {isCanEdit && (
                    <EditProduct
                        id={`js-edit-product-${productID}`}
                        onMoveUpProduct={() => this.props.onMoveUpProduct(productOrder)}
                        onMoveDownProduct={() => this.props.onMoveDownProduct(productOrder)}
                        onCreateProduct={() => this.props.onCreateProduct()}
                        onDeleteProduct={() => this.props.onDeleteProduct(productID, this.props.index)}
                    />
                )}

                <div className={cx('product', { 'margin-top-product': !isCanEdit })}>
                    <div className={cx('product-name-desc-image')} spellCheck="false">
                        <ContentEditableTag
                            id={`js-product-name-${productID}`}
                            content={productName || ''}
                            isCanEdit={isCanEdit}
                            className={cx('product-name', {
                                contentEditable: isCanEdit,
                            })}
                            placeholder={isCanEdit ? 'Tên sản phẩm' : 'Sản phẩm chưa được đặt tên'}
                            onBlur={(e) => this.handleUpdateProductNameOrDesc(e, 'name')}
                            onKeyPress={(e) => this.handlePressEnterKeyBoard(e, productID)}
                        />

                        <p
                            id={`js-product-desc-${productID}`}
                            contentEditable={isCanEdit}
                            placeholder={isCanEdit ? 'Mô tả sản phẩm' : 'Chưa có mô tả sản phẩm'}
                            className={cx('product-desc', { contentEditable: isCanEdit })}
                            spellCheck={false}
                            onBlur={(e) => this.handleUpdateProductNameOrDesc(e, 'desc')}
                        ></p>

                        <div className={cx('product-image')}>
                            {isCanEdit && (
                                <Button
                                    className={cx('edit-image-button')}
                                    onClick={() => this.handleOpenChangeImageModal()}
                                >
                                    {productInfo?.image ? 'Sửa ảnh' : 'Thêm ảnh'}
                                </Button>
                            )}
                            <Image
                                src={productInfo?.image || JpgImages.productPlaceholder}
                                className={cx('image')}
                                alt="Ảnh sản phẩm"
                            />

                            {isCanEdit && this.state.isChangeImageModalOpen && (
                                <ChangeImageModal
                                    isLoading={this.props.isUpdateProductImageLoading}
                                    round={false}
                                    src={productInfo?.image}
                                    onClose={() => this.handleCloseChangeImageModal()}
                                    onGetUrl={this.handleUpdateProductImage}
                                />
                            )}
                        </div>
                    </div>

                    <div className={cx('source-code-section')}>
                        <p className={cx('source-code-title')}>SOURCE CODE</p>
                        <TechnologyList
                            technologyListID={`js-source-code-list-${productID}`}
                            index={this.props.index}
                            draggable
                            label="source code"
                            type="SOURCECODE"
                            keyprop="SC"
                            productId={productID}
                            technologyList={sourceCodeList}
                        />
                    </div>

                    <div className={cx('technology')}>
                        {this.state.isFE && (
                            <div className={cx('server', 'front-end', { 'hide-FE': !this.state.isBE })}>
                                <span className={cx('server-side-title', { 'hide-FE': !this.state.isBE })}>
                                    FRONT-END
                                </span>
                                <div className={cx('technology-used', { 'hide-FE': !this.state.isBE })}>
                                    <div className={cx('technology-used-title')}>
                                        <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                    </div>
                                    <div className={cx('list')}>
                                        <TechnologyList
                                            technologyListID={`js-technology-list-FE-${productID}`}
                                            index={this.props.index}
                                            draggable
                                            label="công nghệ FE"
                                            type="TECHNOLOGY"
                                            keyprop="TE"
                                            side="FE"
                                            productId={productID}
                                            technologyList={FETechnologyList}
                                        />
                                    </div>
                                </div>

                                <div className={cx('library-used', { 'hide-FE': !this.state.isBE })}>
                                    <div className={cx('library-used-title')}>
                                        <span className={cx('title')}>THƯ VIỆN SỬ DỤNG</span>
                                    </div>
                                    <div className={cx('library-filter-sort')}>
                                        <div className={cx('library-filter')}>
                                            <input
                                                id={`js-search-input-FE-${productID}`}
                                                value={this.state.FE_searchInputValue}
                                                onChange={() => {}}
                                                autoComplete="off"
                                                type="text"
                                                placeholder="Tìm kiếm thư viện"
                                                className={cx('library-filter-search')}
                                                spellCheck="false"
                                                onInput={() => this.handleSearchLibrary('FE', productID)}
                                            />
                                            <span
                                                className={cx('library-filter-clear', {
                                                    show: this.state.FE_searchInputValue,
                                                })}
                                                onClick={() => this.handleClearSearchValueInput('FE')}
                                            >
                                                <AiFillCloseCircle />
                                            </span>
                                        </div>

                                        <div className={cx('library-sort')}>
                                            <span className={cx('label')}>Sắp xếp</span>
                                            <Button
                                                className={cx('sort', {
                                                    'active-sort': this.state.FE_sortBy === 'asc',
                                                })}
                                                onClick={(e) => this.handeSortLibrary(e, 'FE', 'asc')}
                                            >
                                                <AiOutlineSortAscending />
                                            </Button>
                                            <Button
                                                className={cx('sort', {
                                                    'active-sort': this.state.FE_sortBy === 'desc',
                                                })}
                                                onClick={(e) => this.handeSortLibrary(e, 'FE', 'desc')}
                                            >
                                                <AiOutlineSortDescending />
                                            </Button>
                                        </div>
                                    </div>

                                    {!this.state.FE_isSearch && (
                                        <div className={cx('display')}>
                                            <span className={cx('label')}>Hiển thị</span>
                                            <div className={cx('select')}>
                                                {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                                    return (
                                                        <Button
                                                            id={`js-display-paginition-FE-${productID}`}
                                                            key={index}
                                                            className={cx('button', {
                                                                active: button === this.state.FE_PageSize,
                                                            })}
                                                            onClick={(e) => this.handleChangePageSize(e, 'FE')}
                                                        >
                                                            {button}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <TechnologyList
                                        technologyListID={`js-library-list-FE-${productID}`}
                                        index={this.props.index}
                                        draggable
                                        label="thư viện FE"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        side="FE"
                                        productId={productID}
                                        technologyList={FE_LibraryList_SortedOrNot}
                                        // =================================================================
                                        // Search - Sort
                                        isSearch={this.state.FE_isSearch}
                                        isSortBy={this.state.FE_sortBy}
                                        onSearchLibrary={() => this.handleSearchLibrary('FE', productID)}
                                    />

                                    {!this.state.FE_isSearch && this.state.FE_isPagination && FETotalPage !== 0 && (
                                        <div className={cx('pagination-container')}>
                                            <ThemeProvider theme={theme}>
                                                <Pagination
                                                    count={FETotalPage}
                                                    variant="outlined"
                                                    size="medium"
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    page={this.state.FE_Page}
                                                    onChange={(e, value) => this.handleChangePage(e, value, 'FE')}
                                                />
                                            </ThemeProvider>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {this.state.isBE && (
                            <div className={cx('server', 'back-end', { 'hide-BE': !this.state.isFE })}>
                                <span className={cx('server-side-title', { 'hide-BE': !this.state.isFE })}>
                                    BACK-END
                                </span>
                                <div className={cx('technology-used', { 'hide-BE': !this.state.isFE })}>
                                    <div className={cx('technology-used-title')}>
                                        <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                    </div>
                                    <div className={cx('list')}>
                                        <TechnologyList
                                            technologyListID={`js-technology-list-BE-${productID}`}
                                            index={this.props.index}
                                            draggable
                                            label="công nghệ BE"
                                            type="TECHNOLOGY"
                                            keyprop="TE"
                                            side="BE"
                                            productId={productID}
                                            technologyList={BETechnologyList}
                                        />
                                    </div>
                                </div>
                                <div className={cx('library-used', { 'hide-BE': !this.state.isFE })}>
                                    <div className={cx('library-used-title')}>
                                        <span className={cx('title')}>THƯ VIỆN SỬ DỤNG</span>
                                    </div>

                                    <div className={cx('library-filter-sort')}>
                                        <div className={cx('library-filter')}>
                                            <input
                                                id={`js-search-input-BE-${productID}`}
                                                value={this.state.BE_searchInputValue}
                                                onChange={() => {}}
                                                autoComplete="off"
                                                type="text"
                                                placeholder="Tìm kiếm thư viện"
                                                className={cx('library-filter-search')}
                                                spellCheck="false"
                                                onInput={() => this.handleSearchLibrary('BE', productID)}
                                            />
                                            <span
                                                className={cx('library-filter-clear', {
                                                    show: this.state.BE_searchInputValue,
                                                })}
                                                onClick={() => this.handleClearSearchValueInput('BE')}
                                            >
                                                <AiFillCloseCircle />
                                            </span>
                                        </div>

                                        <div className={cx('library-sort')}>
                                            <span className={cx('label')}>Sắp xếp</span>
                                            <Button
                                                className={cx('sort', {
                                                    'active-sort': this.state.BE_sortBy === 'asc',
                                                })}
                                                onClick={(e) => this.handeSortLibrary(e, 'BE', 'asc')}
                                            >
                                                <AiOutlineSortAscending />
                                            </Button>
                                            <Button
                                                className={cx('sort', {
                                                    'active-sort': this.state.BE_sortBy === 'desc',
                                                })}
                                                onClick={(e) => this.handeSortLibrary(e, 'BE', 'desc')}
                                            >
                                                <AiOutlineSortDescending />
                                            </Button>
                                        </div>
                                    </div>

                                    {!this.state.BE_isSearch && (
                                        <div className={cx('display')}>
                                            <span className={cx('label')}>Hiển thị</span>
                                            <div className={cx('select')}>
                                                {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                                    return (
                                                        <Button
                                                            id={`js-display-paginition-BE-${productID}`}
                                                            key={index}
                                                            className={cx('button', {
                                                                active: button === this.state.BE_PageSize,
                                                            })}
                                                            onClick={(e) => this.handleChangePageSize(e, 'BE')}
                                                        >
                                                            {button}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <TechnologyList
                                        technologyListID={`js-library-list-BE-${productID}`}
                                        index={this.props.index}
                                        draggable
                                        label="thư viện BE"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        side="BE"
                                        productId={productID}
                                        technologyList={BE_LibraryList_SortedOrNot}
                                        // =================================================================
                                        // Search - Sort
                                        isSearch={this.state.BE_isSearch}
                                        isSortBy={this.state.BE_sortBy}
                                        onSearchLibrary={() => this.handleSearchLibrary('BE', productID)}
                                    />

                                    {!this.state.BE_isSearch && this.state.BE_isPagination && BETotalPage !== 0 && (
                                        <div className={cx('pagination-container')}>
                                            <ThemeProvider theme={theme}>
                                                <Pagination
                                                    count={BETotalPage}
                                                    variant="outlined"
                                                    size="medium"
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    page={this.state.BE_Page}
                                                    onChange={(e, value) => this.handleChangePage(e, value, 'BE')}
                                                />
                                            </ThemeProvider>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={cx('page-number')}>
                        {`${this.props.index + 1} / ${this.props.totalPage} trang`}{' '}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
        isUpdateProductImageLoading: state.user.isLoading.updateProduct,
        isCreateTechnologyLoading: state.user.isLoading.createTechnology,
        shouldUpdateProductNameAndDesc: state.user.shouldUpdateProductNameAndDesc,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (data, index, updatedItem) => dispatch(userActions.updateProduct(data, index, updatedItem)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
