import { PureComponent } from 'react';
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

// const FE_LIBRARY_LIST = [
//     {
//         id: 1,
//         image: Icons.Github,
//         name: 'React router dom React router dom React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 2,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 3,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 4,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 5,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 6,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 7,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 8,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 9,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 10,
//         image: Icons.Github,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
// ];

// const BE_LIBRARY_LIST = [
//     {
//         id: 1,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 2,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 3,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 4,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 5,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 6,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 7,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 8,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 9,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
//     {
//         id: 10,
//         image: Icons.Gitlab,
//         name: 'React router dom',
//         version: '6.10.0',
//     },
// ];

class LibraryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFE: true,
            isAddLibrary: false,
            isEditLibrary: false,
            isModalOpen: false,
            addedImageUrl: '',

            image: '',
            name: '',
            version: '',
            link: '',
        };
    }

    handleShowLibraryList = (e) => {
        const isActive = e.target.classList.contains(cx('active'));
        const isFE = e.target.id === 'frontend';

        if (!isActive) {
            const btn = document.querySelector(`.${cx('active')}`);
            if (btn) {
                this.setState({ isFE: isFE });
                btn.classList.remove(cx('active'));
                e.target.classList.add(cx('active'));
                this.props.readLibrary(isFE);
            }
        }
    };

    handleInputLibrary = (e, name) => {
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleShowAddLibrary = () => {
        this.setState({ isAddLibrary: true });
    };

    handleCloseAddLibrary = () => {
        this.setState({ isAddLibrary: false, addedImageUrl: '' });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ addedImageUrl: url });
    };

    onClose = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    handleCreateLibrary = async () => {
        const { image, name, version, link } = this.state;
        const side = this.state.isFE ? 'FE' : 'BE';
        const data = { type: 'LIBRARY', key: 'LI', side, image, name, version, link };
        await this.props.createLibrary(data, this.state.isFE);
        await this.props.readLibrary(side);
        this.handleCloseAddLibrary();
    };

    handleUpdateLibrary = (state) => {
        const side = this.state.isFE ? 'FE' : 'BE';
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

        this.props.updateLibrary(data);
    };

    handleDeleteLibrary = (id) => {
        const side = this.state.isFE ? 'FE' : 'BE';
        this.props.deleteLibrary(side, id);
    };

    componentDidMount() {
        this.props.readLibrary(this.state.isFE);
    }

    render() {
        let { libraryList, isAddLibraryLoading, isGetLibraryLoading } = this.props;

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
                        libraryList.map((library) => {
                            return (
                                <div key={library.id}>
                                    <Library
                                        libraryList={libraryList}
                                        id={library.id}
                                        src={library.image}
                                        name={library.name}
                                        version={library.version}
                                        onAdd={this.handleShowAddLibrary}
                                        onUpdate={this.handleUpdateLibrary}
                                        onDelete={() => this.handleDeleteLibrary(library.id)}
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
                                    <Image src={this.state.addedImageUrl} className={cx('image')} round />
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
                            <Button className={cx('btn', 'add')} onClick={() => this.handleCreateLibrary()}>
                                Thêm
                            </Button>
                        </div>

                        {isAddLibraryLoading && <Loading className={cx('spinner')} />}
                    </div>
                )}

                <Box
                    sx={{
                        margin: '24px 0 12px',
                    }}
                >
                    <Pagination
                        count={10}
                        variant="outlined"
                        size="medium"
                        siblingCount={1}
                        boundaryCount={1}
                        defaultPage={1}
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

                            '& .MuiPagination-root.css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover':
                                {
                                    backgroundColor: 'var(--button-bgc-green-01) !important',
                                },
                        }}
                    />
                </Box>
                {isGetLibraryLoading && <Loading className={cx('spinner')} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        libraryList: state.user.libraries,
        isAddLibraryLoading: state.user.isAddLibraryLoading,
        isGetLibraryLoading: state.user.isGetLibraryLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readLibrary: (isFE) => dispatch(userActions.readLibrary(isFE)),
        createLibrary: (data, isFE) => dispatch(userActions.createLibrary(data, isFE)),
        updateLibrary: (data, isFE) => dispatch(userActions.updateLibrary(data, isFE)),
        deleteLibrary: (isFE, id) => dispatch(userActions.deleteLibrary(isFE, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
