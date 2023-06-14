import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';

import styles from './LibraryList.module.scss';
import '~/components/GlobalStyles/Pagination.scss';
import Button from '~/components/Button/Button.js';
import Library from '~/layouts/PersonalLayout/Components/Library.js';
import Loading from '~/components/Modal/Loading.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = className.bind(styles);

class LibraryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFE: true,
            isAddLibrary: false,
            isEditLibrary: false,
            isPagination: true,
            itemsPerPage: 10,
            uploadImageUrl: '',
            selectedPage: 1,

            dragItemId: undefined,
            dragOverItemId: undefined,
        };

        this.errorCode = React.createRef();
        this.lastPage = React.createRef();
        this.libraryState = React.createRef();
    }

    handleDragStart = (id) => {
        this.setState({ dragItemId: id }, () => console.log('Drag item : ', id));
    };

    handleDragEnter = (id) => {
        this.setState({ dragOverItemId: id }, () => console.log('Drag Over item : ', id));
    };

    handleSort = async () => {
        const dragItemData = this.props?.libraryList.find((library) => library.id === this.state.dragItemId);
        const dragOverItemData = this.props?.libraryList.find((library) => library.id === this.state.dragOverItemId);

        const dragItemChangeData = {
            type: this.props.type,
            key: this.props.keyTech,
            id: dragItemData.id,
            image: dragOverItemData.image,
            name: dragOverItemData.name,
            version: dragOverItemData.version,
            link: dragOverItemData.link,
        };

        const dragOverItemChangeData = {
            type: this.props.type,
            key: this.props.keyTech,
            id: dragOverItemData.id,
            image: dragItemData.image,
            name: dragItemData.name,
            version: dragItemData.version,
            link: dragItemData.link,
        };

        this.errorCode.current = null;
        await this.props.updateLibrary(dragItemChangeData);

        this.errorCode.current = null;
        await this.props.updateLibrary(dragOverItemChangeData);

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.props.readLibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    side = () => {
        const side = this.state.isFE ? 'FE' : 'BE';
        return side;
    };

    handleShowLibraryList = (e) => {
        const isActive = e.target.classList.contains(cx('active'));
        const isFE = e.target.id === 'frontend';

        if (!isActive) {
            const btn = document.querySelector(`.${cx('active')}`);
            if (btn) {
                btn.classList.remove(cx('active'));
                e.target.classList.add(cx('active'));

                if (this.state.isPagination) {
                    this.setState({ isFE: isFE, selectedPage: 1 }, () =>
                        this.props.readLibrary(this.side(), 1, this.state.itemsPerPage),
                    );
                } else {
                    this.setState({ isFE: isFE, selectedPage: 1 }, () => this.props.readLibrary(this.side()));
                }
            }
        }
    };

    handleInputLibrary = (e, name) => {
        const value = e.target.value?.trim();
        this.setState({ [name]: value });
    };

    handleShowCreateLibrary = () => {
        this.setState({ isAddLibrary: true });
    };

    handleCloseCreateLibrary = () => {
        this.setState({ isAddLibrary: false, uploadImageUrl: '' });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ uploadImageUrl: url });
    };

    handleCreateLibrary = async (state) => {
        const side = this.side();
        const data = {
            type: 'LIBRARY',
            key: 'LI',
            side,
            image: state.image,
            name: state.name,
            version: state.version,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.createLibrary(data);

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.setState({
                    isAddLibrary: false,
                    selectedPage: this.lastPage.current,
                    image: '',
                    name: '',
                    version: '',
                    link: '',
                });

                await this.props.readLibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
                await this.props.readLibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleUpdateLibrary = async (state) => {
        const side = this.side();
        const data = {
            type: 'LIBRARY',
            key: 'LI',
            side: side,
            id: state.id,
            image: state.image,
            name: state.name,
            version: state.version,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.updateLibrary(data, true);

        if (this.errorCode.current === 0) {
            await this.libraryState.current?.handleCloseEditLibrary();

            if (this.state.isPagination) {
                await this.props.readLibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleDeleteLibrary = async (id) => {
        this.errorCode.current = null;
        await this.props.deleteLibrary(id, this.side());

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.props.readLibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readLibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleChangePage = (event, value) => {
        this.setState({ selectedPage: value });
        this.props.readLibrary(this.side(), value, this.state.itemsPerPage);
    };

    handleShowAllLibraryList = () => {
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');

        showAllButton.classList.add(`${cx('active')}`);
        paginationButton.classList.remove(`${cx('active')}`);

        this.props.readLibrary(this.side());
        this.setState({ isPagination: false });
    };

    hanldeShowPagination = async () => {
        const paginationSelect = document.getElementById('select-pag');
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');

        paginationSelect.onclick = (e) => e.stopPropagation();

        paginationButton.classList.add(`${cx('active')}`);
        showAllButton.classList.remove(`${cx('active')}`);
        await this.setState({ isPagination: true, itemsPerPage: paginationSelect.value });
        await this.props.readLibrary(this.side(), 1, this.state.itemsPerPage);
    };

    handleChangeItemsPerPage = async (e) => {
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');

        paginationButton.classList.add(`${cx('active')}`);
        showAllButton.classList.remove(`${cx('active')}`);

        await this.setState({ isPagination: true, itemsPerPage: e.target.value });
        await this.props.readLibrary(this.side(), 1, this.state.itemsPerPage);
    };

    componentDidMount() {
        this.props.readLibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
    }

    componentDidUpdate(prevProps) {
        const { totalPages, errorCode } = this.props;

        if (prevProps.errorCode !== errorCode) {
            this.errorCode.current = errorCode;
        }

        this.lastPage.current = totalPages;

        // If delete the last library of last page, will move to the previous page
        if (prevProps.totalPages !== totalPages) {
            if (totalPages < this.state.selectedPage) {
                this.setState({ selectedPage: totalPages });
                this.props.readLibrary(this.side(), totalPages, this.state.itemsPerPage);
            }
        }

        // If page's quantity is more than 1, libray list's height of page 2, 3, 4,... will be equal to page 1
        const library = document.querySelector('[id*=js-hover-button]');
        const libraryList = document.querySelector(`.${cx('library-list')}`);

        if (library && libraryList) {
            if (totalPages > 1) {
                const height = library.offsetHeight * this.state.itemsPerPage;
                libraryList.style.minHeight = `${height}px`;
            } else {
                libraryList.style.minHeight = `initial`;
            }
        }
    }

    render() {
        const { draggable, libraryList, isLoading = false, totalPages } = this.props;

        let libraryListArray;
        if (Array.isArray(libraryList)) {
            libraryListArray = libraryList;
        } else {
            libraryListArray = [libraryList];
        }

        return (
            <div className={cx('library-used')}>
                <p className={cx('library-heading')}>Danh sách thư viện sử dụng</p>
                <div className={cx('divide')}>
                    <Button
                        id="frontend"
                        className={cx('text', 'active')}
                        onClick={(e) => this.handleShowLibraryList(e)}
                    >
                        Front-end
                    </Button>
                    <Button id="backend" className={cx('text')} onClick={(e) => this.handleShowLibraryList(e)}>
                        Back-end
                    </Button>
                </div>
                <div className={cx('library-list')}>
                    {libraryList &&
                        libraryListArray?.map((library) => {
                            return (
                                <div key={library.id}>
                                    <Library
                                        draggable={draggable}
                                        libraryList={libraryListArray}
                                        id={library.id}
                                        src={library.image}
                                        name={library.name}
                                        version={library.version}
                                        href={library.link}
                                        onShow={this.handleShowCreateLibrary}
                                        onUpdate={this.handleUpdateLibrary}
                                        onDelete={() => this.handleDeleteLibrary(library.id)}
                                        isLoading={isLoading}
                                        errorCode={this.errorCode.current}
                                        ref={this.libraryState}
                                        // Drag and drop
                                        onDragStart={() => this.handleDragStart(library?.id)}
                                        onDragEnter={() => this.handleDragEnter(library?.id)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => this.handleSort()}
                                    />
                                </div>
                            );
                        })}
                </div>

                {!this.state.isAddLibrary ? (
                    <Button className={cx('add-btn')} onClick={() => this.setState({ isAddLibrary: true })}>
                        <span className={cx('left-icon')}>
                            <BsPlusCircleDotted />
                        </span>
                        <span className={cx('text')}>Thêm thư viện</span>
                    </Button>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <CreateEditTechnology
                            technology="thư viện"
                            errorCode={this.errorCode.current}
                            onClose={this.handleCloseCreateLibrary}
                            onCreate={this.handleCreateLibrary}
                        />
                        {isLoading && <Loading style={{ position: 'absolute' }} />}
                    </div>
                )}

                {this.state.isPagination && (
                    <div
                        style={{
                            margin: '12px 0 12px',
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                        <Pagination
                            count={totalPages}
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
                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                                    backgroundColor: 'var(--button-bgc-green-02)',
                                },

                                '& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
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

                <div className={cx('display')}>
                    <Button className={cx('button')} id="js-show-all" onClick={this.handleShowAllLibraryList}>
                        Hiển thị tất cả
                    </Button>
                    <Button
                        className={cx('button', 'pag-button', 'active')}
                        id="js-pagination"
                        onClick={this.hanldeShowPagination}
                    >
                        <label className={cx('label')}>Phân trang</label>
                        <select
                            className={cx('select')}
                            id="select-pag"
                            onChange={(e) => this.handleChangeItemsPerPage(e)}
                        >
                            <option value="10" defaultValue>
                                10
                            </option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </Button>
                </div>
                {isLoading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default LibraryList;
