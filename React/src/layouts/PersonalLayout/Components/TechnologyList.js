import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import DefaultTippy from '@tippyjs/react';

import styles from './TechnologyList.module.scss';
import '~/components/GlobalStyles/Pagination.scss';
import Button from '~/components/Button/Button.js';
import Technology from '~/layouts/PersonalLayout/Components/Technology.js';
import Loading from '~/components/Modal/Loading.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = className.bind(styles);

class TechnologyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            uploadImageUrl: '',

            dragItemId: undefined,
            dragOverItemId: undefined,
        };

        this.technologyRef = React.createRef();
    }

    // Drag and drop API
    handleDragStart = (id) => {
        this.setState({ dragItemId: id });
    };

    handleDragEnd = () => {
        // Remove all effect and hide edit button
        const dragButton = document.getElementById(`js-button-${this.props.type}-${this.state.dragItemId}`);
        const dragOverButton = document.getElementById(`js-button-${this.props.type}-${this.state.dragOverItemId}`);
        const dragEditButton = document.getElementById(`js-edit-button-${this.props.type}-${this.state.dragItemId}`);
        const dragOverEditButton = document.getElementById(
            `js-edit-button-${this.props.type}-${this.state.dragOverItemId}`,
        );

        if (dragButton && dragOverButton && dragEditButton && dragOverEditButton) {
            dragButton.classList.remove(cx('hover-drag-sort'));
            dragOverButton.classList.remove(cx('hover-drag-sort'));

            Array.from(dragEditButton?.children).forEach((item) => {
                if (item.getAttribute('drag') === 'true') {
                    item.style.display = 'inline-flex';
                }
            });

            dragEditButton.style.visibility = 'hidden';
            dragOverEditButton.style.visibility = 'hidden';
        }
    };

    handleDragEnter = (id) => {
        this.setState({ dragOverItemId: id });

        const allButtons = document.querySelectorAll(`[id*=js-button-${this.props.type}]`);
        const button = document.getElementById(`js-button-${this.props.type}-${id}`);

        if (allButtons) {
            allButtons.forEach((button) => {
                button.classList.remove(cx('hover-drag-sort'));
            });

            if (button) {
                button.classList.add(cx('hover-drag-sort'));
            }
        }
    };

    handleSort = async () => {
        if (this.props.type === 'LIBRARY') {
            if (this.props.dataforsort.sortBy) {
                toast.error(
                    `Danh sách đang được sắp xếp từ ${
                        this.props.dataforsort.sortBy === 'desc' ? 'Z đến A' : 'A đến Z'
                    }`,
                );
                return;
            }
        }

        // Exchange info between 2 buttons
        const dragItemData = this.props?.technologylist?.find((technology) => technology.id === this.state.dragItemId);
        const dragOverItemData = this.props?.technologylist?.find(
            (technology) => technology.id === this.state.dragOverItemId,
        );

        if (dragItemData && dragOverItemData) {
            let dragImageBase64;
            let dragOverImageBase64;

            if (dragItemData.image) {
                dragImageBase64 = Buffer.from(dragItemData.image, 'base64').toString('binary');
            }

            if (dragOverItemData.image) {
                dragOverImageBase64 = Buffer.from(dragOverItemData.image, 'base64').toString('binary');
            }

            const dragItemChangeData = {
                type: this.props?.type,
                key: this.props?.keyprop,
                id: dragItemData?.id,
                image: dragOverImageBase64,
                name: dragOverItemData?.name,
                version: dragOverItemData?.version,
                link: dragOverItemData?.link,
            };

            const dragOverItemChangeData = {
                type: this.props?.type,
                key: this.props?.keyprop,
                id: dragOverItemData?.id,
                image: dragImageBase64,
                name: dragItemData?.name,
                version: dragItemData?.version,
                link: dragItemData?.link,
            };

            if (this.props.type === 'LIBRARY') {
                const errorCode = await this.props.sortupdatetechnology(dragItemChangeData);

                if (errorCode === 0) {
                    const errorCode = await this.props.sortupdatetechnology(dragOverItemChangeData);

                    if (errorCode === 0) {
                        const { isPagination, side, selectedPage, itemsPerPage } = this.props.dataforsort;

                        if (this.props.issearch) {
                            await this.props.readtechnology(side);
                        } else {
                            if (isPagination) {
                                await this.props.readtechnology(side, selectedPage, itemsPerPage);
                            } else {
                                await this.props.readtechnology(side);
                            }
                        }
                    }

                    await this.setState({
                        dragItemId: undefined,
                        dragOverItemId: undefined,
                    });
                }
            } else {
                const errorCode = await this.props.updatetechnology(dragItemChangeData);

                if (errorCode === 0) {
                    const errorCode = await this.props.updatetechnology(dragOverItemChangeData);

                    if (errorCode === 0) {
                        await this.props.readtechnology();
                    }

                    await this.setState({
                        dragItemId: undefined,
                        dragOverItemId: undefined,
                    });
                }
            }
        }

        if (this.props.type === 'LIBRARY') {
            this.props.searchLibrary();
        }
    };

    // Show / Hide Create Technology container
    handleShowCreateTechnology = async () => {
        const closeEditTechnology = this.technologyRef.current?.handleCloseEditTechnology;
        closeEditTechnology?.();

        await this.setState({ isCreateTechnology: true });
        const autofocusInputElement = document.getElementById(`js-autofocus-input-${this.props.type}`);
        autofocusInputElement.focus();
    };

    handleCloseCreateTechnology = () => {
        this.setState({ isCreateTechnology: false, uploadImageUrl: '' });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ uploadImageUrl: url });
    };

    // CRUD Technology
    handleCreateTechnology = async (state) => {
        const data = {
            type: this.props?.type,
            key: this.props?.keyprop,
            image: state.image,
            name: state.name?.trim(),
            version: state.version?.trim(),
            link: state.link,
        };

        const { errorCode } = await this.props.createtechnology(data);

        if (errorCode === 0) {
            await this.setState({
                isCreateTechnology: false,
                image: '',
                name: '',
                version: '',
                link: '',
            });

            if (this.props.type !== 'LIBRARY') {
                await this.props.readtechnology();
            }
        }
    };

    handleUpdateTechnology = async (state, closeFn) => {
        const data = {
            type: this.props?.type,
            key: this.props?.keyprop,
            id: state.id,
            image: state.image,
            name: state.name?.trim(),
            version: state.version?.trim(),
            link: state.link,
        };

        const errorCode = await this.props.updatetechnology(data, true);

        if (errorCode === 0) {
            await closeFn();

            if (this.props.type !== 'LIBRARY') {
                await this.props.readtechnology();
            }
        }
    };

    handleDeleteTechnology = async (id) => {
        const { errorCode } = await this.props.deletetechnology(id);

        if (errorCode === 0) {
            if (this.props.type !== 'LIBRARY') {
                await this.props.readtechnology();
            }
        }
    };

    render() {
        const { id, draggable, type, keyprop, side, productId, label, technologylist, isloading = false } = this.props;

        let technologyListArray;
        if (Array.isArray(technologylist)) {
            technologyListArray = technologylist;
        } else {
            technologyListArray = [technologylist];
        }

        // console.log('ffffffffffff', this.props.createtechnology);
        return (
            <div className={cx('technology-list')}>
                <div
                    id={id}
                    className={cx('technology-list-inner', {
                        'sourcecode-list': type === 'SOURCECODE',
                        'technology-list': type === 'TECHNOLOGY',
                        'library-list': type === 'LIBRARY',
                    })}
                >
                    {technologylist &&
                        technologyListArray?.map((library) => {
                            return (
                                <Technology
                                    ref={this.technologyRef}
                                    buttonClass={cx('button')}
                                    hoverButtonClass={cx('hover')}
                                    hoverSortButtonClass={cx('hover-drag-sort')}
                                    key={library?.id}
                                    draggable={draggable}
                                    label={label}
                                    librarylist={technologyListArray}
                                    // Technology info
                                    id={library?.id}
                                    type={type}
                                    src={library?.image}
                                    name={library?.name}
                                    version={library?.version}
                                    href={library?.link}
                                    // Event
                                    isloading={isloading}
                                    onshow={this.handleShowCreateTechnology}
                                    onupdate={this.handleUpdateTechnology}
                                    ondelete={() => this.handleDeleteTechnology(library?.id)}
                                    oncloseCreate={this.handleCloseCreateTechnology}
                                    // Drag and drop
                                    ondragstart={() => this.handleDragStart(library?.id)}
                                    ondragend={this.handleDragEnd}
                                    ondragenter={() => this.handleDragEnter(library?.id)}
                                    ondragover={(e) => e.preventDefault()}
                                    ondrop={this.handleSort}
                                />
                            );
                        })}
                </div>

                {!this.props.issearch && !this.state.isCreateTechnology ? (
                    <Button className={cx('add-technology-button')} onClick={() => this.handleShowCreateTechnology()}>
                        <span className={cx('left-icon')}>
                            <BsPlusCircleDotted />
                        </span>
                        <span className={cx('text')}>{`Thêm ${label}`}</span>
                    </Button>
                ) : (
                    !this.props.issearch && (
                        <div style={{ position: 'relative', width: '100%' }}>
                            <CreateEditTechnology
                                className={cx('add-new-technology-form')}
                                label={label}
                                type={type}
                                keyprop={keyprop}
                                side={side}
                                productId={productId}
                                onclose={this.handleCloseCreateTechnology}
                                createtechnology={this.props.createtechnology}
                            />
                            {isloading && <Loading style={{ position: 'absolute' }} />}
                        </div>
                    )
                )}
                {isloading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default TechnologyList;
