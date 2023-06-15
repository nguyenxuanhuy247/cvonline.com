import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Pagination from '@mui/material/Pagination';

import styles from './Product.module.scss';
import TechnologyList from '~/layouts/PersonalLayout/Components/TechnologyList.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages, Icons } from '~/components/Image/Images.js';
import LibraryList from './LibraryList.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import * as userActions from '~/store/actions';
import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

const SOURCE_CODE = [
    {
        id: 1,
        src: Icons.Github,
        name: 'Github',
    },
    {
        id: 2,
        src: Icons.Gitlab,
        name: 'Gitlab',
    },
];

const PRO_LANGUAGES = [
    {
        id: 1,
        src: Icons.HTML,
        name: 'HTML',
    },
    {
        id: 2,
        src: Icons.CSS,
        name: 'CSS',
    },
    {
        id: 3,
        src: Icons.HTML,
        name: 'Python',
    },
    {
        id: 4,
        src: Icons.CSS,
        name: 'JavaScript',
    },
];

class Product extends PureComponent {
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

            isModalOpen: false,
            imageUrl: '',
        };

        this.lastPage = React.createRef();
    }

    onClose = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ imageUrl: url });
    };

    FEorBESide = () => {
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
                        this.props.readLibrary(this.FEorBESide(), 1, this.state.itemsPerPage),
                    );
                } else {
                    this.setState({ isFE: isFE, selectedPage: 1 }, () => this.props.readLibrary(this.FEorBESide()));
                }
            }
        }
    };

    handleChangePage = (event, value) => {
        this.setState({ selectedPage: value });
        this.props.readLibrary(this.FEorBESide(), value, this.state.itemsPerPage);
    };

    handleShowAllLibraryList = () => {
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');

        showAllButton.classList.add(`${cx('active')}`);
        paginationButton.classList.remove(`${cx('active')}`);

        this.props.readLibrary(this.FEorBESide());
        this.setState({ isPagination: false });
    };

    hanldeShowPagination = async () => {
        const paginationSelect = document.getElementById('js-select-pag');
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');
        console.log('paginationSelect', paginationSelect);
        console.log('showAllButton', showAllButton);
        console.log('paginationButton', paginationButton);

        paginationSelect.onclick = (e) => e.stopPropagation();

        paginationButton.classList.add(`${cx('active')}`);
        showAllButton.classList.remove(`${cx('active')}`);
        await this.setState({ isPagination: true, itemsPerPage: paginationSelect.value });
        await this.props.readLibrary(this.FEorBESide(), 1, this.state.itemsPerPage);
    };

    handleChangeItemsPerPage = async (e) => {
        const showAllButton = document.getElementById('js-show-all');
        const paginationButton = document.getElementById('js-pagination');

        paginationButton.classList.add(`${cx('active')}`);
        showAllButton.classList.remove(`${cx('active')}`);

        await this.setState({ isPagination: true, itemsPerPage: e.target.value });
        await this.props.readLibrary(this.FEorBESide(), 1, this.state.itemsPerPage);
    };

    componentDidMount() {
        this.props.readLibrary(this.FEorBESide(), this.state.selectedPage, this.state.itemsPerPage);
        this.props.readFramework('ALL', 'FW');
    }

    componentDidUpdate(prevProps, prevState) {
        const { totalpages } = this.props;

        this.lastPage.current = totalpages;

        // If delete the last library of last page, will move to the previous page
        if (prevProps.totalpages !== totalpages) {
            if (totalpages < this.state.selectedPage) {
                this.setState({ selectedPage: totalpages });
                this.props.readlibrary(this.side(), totalpages, this.state.itemsPerPage);
            }
        }

        // If page's quantity is more than 1, libray list's height of page 2, 3, 4,... will be equal to page 1
        const library = document.querySelector('[id*=js-button]');
        const libraryList = document.querySelector(`.${cx('library-list')}`);

        if (library && libraryList) {
            if (totalpages > 1) {
                const height = library.offsetHeight * this.state.itemsPerPage;
                libraryList.style.minHeight = `${height}px`;
            } else {
                libraryList.style.minHeight = `initial`;
            }
        }
    }

    render() {
        return (
            <div className={cx('product')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col pc-12')}>
                        <div className={cx('product-desc')} spellCheck="false">
                            <div className={cx('work-exp')}>
                                <ContentEditableTag className={cx('exp')} placeholder="Tên sản phẩm" />
                            </div>
                            <ContentEditableTag className={cx('desc')} placeholder="Mô tả ngắn gọn về sản phẩm" />
                        </div>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -200]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <div className={cx('tooltip')} onClick={() => this.setState({ isModalOpen: true })}>
                                        Sửa ảnh
                                    </div>
                                </div>
                            )}
                        >
                            <Image
                                src={this.state.imageUrl || JpgImages.avatar}
                                className={cx('image')}
                                alt="Ảnh sản phẩm"
                            />
                        </HeadlessTippy>

                        {this.state.isModalOpen && (
                            <ChangeImageModal
                                round={false}
                                onClose={this.onClose}
                                onGetUrl={this.getImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>
                    <div className={cx('col pc-7')}>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Source code</span>
                            <div className={cx('list')}>
                                <TechnologyList data={SOURCE_CODE} />
                            </div>
                        </div>

                        <div className={cx('section')}>
                            <span className={cx('title')}>Ngôn ngữ lập trình</span>
                            <div className={cx('list')}>
                                <TechnologyList data={PRO_LANGUAGES} />
                            </div>
                        </div>

                        <div className={cx('section')}>
                            <span className={cx('title')}>Frameworks</span>
                            <div className={cx('list')}>
                                <TechnologyList
                                    draggable
                                    technology="framework"
                                    type="FRAMEWORK"
                                    keyprop="FW"
                                    technologylist={this.props.frameworkList}
                                    ondelete={this.props.deleteFramework}
                                    isloading={this.props.isFrameworkLoading}
                                    errorcode={this.props.errorCode}
                                    readtechnology={() => this.props.readFramework('ALL', 'FW')}
                                    createtechnology={this.props.createFramework}
                                    updatetechnology={this.props.updateFramework}
                                />

                                <LibraryList
                                    draggable
                                    technology="framework"
                                    type="FRAMEWORK"
                                    keyprop="FW"
                                    technologylist={this.props.frameworkList}
                                    isloading={this.props.isFrameworkLoading}
                                    errorcode={this.props.errorCode}
                                    readtechnology={() => this.props.readFramework('ALL', 'FW')}
                                    createtechnology={this.props.createFramework}
                                    updatetechnology={this.props.updateFramework}
                                    deletetechnology={this.props.deleteFramework}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col pc-5')}>
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
                                <Button
                                    id="backend"
                                    className={cx('text')}
                                    onClick={(e) => this.handleShowLibraryList(e)}
                                >
                                    Back-end
                                </Button>
                            </div>
                            <LibraryList
                                draggable
                                technology="library"
                                type="LIBRARY"
                                keyprop="LI"
                                isloading={this.props.isLibraryLoading}
                                errorcode={this.props.errorCode}
                                technologylist={this.props.libraryList}
                                readlibrary={this.props.readLibrary}
                                createlibrary={this.props.createLibrary}
                                updatelibrary={this.props.updateLibrary}
                                deletelibrary={this.props.deleteLibrary}
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
                                        count={this.props.totalPages}
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
                                <Button
                                    className={cx('button')}
                                    id="js-show-all"
                                    onClick={this.handleShowAllLibraryList}
                                >
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
                                        id="js-select-pag"
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
                            {this.props.isLibraryLoading && <Loading style={{ position: 'absolute' }} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorCode: state.user.errorCode,

        // Library
        isLibraryLoading: state.user.isLoading.library,
        totalPages: state.user.readLibrary.totalPages,
        libraryList: state.user.readLibrary.libraries,

        // Framework
        isFrameworkLoading: state.user.isLoading.framework,
        frameworkList: state.user.readFramework.frameworks,
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

        // Library
        readFramework: (id, key) => dispatch(userActions.readTechnology('framework', 'FRAMEWORK', id, key)),
        createFramework: (data) => dispatch(userActions.createTechnology('framework', 'FRAMEWORK', data)),
        updateFramework: (data) => dispatch(userActions.updateTechnology('framework', 'FRAMEWORK', data)),
        deleteFramework: (id, key) => dispatch(userActions.deleteTechnology('framework', 'FRAMEWORK', id, key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
