import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import HeadlessTippy from '@tippyjs/react/headless';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import styles from './LibraryList.module.scss';
import { Icons } from '~/components/Image/Images.js';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import * as userActions from '~/store/actions';
import PaginationBar from '~/components/Pagination/PaginationBar.js';
import EditButton from '~/components/Button/EditButton';
import Library from '~/layouts/PersonalLayout/Components/Library.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';

const cx = className.bind(styles);

const FE_LIBRARY_LIST = [
    {
        id: 1,
        image: Icons.Github,
        name: 'React router dom React router dom React router dom',
        version: '6.10.0',
    },
    {
        id: 2,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 3,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 4,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 5,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 6,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 7,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 8,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 9,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 10,
        image: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
];

const BE_LIBRARY_LIST = [
    {
        id: 1,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 2,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 3,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 4,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 5,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 6,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 7,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 8,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 9,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 10,
        image: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
];

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

    changeActiveButton = (e, classNameRemoved, isFE) => {
        const btn = document.querySelector(`.${classNameRemoved}`);
        if (btn) {
            this.setState({ isFE: isFE });
            btn.classList.remove(cx('active'));
            e.currentTarget.classList.add(cx('active'));
        }
    };

    handleShowFELibraryList = (e) => {
        this.changeActiveButton(e, cx('BE-btn'), true);
    };

    handleShowBELibraryList = (e) => {
        this.changeActiveButton(e, cx('FE-btn'), false);
    };

    handleInputLibrary = (e, name) => {
        const value = e.target.value;
        console.log('handleInputLibrary', name, value);
        this.setState({ [name]: value });
    };

    handleAddLibrary = () => {
        this.setState({ isAddLibrary: true });
    };

    handleEditLibrary = () => {
        this.setState({ isEditLibrary: true });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ addedImageUrl: url });
    };

    onClose = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    handleCloseAddLibrary = () => {
        this.setState({ isAddLibrary: false, addedImageUrl: '' });
    };

    handleCreateLibrary = () => {
        const { image, name, version, link } = this.state;
        const FEorBE = this.state.isFE ? 'FE' : 'BE';
        const data = { type: 'LIBRARY', key: 'LI', FEorBE: FEorBE, image, name, version, link };
        console.log(data);
        this.props.createLibrary(data);
    };

    render() {
        const data = this.state.isFE ? FE_LIBRARY_LIST : BE_LIBRARY_LIST;
        return (
            <div className={cx('library-used')}>
                <p className={cx('library-heading')}>Danh sách thư viện sử dụng</p>
                <div className={cx('divide')}>
                    <Button className={cx('text', 'FE-btn', 'active')} onClick={(e) => this.handleShowFELibraryList(e)}>
                        Front-end
                    </Button>
                    <Button className={cx('text', 'BE-btn')} onClick={(e) => this.handleShowBELibraryList(e)}>
                        Back-end
                    </Button>
                </div>
                <div className={cx('library-list')}>
                    {data &&
                        data.map((library) => {
                            return (
                                <div key={library.id}>
                                    {!this.state.isEditLibrary ? (
                                        <HeadlessTippy
                                            placement="top-start"
                                            interactive
                                            offset={[0, 0]}
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <EditButton
                                                        onAdd={this.handleAddLibrary}
                                                        onEdit={this.handleEditLibrary}
                                                    />
                                                </div>
                                            )}
                                        >
                                            <Library
                                                src={library.image}
                                                name={library.name}
                                                version={library.version}
                                                onAdd={this.handleAddLibrary}
                                            />
                                        </HeadlessTippy>
                                    ) : (
                                        <div className={cx('add-library')}>
                                            <div className={cx('info')}>
                                                <div className={cx('img-wrapper')}>
                                                    <Image className={cx('image')} round />
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
                                                <Button
                                                    className={cx('btn', 'cancel')}
                                                    onClick={() => this.setState({ isAddLibrary: false })}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    className={cx('btn', 'add')}
                                                    onClick={() => this.handleCreateLibrary()}
                                                >
                                                    Thêm
                                                </Button>
                                            </div>
                                        </div>
                                    )}
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

                            '& css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                                color: '#fff',
                                backgroundColor: 'var(--button-bgc-green-01)',
                            },
                        }}
                    />
                </Box>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createLibrary: (data) => dispatch(userActions.createLibrary(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
