import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Pagination from '@mui/material/Pagination';
import { HiOutlineSearch } from 'react-icons/hi';
import _ from 'lodash';

import styles from './Product.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import TechnologyList from './TechnologyList.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            FE_isPagination: true,
            FE_Page: 1,
            FE_PageSize: 10,
            FE_sortBy: '',
            FE_isSearch: false,

            BE_isPagination: true,
            BE_Page: 1,
            BE_PageSize: 10,
            BE_sortBy: '',
            BE_isSearch: false,

            isModalOpen: false,
            uploadImageUrl: '',
            image: '',

            isSearch: false,
            searchLibraryList: [],
        };
    }

    onCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ image: url });
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

    handleSortLibraryName = (e, side) => {
        if (e.target.value === 'NO') {
            this.setState({ [`${side === 'FE' ? 'FE_sortBy' : 'BE_sortBy'}`]: '' });
        } else if (e.target.value === 'AZ') {
            this.setState({ [`${side === 'FE' ? 'FE_sortBy' : 'BE_sortBy'}`]: 'asc' });
        } else if (e.target.value === 'ZA') {
            this.setState({ [`${side === 'FE' ? 'FE_sortBy' : 'BE_sortBy'}`]: 'desc' });
        }
    };

    handleSearchLibrary = async (e, side) => {
        const value = e.target.value?.trim();
        const { productInfo, FELibraryList, BELibraryList } = this.props?.productdata ?? {};

        // Check value is not empty
        if (value) {
            await this.setState({ [`${side === 'FE' ? 'FE_isSearch' : 'BE_isSearch'}`]: true });

            const libraryList = side === 'FE' ? FELibraryList : BELibraryList;

            // Loop through all library button in list
            _.forEach(libraryList, function (library) {
                const libraryName = document.getElementById(`js-button-name-LIBRARY-${library.id}`);

                if (libraryName) {
                    const buttonContainer = libraryName.closest(`#js-button-container-LIBRARY-${library.id}`);

                    if (buttonContainer) {
                        // Clear background-color: yellow of all previous button
                        buttonContainer.style.display = 'block';
                        libraryName.innerHTML = library.name;

                        // Set background-color: yellow for button matches search value input
                        const regex = new RegExp(value, 'gi');
                        const name = libraryName.innerHTML.replace(
                            /(<mark style={{ backgroundColor: 'yellow'}}>|<\/mark>)/gim,
                            '',
                        );
                        const newName = name.replace(regex, `<mark  style={{ backgroundColor: 'yellow'}}>$&</mark>`);

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

            const searchLibraryList = document.getElementById(
                `js-library-list-${side === 'FE' ? 'FE' : 'BE'}-${productInfo?.id}`,
            );
            const resultNotFound = document.getElementById(`js-result-not-found-${side === 'FE' ? 'FE' : 'BE'}`);

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
                    notFoundElement.className = cx(`search-result-not-found-${side === 'FE' ? 'FE' : 'BE'}`);
                    notFoundElement.id = `js-result-not-found-${side === 'FE' ? 'FE' : 'BE'}`;
                    notFoundElement.innerText = 'Không tìm thấy kết quả';

                    searchLibraryList.appendChild(notFoundElement);
                }
            }
        } else {
            // If value is empty
            await this.setState({ [`${side === 'FE' ? 'FE_isSearch' : 'BE_isSearch'}`]: false });

            const libraryList = side === 'FE' ? FELibraryList : BELibraryList;

            // Restore the original state of the button
            _.forEach(libraryList, function (library) {
                const libraryName = document.getElementById(`js-button-name-LIBRARY-${library.id}`);

                if (libraryName) {
                    libraryName.innerHTML = library.name;
                    const closest = libraryName.closest(`#js-button-container-LIBRARY-${library.id}`);

                    if (closest) {
                        closest.style.display = 'block';
                    }
                }
            });
        }
    };

    // =================================================================

    componentDidUpdate(prevProps) {
        // Turn to last page when add or delete a library
        if (this.props?.productdata?.numberofFELibrary !== prevProps.productdata?.numberofFELibrary) {
            const { numberofFELibrary } = this.props?.productdata ?? {};
            const FE_FinalPage = Math.ceil(numberofFELibrary / this.state.FE_PageSize);
            this.setState({ FE_Page: FE_FinalPage });
        }

        if (this.props?.productdata?.numberofBELibrary !== prevProps.productdata?.numberofBELibrary) {
            const { numberofBELibrary } = this.props?.productdata ?? {};
            const BE_FinalPage = Math.ceil(numberofBELibrary / this.state.BE_PageSize);
            this.setState({ BE_Page: BE_FinalPage });
        }
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
        } = this.props?.productdata ?? {};

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
        const FE_LibraryList_SortedOrNot = this.state.FE_sortBy
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

        // Check BE_isSearch and BE_sortBy in order to use BE Library List
        const BE_LibraryList = this.state.BE_isSearch ? BE_AllLibraryList : BELibraryListArray;
        const BE_LibraryList_SortedOrNot = this.state.BE_sortBy
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
        // =================================================================

        const dataForReadLibraryAfterSorting = {
            isPagination: this.state.isPagination,
            selectedPage: this.state.selectedPage,
            itemsPerPage: this.state.itemsPerPage,
            sortBy: this.state.sortBy,
        };

        return (
            <div className={cx('product')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col pc-12')}>
                        <div className={cx('product-desc')} spellCheck="false">
                            <div className={cx('work-exp')}>
                                <ContentEditableTag
                                    content={this.state.name || productInfo?.name}
                                    className={cx('exp')}
                                    placeholder="Tên sản phẩm"
                                />
                            </div>
                            <ContentEditableTag
                                content={this.state.desc || productInfo?.desc}
                                className={cx('desc')}
                                placeholder="Mô tả sản phẩm"
                            />
                        </div>
                    </div>

                    <div className={cx('col pc-9')}>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -300]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <div className={cx('tooltip')} onClick={() => this.setState({ isModalOpen: true })}>
                                        Sửa ảnh
                                    </div>
                                </div>
                            )}
                        >
                            <Image src={this.state.image} className={cx('image')} alt="Ảnh sản phẩm" />
                        </HeadlessTippy>

                        {this.state.isModalOpen && (
                            <ChangeImageModal
                                round={false}
                                onClose={this.onCloseChangeImageModal}
                                onGetUrl={this.getImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>

                    <div className={cx('col pc-3')}>
                        <div className={cx('source-code-section')}>
                            <div className={cx('list')}>
                                <TechnologyList
                                    draggable
                                    label="source code"
                                    type="SOURCECODE"
                                    keyprop="SC"
                                    productId={productInfo?.id}
                                    technologylist={sourceCodeList}
                                    // =================================================================
                                    // CRUD Source Code
                                    onCreateTechnology={this.props.onCreateTechnology}
                                    onUpdateTechnology={this.props.onUpdateTechnology}
                                    onDeleteTechnology={this.props.onDeleteTechnology}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('col pc-12')}>
                    <div className={cx('technology')}>
                        <div className={cx('server', 'front-end')}>
                            <span className={cx('server-side-title')}>FRONT-END</span>
                            <div className={cx('technology-used')}>
                                <div className={cx('technology-used-title')}>
                                    <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                </div>
                                <div className={cx('list')}>
                                    <TechnologyList
                                        draggable
                                        label="công nghệ sử dụng"
                                        type="TECHNOLOGY"
                                        keyprop="TE"
                                        side="FE"
                                        productId={productInfo?.id}
                                        technologylist={FETechnologyList}
                                        // =================================================================
                                        // CRUD FE Technology List
                                        onCreateTechnology={this.props.onCreateTechnology}
                                        onUpdateTechnology={this.props.onUpdateTechnology}
                                        onDeleteTechnology={this.props.onDeleteTechnology}
                                    />
                                </div>
                            </div>

                            <div className={cx('library-used')}>
                                <div className={cx('library-used-title')}>
                                    <span className={cx('title')}>THƯ VIỆN SỬ DỤNG</span>
                                </div>
                                <div className={cx('library-filter-sort')}>
                                    <div className={cx('library-filter')}>
                                        <span className={cx('library-filter-icon')}>
                                            <HiOutlineSearch />
                                        </span>
                                        <input
                                            autoComplete="off"
                                            id="js-input-search-library"
                                            type="text"
                                            className={cx('library-filter-search')}
                                            spellCheck="false"
                                            onInput={(e) => this.handleSearchLibrary(e, 'FE')}
                                        />
                                    </div>
                                    <div className={cx('library-sort')}>
                                        <span className={cx('library-sort-heading')}>Sắp xếp </span>
                                        <select
                                            className={cx('library-sort-select')}
                                            onChange={(e) => this.handleSortLibraryName(e, 'FE')}
                                        >
                                            <option value="NO">---</option>
                                            <option value="AZ">A - Z</option>
                                            <option value="ZA">Z - A</option>
                                        </select>
                                    </div>
                                </div>

                                {!this.state.FE_isSearch && (
                                    <div className={cx('display')}>
                                        <label className={cx('label')}>Hiển thị : </label>
                                        {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                            return (
                                                <Button
                                                    id={`js-display-paginition-FE-${productInfo?.id}`}
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
                                )}

                                <TechnologyList
                                    id={`js-library-list-FE-${productInfo?.id}`}
                                    draggable
                                    label="thư viện FE"
                                    type="LIBRARY"
                                    keyprop="LI"
                                    side="FE"
                                    productId={productInfo?.id}
                                    technologylist={FE_LibraryList_SortedOrNot}
                                    // =================================================================
                                    // CRUD FE Library List
                                    onCreateTechnology={this.props.onCreateTechnology}
                                    onUpdateTechnology={this.props.onUpdateTechnology}
                                    onDeleteTechnology={this.props.onDeleteTechnology}
                                    // =================================================================
                                    // Search
                                    isSearch={this.state.FE_isSearch}
                                    // =================================================================
                                    // Sort
                                    sortupdatetechnology={this.props.updateLibrary}
                                    dataforsort={dataForReadLibraryAfterSorting}
                                />

                                {!this.state.FE_isSearch && this.state.FE_isPagination && (
                                    <div className={cx('pagination-container')}>
                                        <Pagination
                                            count={FETotalPage}
                                            variant="outlined"
                                            size="medium"
                                            siblingCount={1}
                                            boundaryCount={1}
                                            page={this.state.FE_Page}
                                            sx={{
                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root': {
                                                    color: 'var(--primary-color)',
                                                    fontSize: '12px',
                                                    borderColor: 'var(--green-color-02)',
                                                },
                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                                                    backgroundColor: 'var(--button-bgc-green-02)',
                                                },

                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
                                                    {
                                                        color: '#fff',
                                                        backgroundColor: 'var(--button-bgc-green-01)',
                                                    },

                                                '& .Mui-selected:hover': {
                                                    backgroundColor: 'var(--button-bgc-green-01) !important',
                                                },
                                            }}
                                            onChange={(e, value) => this.handleChangePage(e, value, 'FE')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={cx('separate')}></div>

                        <div className={cx('server', 'back-end')}>
                            <span className={cx('server-side-title')}>BACK-END</span>
                            <div className={cx('technology-used')}>
                                <div className={cx('technology-used-title')}>
                                    <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                </div>
                                <div className={cx('list')}>
                                    <TechnologyList
                                        draggable
                                        label="công nghệ sử dụng"
                                        type="TECHNOLOGY"
                                        keyprop="TE"
                                        side="BE"
                                        productId={productInfo?.id}
                                        technologylist={BETechnologyList}
                                        // =================================================================
                                        // CRUD FE Technology List
                                        onCreateTechnology={this.props.onCreateTechnology}
                                        onUpdateTechnology={this.props.onUpdateTechnology}
                                        onDeleteTechnology={this.props.onDeleteTechnology}
                                    />
                                </div>
                            </div>
                            <div className={cx('library-used')}>
                                <div className={cx('library-used-title')}>
                                    <span className={cx('title')}>THƯ VIỆN SỬ DỤNG</span>
                                </div>
                                <div className={cx('library-filter-sort')}>
                                    <div className={cx('library-filter')}>
                                        <span className={cx('library-filter-icon')}>
                                            <HiOutlineSearch />
                                        </span>
                                        <input
                                            autoComplete="off"
                                            id="js-input-search-library"
                                            type="text"
                                            className={cx('library-filter-search')}
                                            spellCheck="false"
                                            onInput={(e) => this.handleSearchLibrary(e, 'BE')}
                                        />
                                    </div>
                                    <div className={cx('library-sort')}>
                                        <span className={cx('library-sort-heading')}>Sắp xếp </span>
                                        <select
                                            className={cx('library-sort-select')}
                                            onChange={(e) => this.handleSortLibraryName(e, 'BE')}
                                        >
                                            <option value="NO">---</option>
                                            <option value="AZ">A - Z</option>
                                            <option value="ZA">Z - A</option>
                                        </select>
                                    </div>
                                </div>
                                {!this.state.BE_isSearch && (
                                    <div className={cx('display')}>
                                        <label className={cx('label')}>Hiển thị : </label>
                                        {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                            return (
                                                <Button
                                                    id={`js-display-paginition-BE-${productInfo?.id}`}
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
                                )}

                                <TechnologyList
                                    id={`js-library-list-BE-${productInfo?.id}`}
                                    draggable
                                    label="thư viện BE"
                                    type="LIBRARY"
                                    keyprop="LI"
                                    side="BE"
                                    productId={productInfo?.id}
                                    technologylist={BE_LibraryList_SortedOrNot}
                                    // =================================================================
                                    // CRUD BE Library List
                                    onCreateTechnology={this.props.onCreateTechnology}
                                    onUpdateTechnology={this.props.onUpdateTechnology}
                                    onDeleteTechnology={this.props.onDeleteTechnology}
                                    // =================================================================
                                    // Search
                                    isSearch={this.state.BE_isSearch}
                                    // =================================================================
                                    // Sort
                                    isloading={this.props.isLibraryLoading}
                                    sortupdatetechnology={this.props.updateLibrary}
                                    dataforsort={dataForReadLibraryAfterSorting}
                                />

                                {!this.state.BE_isSearch && this.state.BE_isPagination && (
                                    <div className={cx('pagination-container')}>
                                        <Pagination
                                            count={BETotalPage}
                                            variant="outlined"
                                            size="medium"
                                            siblingCount={1}
                                            boundaryCount={1}
                                            page={this.state.BE_Page}
                                            sx={{
                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root': {
                                                    color: 'var(--primary-color)',
                                                    fontSize: '12px',
                                                    borderColor: 'var(--green-color-02)',
                                                },
                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                                                    backgroundColor: 'var(--button-bgc-green-02)',
                                                },

                                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
                                                    {
                                                        color: '#fff',
                                                        backgroundColor: 'var(--button-bgc-green-01)',
                                                    },

                                                '& .Mui-selected:hover': {
                                                    backgroundColor: 'var(--button-bgc-green-01) !important',
                                                },
                                            }}
                                            onChange={(e, value) => this.handleChangePage(e, value, 'BE')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
