import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Pagination from '@mui/material/Pagination';
import { HiOutlineSearch } from 'react-icons/hi';
import _ from 'lodash';
import { Buffer } from 'buffer';

import styles from './Product.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import TechnologyList from './TechnologyList.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import * as userActions from '~/store/actions';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPagination: true,
            FEpage: 1,
            FEpageSize: 10,
            BEpage: 1,
            BEpageSize: 10,

            isModalOpen: false,
            uploadImageUrl: '',
            image: '',
            sortBy: '',

            isSearch: false,
            searchLibraryList: [],
        };

        this.lastPage = React.createRef();
    }

    onClose = () => {
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

    handleChangePage = (event, value) => {
        this.setState({ selectedPage: value });
        this.props.readLibrary(this.FEorBESide(), value, this.state.itemsPerPage);
    };

    handleShowAllLibraryList = (side) => {
        const showAllButton = document.getElementById(`js-show-all-button-${side}`);
        if (!showAllButton.classList.contains(`${cx('active')}`)) {
            this.props.readLibrary(this.FEorBESide());
            this.setState({ isPagination: false });
        }

        const paginationButton = document.getElementById('js-pagination-button');

        showAllButton.classList.add(`${cx('active')}`);
        paginationButton.classList.remove(`${cx('active')}`);
    };

    hanldeShowPagination = async () => {
        const showAllButton = document.getElementById('js-show-all-button');
        const paginationButton = document.getElementById('js-pagination-button');
        const paginationSelect = document.getElementById('js-pagination-select');

        if (paginationSelect) {
            paginationSelect.onclick = (e) => e.stopPropagation();
        }

        if (paginationButton) {
            paginationButton.classList.add(`${cx('active')}`);
        }

        if (showAllButton) {
            showAllButton.classList.remove(`${cx('active')}`);
        }

        await this.setState({ isPagination: true, selectedPage: 1, itemsPerPage: paginationSelect?.value });
        await this.props.readLibrary(this.FEorBESide(), 1, this.state.itemsPerPage);
    };

    handleChangeItemsPerPage = async (e) => {
        const showAllButton = document.getElementById('js-show-all-button');
        const paginationButton = document.getElementById('js-pagination-button');

        paginationButton.classList.add(`${cx('active')}`);
        showAllButton.classList.remove(`${cx('active')}`);

        await this.setState({ isPagination: true, selectedPage: 1, itemsPerPage: e.target.value });
        await this.props.readLibrary(this.FEorBESide(), 1, this.state.itemsPerPage);
    };

    // =================================================================

    // CRUD Library
    handleCreateLibrary = async (data) => {
        const side = this.FEorBESide();
        const libraryData = {
            side: side,
            ...data,
        };

        const { errorCode, totalRows } = await this.props.createLibrary(libraryData);

        if (errorCode === 0) {
            if (this.state.isPagination) {
                const lastPage = Math.ceil(totalRows / this.state.itemsPerPage);
                await this.setState({
                    selectedPage: lastPage,
                });
                await this.props.readLibrary(side, lastPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(side);
            }

            return { errorCode };
        } else {
            return { errorCode };
        }
    };

    handleUpdateLibrary = async (data) => {
        const side = this.FEorBESide();
        const libraryData = {
            side: side,
            ...data,
        };

        const errorCode = await this.props.updateLibrary(libraryData, true);

        if (errorCode === 0) {
            if (this.state.isPagination) {
                await this.props.readLibrary(side, this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(side);
            }

            return errorCode;
        } else {
            return errorCode;
        }
    };

    handleDeleteLibrary = async (id) => {
        const side = this.FEorBESide();
        const { errorCode, totalRows } = await this.props.deleteLibrary(id, side);

        if (errorCode === 0) {
            if (this.state.isPagination) {
                const lastPage = Math.ceil(totalRows / this.state.itemsPerPage);
                if (lastPage < this.state.selectedPage) {
                    this.setState({ selectedPage: lastPage });
                    this.props.readLibrary(side, lastPage, this.state.itemsPerPage);
                }

                await this.props.readLibrary(side, lastPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(side);
            }

            return { errorCode };
        } else {
            return { errorCode };
        }
    };

    // =================================================================

    handleSortLibraryName = (e) => {
        if (e.target.value === 'NO') {
            this.setState({ sortBy: '' });
        } else if (e.target.value === 'AZ') {
            this.setState({ sortBy: 'asc' });
        } else if (e.target.value === 'ZA') {
            this.setState({ sortBy: 'desc' });
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

    componentDidMount() {
        this.props.readLibrary(this.FEorBESide(), this.state.selectedPage, this.state.itemsPerPage);
        this.props.readBETechnology('ALL');
        this.props.readSourceCode('ALL');
        this.props.readFETechnology('ALL');

        // if (this.props.productData) {
        //     const productInfo = this.props.productData?.productInfo;

        //     const binaryImage = Buffer.from(productInfo.image, 'base64').toString('binary');
        //     this.setState({ name: productInfo.name, desc: productInfo.desc, image: binaryImage });
        // }

        // const technologies = this.props.productData?.technologies;
        // console.log('PRODUCT DATA:', this.props.productData?.productInfo, this.props.productData?.technologies);
    }

    componentDidUpdate() {
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
                                    content={this.state.name}
                                    className={cx('exp')}
                                    placeholder="Tên sản phẩm"
                                />
                            </div>
                            <ContentEditableTag
                                content={this.state.desc}
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
                                onClose={this.onClose}
                                onGetUrl={this.getImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>
                    <div className={cx('col pc-3')}>
                        <div className={cx('source-code-section')}>
                            <div className={cx('list')}>
                                <TechnologyList
                                    draggable
                                    technology="source code"
                                    type="SOURCECODE"
                                    keyprop="SC"
                                    technologylist={this.props.sourceCodeList}
                                    isloading={this.props.isSourceCodeLoading}
                                    readtechnology={() => this.props.readSourceCode('ALL')}
                                    createtechnology={this.props?.technologies?.sourceCodeList}
                                    updatetechnology={this.props.updateSourceCode}
                                    deletetechnology={this.props.deleteSourceCode}
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
                                <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                <div className={cx('list')}>
                                    <TechnologyList
                                        draggable
                                        technology="công nghệ sử dụng"
                                        type="FRONTEND_TECHNOLOGY"
                                        keyprop="FT"
                                        technologylist={this.props?.technologies?.FETechnologyList}
                                        isloading={this.props.isFETechnologyLoading}
                                        readtechnology={() => this.props.readFETechnology('ALL')}
                                        createtechnology={this.props.createFETechnology}
                                        updatetechnology={this.props.updateFETechnology}
                                        deletetechnology={this.props.deleteFETechnology}
                                    />
                                </div>
                            </div>

                            <div className={cx('library-used')}>
                                <span className={cx('title')}>THƯ VIỆN SỬ DỤNG</span>
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
                                            onChange={(e) => this.handleSortLibraryName(e)}
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
                                            <Button
                                                className={cx('button')}
                                                id="js-show-all-button"
                                                onClick={this.handleShowAllLibraryList}
                                            >
                                                Hiển thị tất cả
                                            </Button>
                                            <Button
                                                className={cx('button', 'pag-button', 'active')}
                                                id="js-pagination-button"
                                                onClick={this.hanldeShowPagination}
                                            >
                                                <label className={cx('label')}>Phân trang</label>
                                                <select
                                                    className={cx('select')}
                                                    id="js-pagination-select"
                                                    onChange={(e) => this.handleChangeItemsPerPage(e)}
                                                >
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </Button>
                                        </div>

                                        <TechnologyList
                                            id="js-library-list"
                                            draggable
                                            technology="thư viện"
                                            type="LIBRARY"
                                            keyprop="LI"
                                            isloading={this.props.isLibraryLoading}
                                            technologylist={sortedDataLibraryList}
                                            readtechnology={this.props.readLibrary}
                                            createtechnology={this.handleCreateLibrary}
                                            updatetechnology={this.handleUpdateLibrary}
                                            deletetechnology={this.handleDeleteLibrary}
                                            sortupdatetechnology={this.props.updateLibrary}
                                            dataforsort={dataForReadLibraryAfterSorting}
                                        />

                                        {this.state.isPagination && (
                                            <div
                                                style={{
                                                    margin: '12px 0 12px',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}
                                            >
                                                <Pagination
                                                    count={this.props.pageQuantityLibrary}
                                                    variant="outlined"
                                                    size="medium"
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    page={this.state.selectedPage}
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
                                                    onChange={this.handleChangePage}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <TechnologyList
                                        issearch
                                        id="js-search-library-list"
                                        draggable
                                        technology="thư viện"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        isloading={this.props.isLibraryLoading}
                                        technologylist={sortedDataLibraryList}
                                        readtechnology={this.props.readLibrary}
                                        createtechnology={this.handleCreateLibrary}
                                        updatetechnology={this.handleUpdateLibrary}
                                        deletetechnology={this.handleDeleteLibrary}
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
                                <span className={cx('title')}>CÔNG NGHỆ SỬ DỤNG</span>
                                <div className={cx('list')}>
                                    <TechnologyList
                                        draggable
                                        technology="công nghệ sử dụng"
                                        type="FRONTEND_TECHNOLOGY"
                                        keyprop="FT"
                                        technologylist={this.props?.technologies?.FETechnologyList}
                                        isloading={this.props.isFETechnologyLoading}
                                        readtechnology={() => this.props.readFETechnology('ALL')}
                                        createtechnology={this.props.createFETechnology}
                                        updatetechnology={this.props.updateFETechnology}
                                        deletetechnology={this.props.deleteFETechnology}
                                    />
                                </div>
                            </div>
                            <div className={cx('library-used')}>
                                <span className={cx('title')}>Back-end</span>
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
                                            onChange={(e) => this.handleSortLibraryName(e)}
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
                                            <Button
                                                className={cx('button')}
                                                id="js-show-all-button"
                                                onClick={this.handleShowAllLibraryList}
                                            >
                                                Hiển thị tất cả
                                            </Button>
                                            <Button
                                                className={cx('button', 'pag-button', 'active')}
                                                id="js-pagination-button"
                                                onClick={this.hanldeShowPagination}
                                            >
                                                <label className={cx('label')}>Phân trang</label>
                                                <select
                                                    className={cx('select')}
                                                    id="js-pagination-select"
                                                    onChange={(e) => this.handleChangeItemsPerPage(e)}
                                                >
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </Button>
                                        </div>

                                        <TechnologyList
                                            id="js-library-list"
                                            draggable
                                            technology="thư viện"
                                            type="LIBRARY"
                                            keyprop="LI"
                                            isloading={this.props.isLibraryLoading}
                                            technologylist={sortedDataLibraryList}
                                            readtechnology={this.props.readLibrary}
                                            createtechnology={this.handleCreateLibrary}
                                            updatetechnology={this.handleUpdateLibrary}
                                            deletetechnology={this.handleDeleteLibrary}
                                            sortupdatetechnology={this.props.updateLibrary}
                                            dataforsort={dataForReadLibraryAfterSorting}
                                        />

                                        {this.state.isPagination && (
                                            <div
                                                style={{
                                                    margin: '12px 0 12px',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}
                                            >
                                                <Pagination
                                                    count={this.props.pageQuantityLibrary}
                                                    variant="outlined"
                                                    size="medium"
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    page={this.state.selectedPage}
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
                                                    onChange={this.handleChangePage}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <TechnologyList
                                        issearch
                                        id="js-search-library-list"
                                        draggable
                                        technology="thư viện"
                                        type="LIBRARY"
                                        keyprop="LI"
                                        isloading={this.props.isLibraryLoading}
                                        technologylist={sortedDataLibraryList}
                                        readtechnology={this.props.readLibrary}
                                        createtechnology={this.handleCreateLibrary}
                                        updatetechnology={this.handleUpdateLibrary}
                                        deletetechnology={this.handleDeleteLibrary}
                                        searchLibrary={this.handleSearchLibrary}
                                        sortupdatetechnology={this.props.updateLibrary}
                                        dataforsort={dataForReadLibraryAfterSorting}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('col pc-12')}>
                    <div className={cx('technology-section')}>
                        <span className={cx('technology-section-subject')}>CÔNG NGHỆ SỬ DỤNG</span>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-6')}>
                                <div className={cx('technology-wrapper', 'left')}></div>
                            </div>
                            <div className={cx('col pc-6')}>
                                <div className={cx('technology-wrapper', 'right')}>
                                    <div className={cx('technology-used')}>
                                        <span className={cx('title')}>Back-end</span>
                                        <div className={cx('list')}>
                                            <TechnologyList
                                                draggable
                                                technology="công nghệ sử dụng"
                                                type="FRONTEND_TECHNOLOGY"
                                                keyprop="FT"
                                                technologylist={this.props?.technologies?.FETechnologyList}
                                                isloading={this.props.isFETechnologyLoading}
                                                readtechnology={() => this.props.readFETechnology('ALL')}
                                                createtechnology={this.props.createFETechnology}
                                                updatetechnology={this.props.updateFETechnology}
                                                deletetechnology={this.props.deleteFETechnology}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('col pc-12')}>
                    <div className={cx('technology-section')}>
                        <span className={cx('technology-section-subject')}>THƯ VIỆN SỬ DỤNG</span>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-6')}>
                                <div className={cx('technology-wrapper', 'left')}></div>
                            </div>
                            <div className={cx('col pc-6')}>
                                <div className={cx('technology-wrapper', 'right')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // Library
        isLibraryLoading: state.user.isLoading.library,
        libraryList: state.user.libraries,
        pageQuantityLibrary: state.user.pageQuantityLibrary,

        // Source code
        isSourceCodeLoading: state.user.isLoading.sourcecode,
        sourceCodeList: state.user.sourcecodes,

        // FE Technology
        isFETechnologyLoading: state.user.isLoading.FETechnology,
        FETechnologies: state.user.FETechnologies,

        // BE Technology
        isBETechnologyLoading: state.user.isLoading.BETechnology,
        BETechnologies: state.user.BETechnologies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Library
        readLibrary: (side, page, pageSize) =>
            dispatch(userActions.readTechnology('thư viện', 'LIBRARY', 'ALL', 'LI', side, page, pageSize)),
        createLibrary: (data) => dispatch(userActions.createTechnology('thư viện', 'LIBRARY', data)),
        updateLibrary: (data, isToastSuccess) =>
            dispatch(userActions.updateTechnology('thư viện', 'LIBRARY', data, isToastSuccess)),
        deleteLibrary: (id, side) => dispatch(userActions.deleteTechnology('thư viện', 'LIBRARY', id, 'LI', side)),

        // Source code
        readSourceCode: (id) => dispatch(userActions.readTechnology('Source Code', 'SOURCECODE', id, 'SC')),
        createSourceCode: (data) => dispatch(userActions.createTechnology('Source Code', 'SOURCECODE', data)),
        updateSourceCode: (data) => dispatch(userActions.updateTechnology('Source Code', 'SOURCECODE', data)),
        deleteSourceCode: (id) => dispatch(userActions.deleteTechnology('Source Code', 'SOURCECODE', id, 'SC')),

        // FE Technology
        readFETechnology: (id) =>
            dispatch(userActions.readTechnology('Công nghệ ở Frontend', 'FRONTEND_TECHNOLOGY', id, 'FT')),
        createFETechnology: (data) =>
            dispatch(userActions.createTechnology('Công nghệ ở Frontend', 'FRONTEND_TECHNOLOGY', data)),
        updateFETechnology: (data) =>
            dispatch(userActions.updateTechnology('Công nghệ ở Frontend', 'FRONTEND_TECHNOLOGY', data)),
        deleteFETechnology: (id) =>
            dispatch(userActions.deleteTechnology('Công nghệ ở Frontend', 'FRONTEND_TECHNOLOGY', id, 'FT')),

        // BE Technology
        readBETechnology: (id) =>
            dispatch(userActions.readTechnology('Công nghệ ở Backend', 'BACKEND_TECHNOLOGY', id, 'BT')),
        createBETechnology: (data) =>
            dispatch(userActions.createTechnology('Công nghệ ở Backend', 'BACKEND_TECHNOLOGY', data)),
        updateBETechnology: (data) =>
            dispatch(userActions.updateTechnology('Công nghệ ở Backend', 'BACKEND_TECHNOLOGY', data)),
        deleteBETechnology: (id) =>
            dispatch(userActions.deleteTechnology('Công nghệ ở Backend', 'BACKEND_TECHNOLOGY', id, 'BT')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
