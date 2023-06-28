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

            BE_isPagination: true,
            BE_Page: 1,
            BE_PageSize: 10,
            BE_sortBy: '',

            isModalOpen: false,
            uploadImageUrl: '',
            image: '',

            isSearch: false,
            searchLibraryList: [],
        };

        this.lastPage = React.createRef();
    }

    onCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ image: url });
    };

    FEorBESide = () => {
        const side = this.state.isFE ? 'FE' : 'BE';
        return side;
    };

    handleChangePagePaginition = (event, value, side) => {
        if (side === 'FE') {
            this.setState({ FE_Page: value });
        }

        if (side === 'BE') {
            this.setState({ BE_Page: value });
        }
    };

    hanldeChangeNumberItemsPerPage = (e, side, productId) => {
        const value = e.target.innerText;
        if (value === 'Tất cả') {
            if (side === 'FE') {
                this.setState({
                    FE_isPagination: false,
                });
            }

            if (side === 'BE') {
                this.setState({
                    BE_isPagination: false,
                });
            }
        } else {
            if (side === 'FE') {
                this.setState({
                    FE_isPagination: true,
                    FE_PageSize: +value,
                    FE_Page: 1,
                });
            }

            if (side === 'BE') {
                this.setState({
                    BE_isPagination: true,
                    BE_PageSize: +value,
                    BE_Page: 1,
                });
            }
        }

        const parentElement = e.target.parentNode;
        const allDisplayButtons = parentElement?.childNodes;
        if (allDisplayButtons) {
            allDisplayButtons.forEach((displayButton) => {
                const isActive = displayButton.classList.contains(cx('active'));
                if (isActive) {
                    displayButton.classList.remove(cx('active'));
                }
            });
        }
        e.target.classList.add(cx('active'));
    };

    // =================================================================

    handleSortLibraryName = (e, side) => {
        if ((side = 'FE')) {
            if (e.target.value === 'NO') {
                this.setState({ FE_sortBy: '' });
            } else if (e.target.value === 'AZ') {
                this.setState({ FE_sortBy: 'asc' });
            } else if (e.target.value === 'ZA') {
                this.setState({ FE_sortBy: 'desc' });
            }
        }

        if ((side = 'BE')) {
            if (e.target.value === 'NO') {
                this.setState({ BE_sortBy: '' });
            } else if (e.target.value === 'AZ') {
                this.setState({ BE_sortBy: 'asc' });
            } else if (e.target.value === 'ZA') {
                this.setState({ BE_sortBy: 'desc' });
            }
        }
    };

    handleSearchLibrary = async () => {
        const inputSearchLibrary = document.getElementById(`js-input-search-library`);
        if (inputSearchLibrary) {
            const value = inputSearchLibrary.value?.trim();

            await this.setState({ isSearch: true });
            await this.props.readLibrary(this.FEorBESide());

            if (value) {
                _.forEach(this.props.libraryList, function (lib) {
                    const buttonContainer = document.getElementById(`js-button-container-LIBRARY-${lib.id}`);
                    const libraryName = document.getElementById(`js-button-name-LIBRARY-${lib.id}`);

                    if (buttonContainer && libraryName) {
                        buttonContainer.style.display = 'none';

                        const regex = new RegExp(value, 'gi');
                        const name = lib.name.replace(/(<mark style={{ backgroundColor: 'yellow'}}>|<\/mark>)/gim, '');
                        const newName = name.replace(regex, `<mark  style={{ backgroundColor: 'yellow'}}>$&</mark>`);

                        if (name !== newName) {
                            libraryName.innerHTML = newName;
                            buttonContainer.style.display = 'inline-flex';
                        }
                    }
                });

                const searchLibraryList = document.getElementById(`js-search-library-list`);
                const displayNoneLibrary = searchLibraryList.querySelectorAll(`[style*=none]`);
                const resultNotFound = document.getElementById(`js-result-not-found`);

                if (resultNotFound) {
                    resultNotFound.remove();
                }

                if (searchLibraryList) {
                    if (displayNoneLibrary.length === this.props.libraryList.length) {
                        const notFoundElement = document.createElement('p');
                        notFoundElement.className = cx('search-result-not-found');
                        notFoundElement.id = `js-result-not-found`;
                        notFoundElement.innerText = 'Không tìm thấy kết quả';

                        searchLibraryList.appendChild(notFoundElement);
                    }
                }
            } else {
                await this.setState({ isSearch: false, isPagination: true });

                if (this.state.isPagination) {
                    await this.props.readLibrary(this.FEorBESide(), this.state.selectedPage, this.state.itemsPerPage);
                } else {
                    await this.props.readLibrary(this.FEorBESide());
                }
            }
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

        // If page's quantity is more than 1, libray list's height of page 2, 3, 4,... will be equal to page 1
        // const libraryList = document.getElementById('js-library-list');
        // if (libraryList) {
        //     if (this.props.pageQuantityLibrary > 1) {
        //         const height = libraryList.childNodes[0].offsetHeight * this.state.itemsPerPage;
        //         libraryList.style.minHeight = `${height}px`;
        //     } else {
        //         libraryList.style.minHeight = `initial`;
        //     }
        // }
    }

    render() {
        const {
            productInfo,
            sourceCodeList,
            FETechnologyList,
            BETechnologyList,
            FELibraryList,
            numberofFELibrary,
            BELibraryList,
            numberofBELibrary,
        } = this.props?.productdata ?? {};

        const FETotalPage = Math.ceil(numberofFELibrary / this.state.FE_PageSize);
        const BETotalPage = Math.ceil(numberofBELibrary / this.state.BE_PageSize);

        // =================================================================
        const FE_paginatedLibraryList = _.chunk(FELibraryList, this.state.FE_PageSize);
        const FE_selectedList = FE_paginatedLibraryList[this.state.FE_Page - 1];
        const BE_paginatedLibraryList = _.chunk(BELibraryList, this.state.BE_PageSize);
        const BE_selectedList = BE_paginatedLibraryList[this.state.BE_Page - 1];

        const FELibraryListArray = this.state.FE_isPagination ? FE_selectedList : FELibraryList;
        const BELibraryListArray = this.state.BE_isPagination ? BE_selectedList : BELibraryList;

        // =================================================================

        const dataForReadLibraryAfterSorting = {
            isPagination: this.state.isPagination,
            side: this.FEorBESide(),
            selectedPage: this.state.selectedPage,
            itemsPerPage: this.state.itemsPerPage,
            sortBy: this.state.sortBy,
        };

        const copyLibraryList = this.props?.technologies?.libraryList;

        const sortedDataLibraryList = this.state.sortBy
            ? _.orderBy(
                  [...copyLibraryList],
                  [
                      (value) => {
                          return value.name?.toLowerCase();
                      },
                  ],
                  [this.state.sortBy],
              )
            : copyLibraryList;

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
                                            onInput={this.handleSearchLibrary}
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

                                {!this.state.isSearch ? (
                                    <div>
                                        <div className={cx('display')}>
                                            <label className={cx('label')}>Hiển thị : </label>
                                            {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                                return (
                                                    <Button
                                                        id={`js-display-paginition-FE-${productInfo?.id}`}
                                                        key={index}
                                                        className={cx('button', { active: button === 10 })}
                                                        onClick={(e) => this.hanldeChangeNumberItemsPerPage(e, 'FE')}
                                                    >
                                                        {button}
                                                    </Button>
                                                );
                                            })}
                                        </div>

                                        <TechnologyList
                                            id="js-library-list-FE"
                                            draggable
                                            label="thư viện FE"
                                            type="LIBRARY"
                                            keyprop="LI"
                                            side="FE"
                                            productId={productInfo?.id}
                                            technologylist={FELibraryListArray}
                                            // CRUD FE Library List
                                            onCreateTechnology={this.props.onCreateTechnology}
                                            onUpdateTechnology={this.props.onUpdateTechnology}
                                            onDeleteTechnology={this.props.onDeleteTechnology}
                                            // =================================================================
                                            sortupdatetechnology={this.props.updateLibrary}
                                            dataforsort={dataForReadLibraryAfterSorting}
                                        />

                                        {this.state.FE_isPagination && (
                                            <div
                                                style={{
                                                    marginTop: '12px',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}
                                            >
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
                                                        '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover':
                                                            {
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
                                                    onChange={(e, value) =>
                                                        this.handleChangePagePaginition(e, value, 'FE')
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <TechnologyList
                                        issearch
                                        id="js-search-library-list"
                                        draggable
                                        label="thư viện"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        side="FE"
                                        isloading={this.props.isLibraryLoading}
                                        technologylist={sortedDataLibraryList}
                                        searchLibrary={this.handleSearchLibrary}
                                        sortupdatetechnology={this.props.updateLibrary}
                                        dataforsort={dataForReadLibraryAfterSorting}
                                    />
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
                                            onInput={this.handleSearchLibrary}
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
                                <div className={cx('display')}>
                                    <label className={cx('label')}>Hiển thị : </label>
                                    {['Tất cả', 10, 20, 30, 40, 50].map((button, index) => {
                                        return (
                                            <Button
                                                id={`js-display-paginition-BE-${productInfo?.id}`}
                                                key={index}
                                                className={cx('button', { active: button === 10 })}
                                                onClick={(e) => this.hanldeChangeNumberItemsPerPage(e, 'BE')}
                                            >
                                                {button}
                                            </Button>
                                        );
                                    })}
                                </div>

                                {!this.state.isSearch ? (
                                    <div>
                                        <TechnologyList
                                            id="js-library-list-BE"
                                            draggable
                                            label="thư viện BE"
                                            type="LIBRARY"
                                            keyprop="LI"
                                            side="BE"
                                            productId={productInfo?.id}
                                            technologylist={BELibraryListArray}
                                            // CRUD BE Library List
                                            onCreateTechnology={this.props.onCreateTechnology}
                                            onUpdateTechnology={this.props.onUpdateTechnology}
                                            onDeleteTechnology={this.props.onDeleteTechnology}
                                            // --------------------------------
                                            isloading={this.props.isLibraryLoading}
                                            sortupdatetechnology={this.props.updateLibrary}
                                            dataforsort={dataForReadLibraryAfterSorting}
                                        />

                                        {this.state.BE_isPagination && (
                                            <div
                                                style={{
                                                    margin: '12px 0 12px',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}
                                            >
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
                                                        '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover':
                                                            {
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
                                                    onChange={(e, value) =>
                                                        this.handleChangePagePaginition(e, value, 'BE')
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <TechnologyList
                                        issearch
                                        id="js-search-library-list"
                                        draggable
                                        label="thư viện"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        isloading={this.props.isLibraryLoading}
                                        technologylist={sortedDataLibraryList}
                                        searchLibrary={this.handleSearchLibrary}
                                        sortupdatetechnology={this.props.updateLibrary}
                                        dataforsort={dataForReadLibraryAfterSorting}
                                    />
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
