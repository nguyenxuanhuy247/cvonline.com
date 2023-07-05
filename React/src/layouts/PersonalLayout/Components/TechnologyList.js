import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Toast } from '~/components/Toast/Toast.js';

import styles from './TechnologyList.module.scss';
import '~/components/GlobalStyles/Pagination.scss';
import Button from '~/components/Button/Button.js';
import Technology from '~/layouts/PersonalLayout/Components/Technology.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = className.bind(styles);

class TechnologyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dragItemId: undefined,
            dragElement: null,

            dragOverItemId: undefined,
            dragOverElement: null,
        };

        this.technologyRef = React.createRef();
    }

    // =================================================================
    // DRAG AND DROP
    handleDragStart = (id, buttonID) => {
        const dragButton = document.getElementById(buttonID);

        this.setState({ dragItemId: id, dragElement: dragButton });
    };

    handleDragEnd = () => {
        // After dropping, setting dragElement and dragOverElement turn to orginal state
        this.state.dragElement?.classList.remove(cx('drag-drop-hover'));
        this.state.dragOverElement?.classList.remove(cx('drag-drop-hover'));
    };

    handleDragEnter = (id, buttonID) => {
        const technologyList = document.getElementById(this.props.technologyListID);
        const allButtons = technologyList.querySelectorAll(`[id*=js-button]`);
        const enterButton = document.getElementById(buttonID);

        if (technologyList) {
            // Remove drag-drop-hover class of all buttons before setting
            if (allButtons) {
                allButtons.forEach((button) => {
                    button.classList.remove(cx('drag-drop-hover'));
                });
            }

            // Prevent button in another list from setting drag-drop-hover class when drag
            const dragElement = this.state.dragElement;
            const isContain = technologyList.contains(dragElement);

            if (isContain) {
                if (enterButton) {
                    enterButton.classList.add(cx('drag-drop-hover'));
                }
            }
        }

        this.setState({ dragOverItemId: id, dragOverElement: enterButton });
    };

    handleDropAndSort = async () => {
        // If list is sorted, will not exchange position
        if (this.props.type === 'LIBRARY') {
            if (this.props.isSortBy) {
                Toast.TOP_CENTER_ERROR(
                    `Danh sách đang được sắp xếp từ ${this.props.isSortBy === 'desc' ? 'Z đến A' : 'A đến Z'}`,
                    3000,
                );
                return;
            }
        }

        // Exchange info between 2 buttons
        const dragItemData = this.props?.technologyList?.find((technology) => technology.id === this.state.dragItemId);
        const dragOverItemData = this.props?.technologyList?.find(
            (technology) => technology.id === this.state.dragOverItemId,
        );

        if (dragItemData && dragOverItemData) {
            if (dragItemData.id !== dragOverItemData.id) {
                const dragItem_NewData = {
                    id: dragItemData?.id,
                    image: dragOverItemData.image,
                    name: dragOverItemData?.name,
                    version: dragOverItemData?.version,
                    link: dragOverItemData?.link,
                    label: `vị trí ${this.props.label}`,
                };

                const dragOverItem_NewData = {
                    id: dragOverItemData?.id,
                    image: dragItemData.image,
                    name: dragItemData?.name,
                    version: dragItemData?.version,
                    link: dragItemData?.link,
                    label: `vị trí ${this.props.label}`,
                };

                const errorCode1 = await this.props.onUpdateTechnology(dragItem_NewData);
                if (errorCode1 === 0) {
                    await this.props.onUpdateTechnology(dragOverItem_NewData);
                }

                this.setState({
                    dragItemId: undefined,
                    dragElement: null,
                    dragOverItemId: undefined,
                    dragOverElement: null,
                });
            }
        }
    };

    // =================================================================
    // Show / Hide Create Technology container

    handleShowCreateTechnology = async () => {
        const closeEditTechnology = this.technologyRef.current?.handleCloseEditTechnology;
        closeEditTechnology?.();

        await this.setState({ isCreateTechnology: true });

        const autofocusInputElement = document.getElementById(`js-autofocus-input-${this.props.type}`);
        autofocusInputElement.focus();
    };

    handleCloseCreateTechnology = () => {
        this.setState({ isCreateTechnology: false });
    };

    // =================================================================

    render() {
        const { draggable, type, keyprop, side, productId, label, technologyList } = this.props;

        return (
            <div className={cx('technology-list')}>
                <div
                    id={this.props.technologyListID}
                    className={cx('technology-list-inner', {
                        'sourcecode-list': type === 'SOURCECODE',
                        'technology-list': type === 'TECHNOLOGY',
                        'library-list': type === 'LIBRARY',
                    })}
                >
                    {technologyList?.map((technology) => {
                        const ID = side ? `${side}-${type}-${technology?.id}` : `${type}-${technology?.id}`;
                        const buttonID = side ? `js-button-${ID}` : `js-button-${ID}`;

                        return (
                            <Technology
                                key={technology?.id}
                                // =================================================================
                                ref={this.technologyRef}
                                draggable={draggable}
                                librarylist={technologyList}
                                // Common info
                                side={side}
                                label={label}
                                productId={productId}
                                keyprop={keyprop}
                                // Technology info
                                id={technology?.id}
                                type={type}
                                src={technology?.image}
                                name={technology?.name}
                                version={technology?.version}
                                href={technology?.link}
                                // =================================================================
                                // Show and Hide Create Technology Container
                                onShowCreateTechnology={this.handleShowCreateTechnology}
                                onCloseCreateTechnology={this.handleCloseCreateTechnology}
                                // =================================================================
                                // CRUD
                                onUpdateTechnology={this.props.onUpdateTechnology}
                                onDeleteTechnology={this.props.onDeleteTechnology}
                                // =================================================================
                                // Drag and drop
                                onDragStart={() => this.handleDragStart(technology?.id, buttonID)}
                                onDragEnd={this.handleDragEnd}
                                onDragEnter={() => this.handleDragEnter(technology?.id, buttonID)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={this.handleDropAndSort}
                            />
                        );
                    })}
                </div>
                {!this.props.isSearch && !this.state.isCreateTechnology ? (
                    <Button
                        className={cx('add-technology-button', {
                            'sourcecode-list': type === 'SOURCECODE',
                        })}
                        onClick={() => this.handleShowCreateTechnology()}
                    >
                        <span className={cx('left-icon')}>
                            <BsPlusCircleDotted />
                        </span>
                        <span className={cx('text')}>{`Thêm ${label}`}</span>
                    </Button>
                ) : (
                    !this.props.isSearch && (
                        <CreateEditTechnology
                            id={`${this.props.technologyListID}-create-container`}
                            label={label}
                            type={type}
                            keyprop={keyprop}
                            side={side}
                            productId={productId}
                            onCloseCreateTechnology={this.handleCloseCreateTechnology}
                            onCreateTechnology={this.props.onCreateTechnology}
                        />
                    )
                )}
            </div>
        );
    }
}

export default TechnologyList;
