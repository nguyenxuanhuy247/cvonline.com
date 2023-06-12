import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './LibraryList.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import * as userActions from '~/store/actions';
import PaginationBar from '~/components/Pagination/PaginationBar.js';
import Library from '~/layouts/PersonalLayout/Components/Library.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import Loading from '~/components/Modal/Loading.js';

const cx = className.bind(styles);

class LibraryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFE: true,
            isAddLibrary: false,
            isEditLibrary: false,
            isModalOpen: false,
            uploadImageUrl: '',
            selectedPage: 1,
            lastPage: 1,

            image: '',
            name: '',
            version: '',
            link: '',
        };

        this.errorCode = React.createRef();
    }

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
                this.setState({ isFE: isFE, selectedPage: 1 }, () => this.props.readLibrary(this.side(), 1, 10));
                btn.classList.remove(cx('active'));
                e.target.classList.add(cx('active'));
            }
        }
    };

    handleInputLibrary = (e, name) => {
        const value = e.target.value?.trim();
        this.setState({ [name]: value });
    };

    handleShowAddLibrary = () => {
        this.setState({ isAddLibrary: true });
    };

    handleCloseAddLibrary = () => {
        this.setState({ isAddLibrary: false, uploadImageUrl: '' });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ uploadImageUrl: url });
    };

    onClose = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    handleCreateLibrary = async () => {
        const { image, name, version, link } = this.state;
        const side = this.side();
        const data = { type: 'LIBRARY', key: 'LI', side, image, name, version, link };
        await this.props.createLibrary(data);

        if (this.errorCode.current === 0) {
            await this.props.readLibrary(this.side(), this.state.lastPage, 10);
            await this.props.readLibrary(this.side(), this.state.lastPage, 10);
            this.setState({
                isAddLibrary: false,
                selectedPage: this.props.totalPages,
                image: '',
                name: '',
                version: '',
                link: '',
            });
            this.errorCode.current = null;
        }
    };

    handleUpdateLibrary = async (state) => {
        const { updateLibrary, readLibrary } = this.props;

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
        await updateLibrary(data);

        if (this.errorCode.current === 0) {
            await readLibrary(this.side(), this.state.selectedPage, 10);
            this.errorCode.current = null;
        }
    };

    handleDeleteLibrary = async (id) => {
        await this.props.deleteLibrary(id, this.side());

        if (this.errorCode.current === 0) {
            await this.props.readLibrary(this.side(), this.state.selectedPage, 10);
            this.errorCode.current = null;
        }
    };

    handleChangepage = (event, value) => {
        this.setState({ selectedPage: value });
        this.props.readLibrary(this.side(), value, 10);
    };

    componentDidMount() {
        this.props.readLibrary(this.side(), this.state.selectedPage, 10);
    }

    componentDidUpdate(prevProps) {
        const { totalPages, updateErrorCode, createErrorCode, deleteErrorCode } = this.props;

        if (prevProps.createErrorCode !== createErrorCode) {
            this.errorCode.current = createErrorCode;
        }

        if (prevProps.updateErrorCode !== updateErrorCode) {
            this.errorCode.current = updateErrorCode;
        }

        if (prevProps.deleteErrorCode !== deleteErrorCode) {
            this.errorCode.current = deleteErrorCode;
        }

        if (prevProps.totalPages !== totalPages) {
            this.setState({
                lastPage: totalPages,
            });
        }

        // If delete the last library of last page, will move to the previous page
        if (prevProps.totalPages !== totalPages) {
            if (totalPages < this.state.selectedPage) {
                this.setState({ selectedPage: totalPages });
                this.props.readLibrary(this.side(), totalPages, 10);
            }
        }

        // If page's quantity is more than 1, libray list's height of page 2, 3, 4,... will be equal to page 1
        const library = document.querySelector('[id*=js-hover-button]');
        const libraryList = document.querySelector(`.${cx('library-list')}`);

        if (library && libraryList) {
            if (totalPages > 1) {
                const height = library.offsetHeight * 10;
                libraryList.style.minHeight = `${height}px`;
            } else {
                libraryList.style.minHeight = `initial`;
            }
        }
    }

    render() {
        const { libraryList, isCreateLibraryLoading, isReadLibraryLoading, isUpdateLibraryLoading, totalPages } =
            this.props;

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
                    {libraryListArray &&
                        libraryListArray.map((library) => {
                            return (
                                <div key={library.id}>
                                    <Library
                                        libraryList={libraryList}
                                        id={library.id}
                                        src={library.image}
                                        name={library.name}
                                        version={library.version}
                                        href={library.link}
                                        onAdd={this.handleShowAddLibrary}
                                        onUpdate={this.handleUpdateLibrary}
                                        onDelete={() => this.handleDeleteLibrary(library.id)}
                                        isLoading={isUpdateLibraryLoading}
                                        updateErrorCode={this.errorCode.current}
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
                    <div className={cx('add-library')}>
                        <div className={cx('info')}>
                            <p className={cx('heading')}>Thêm thư viện mới</p>
                            <div className={cx('image-wrapper')}>
                                <HeadlessTippy
                                    zIndex="10"
                                    placement="bottom"
                                    interactive
                                    delay={[0, 300]}
                                    offset={[0, -50]}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <div
                                                className={cx('tooltip')}
                                                onClick={() => this.setState({ isModalOpen: true })}
                                            >
                                                Thêm ảnh
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Image src={this.state.uploadImageUrl} className={cx('image')} round />
                                </HeadlessTippy>
                                {this.state.isModalOpen && (
                                    <ChangeImageModal
                                        round={true}
                                        onClose={this.onClose}
                                        onGetUrl={this.getImageUrlFromChangeImageModal}
                                    />
                                )}
                            </div>
                            <input
                                type="text"
                                className={cx('input-form')}
                                placeholder="Nhập tên thư viện"
                                value={this.state.libraryName}
                                onChange={(e) => this.handleInputLibrary(e, 'name')}
                            />
                            <input
                                type="text"
                                className={cx('input-form')}
                                placeholder="Nhập version"
                                value={this.state.libraryVersion}
                                onChange={(e) => this.handleInputLibrary(e, 'version')}
                            />
                            <input
                                type="text"
                                className={cx('input-form')}
                                placeholder="Nhập link website (nếu có)"
                                value={this.state.libraryLink}
                                onChange={(e) => this.handleInputLibrary(e, 'link')}
                            />
                        </div>
                        <div className={cx('actions')}>
                            <Button className={cx('btn', 'cancel')} onClick={() => this.handleCloseAddLibrary()}>
                                Hủy
                            </Button>
                            <Button
                                className={cx('btn', 'add')}
                                disabled={!this.state.name}
                                onClick={() => this.handleCreateLibrary()}
                            >
                                Thêm
                            </Button>
                        </div>

                        {isCreateLibraryLoading && <Loading styles={{ position: 'absolute' }} />}
                    </div>
                )}

                <Box
                    sx={{
                        margin: '24px 0 12px',
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
                        onChange={this.handleChangepage}
                    />
                </Box>
                {isReadLibraryLoading && <Loading styles={{ position: 'absolute' }} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createErrorCode: state.user.errorCode.createLibrary,
        updateErrorCode: state.user.errorCode.updateLibrary,
        deleteErrorCode: state.user.errorCode.deleteLibrary,
        totalPages: state.user.readLibrary.totalPages,
        libraryList: state.user.readLibrary.libraries,
        isCreateLibraryLoading: state.user.isLoading.createLibrary,
        isReadLibraryLoading: state.user.isLoading.readLibrary,
        isUpdateLibraryLoading: state.user.isLoading.updateLibrary,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readLibrary: (side, page, pageSize) =>
            dispatch(userActions.readTechnology('thư viện', 'LIBRARY', 'ALL', 'LI', side, page, pageSize)),
        createLibrary: (data) => dispatch(userActions.createTechnology('thư viện', 'LIBRARY', data)),
        updateLibrary: (data) => dispatch(userActions.updateTechnology('thư viện', 'LIBRARY', data)),
        deleteLibrary: (id, side) => dispatch(userActions.deleteTechnology('thư viện', 'LIBRARY', id, 'LI', side)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
