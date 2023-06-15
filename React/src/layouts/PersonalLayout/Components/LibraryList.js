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
            uploadImageUrl: '',

            dragItemId: undefined,
            dragOverItemId: undefined,
        };

        this.errorCode = React.createRef();
    }

    handleDragStart = (id) => {
        this.setState({ dragItemId: id });
    };

    handleDragEnter = (id) => {
        this.setState({ dragOverItemId: id });
    };

    handleSort = async () => {
        const dragItemData = this.props?.librarylist.find((library) => library.id === this.state.dragItemId);
        const dragOverItemData = this.props?.librarylist.find((library) => library.id === this.state.dragOverItemId);

        const dragItemChangeData = {
            type: this.props.type,
            key: this.props.keyprop,
            id: dragItemData?.id,
            image: dragOverItemData?.image,
            name: dragOverItemData?.name,
            version: dragOverItemData?.version,
            link: dragOverItemData?.link,
        };

        const dragOverItemChangeData = {
            type: this.props.type,
            key: this.props.keyprop,
            id: dragOverItemData?.id,
            image: dragItemData?.image,
            name: dragItemData?.name,
            version: dragItemData?.version,
            link: dragItemData?.link,
        };

        this.errorCode.current = null;
        await this.props.updatelibrary(dragItemChangeData);

        this.errorCode.current = null;
        await this.props.updatelibrary(dragOverItemChangeData);

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.props.readlibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readlibrary(this.side());
            }
            this.errorCode.current = null;
        }

        await this.setState({
            dragItemId: undefined,
            dragOverItemId: undefined,
        });
    };

    side = () => {
        const side = this.state.isFE ? 'FE' : 'BE';
        return side;
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
        await this.props.createlibrary(data);

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

                await this.props.readlibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
                await this.props.readlibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
            } else {
                await this.props.readlibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleUpdateLibrary = async (state, closeFn) => {
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
        await this.props.updatelibrary(data, true);

        if (this.errorCode.current === 0) {
            await closeFn();

            if (this.state.isPagination) {
                await this.props.readlibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readlibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleDeleteLibrary = async (id) => {
        this.errorCode.current = null;
        await this.props.deletelibrary(id, this.side());

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.props.readlibrary(this.side(), this.state.selectedPage, this.state.itemsPerPage);
            } else {
                await this.props.readlibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errorCode !== this.props.errorcode) {
            this.errorCode.current = this.props.errorcode;
        }

        // Pick button and replace item
        if (prevState.dragOverItemId !== this.state.dragOverItemId) {
            const item = document.getElementById(`js-button-${this.state.dragOverItemId}`);
            const hoverItems = document.querySelectorAll('[id*=js-button]');

            if (item && hoverItems) {
                hoverItems.forEach((item) => (item.parentElement.style.borderColor = 'transparent'));
                item.parentElement.style.borderColor = 'var(--primary-color)';
            }

            if (this.state.dragOverItemId === undefined) {
                const allItem = document.querySelectorAll('[id*=js-button]');
                const allEditItem = document.querySelectorAll('[id*=js-edit-button]');

                allItem.forEach((item) => {
                    item.parentElement.style.borderColor = 'transparent';
                    item.style.backgroundColor = 'transparent';
                });

                allEditItem.forEach((item) => (item.style.visibility = 'hidden'));
            }
        }
    }

    render() {
        const { draggable, technology, technologylist, isloading = false } = this.props;

        let libraryListArray;
        if (Array.isArray(technologylist)) {
            libraryListArray = technologylist;
        } else {
            libraryListArray = [technologylist];
        }

        return (
            <React.Fragment>
                <div className={cx('technology-list', { 'non-library-list': technology !== 'library' })}>
                    {technologylist &&
                        libraryListArray?.map((library) => {
                            return (
                                <div key={library?.id}>
                                    <Library
                                        draggable={draggable}
                                        technology={technology}
                                        librarylist={libraryListArray}
                                        // Technology info
                                        id={library?.id}
                                        src={library?.image}
                                        name={library?.name}
                                        version={library?.version}
                                        href={library?.link}
                                        // Event
                                        isloading={isloading}
                                        errorcode={this.errorCode.current}
                                        onshow={this.handleShowCreateLibrary}
                                        onupdate={this.handleUpdateLibrary}
                                        ondelete={() => this.handleDeleteLibrary(library?.id)}
                                        // Drag and drop
                                        ondragstart={() => this.handleDragStart(library?.id)}
                                        ondragenter={() => this.handleDragEnter(library?.id)}
                                        ondragover={(e) => e.preventDefault()}
                                        ondrop={() => this.handleSort()}
                                    />
                                </div>
                            );
                        })}
                </div>

                {!this.state.isAddLibrary ? (
                    <Button
                        className={cx('add-new-technology-button')}
                        onClick={() => this.setState({ isAddLibrary: true })}
                    >
                        <span className={cx('left-icon')}>
                            <BsPlusCircleDotted />
                        </span>
                        <span className={cx('text')}>Thêm thư viện</span>
                    </Button>
                ) : (
                    <div style={{ position: 'relative', width: '100%' }}>
                        <CreateEditTechnology
                            className={cx('add-new-technology-form', { 'non-library-form': technology !== 'library' })}
                            technology="thư viện"
                            errorcode={this.errorCode.current}
                            onclose={this.handleCloseCreateLibrary}
                            oncreate={this.handleCreateLibrary}
                        />
                        {isloading && <Loading style={{ position: 'absolute' }} />}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default LibraryList;
