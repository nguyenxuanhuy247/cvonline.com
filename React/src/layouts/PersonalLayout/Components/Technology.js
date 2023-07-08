import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import styles from './Technology.module.scss';
import Image from '~/components/Image/Image.js';
import EditButton from '~/components/Button/EditButton';
import { JpgImages } from '~/components/Image/Images.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = classnames.bind(styles);
class Technology extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,

            id: undefined,
            image: undefined,
            name: undefined,
            version: undefined,
            link: undefined,
        };

        this.idTimeout = React.createRef();
    }

    // =================================================================
    handleShowEditTechnology = async (id) => {
        this.props.onCloseCreateTechnology();

        let selectedLibrary;
        const libraryList = this.props.librarylist;
        if (libraryList) {
            selectedLibrary = libraryList.find((library) => {
                return library.id === id;
            });
        }

        await this.setState({
            isEdit: true,
            id: selectedLibrary.id,
            image: selectedLibrary.image,
            name: selectedLibrary.name,
            version: selectedLibrary.version,
            link: selectedLibrary.link,
        });
    };

    handleCloseEditTechnology = () => {
        this.setState({ isEdit: false });
    };

    handleDeleteTechnology = (technologyId) => {
        this.props.onDeleteTechnology(technologyId, this.props.label);
    };

    // =================================================================
    // Hover and Unhover Button and Edit Button
    handleHoverButtonAndShowEditButton = (editButtonID, buttonID) => {
        const editButton = document.getElementById(editButtonID);
        const button = document.getElementById(buttonID);

        if (button) {
            button.classList.add(cx('hover-button'));

            // Show all drag buttons
            if (editButton) {
                editButton.style.opacity = 1;
                editButton.style.visibility = 'visible';
            }
        }
    };

    handleUnhoverButtonAndHideEditButton = (editButtonID, buttonID) => {
        const editButton = document.getElementById(editButtonID);
        const button = document.getElementById(buttonID);

        if (editButton) {
            this.idTimeout.current = setTimeout(() => {
                editButton.style.opacity = 0;
                editButton.style.visibility = 'hidden';
            }, 0);
        }

        if (button) {
            button.classList.remove(cx('hover-button'));
        }
    };

    handleHoverEditButton = (e, buttonID) => {
        // Skip hide Edit button
        clearTimeout(this.idTimeout.current);

        // Still Hover Button
        const button = document.getElementById(buttonID);
        if (button) {
            button.classList.add(cx('hover-button'));
        }
    };

    handleUnhoverEditButton = (editButtonID, buttonID) => {
        const editButton = document.getElementById(editButtonID);
        const button = document.getElementById(buttonID);

        // Unhover Button
        if (button) {
            button.classList.remove(cx('hover-button'));
        }

        if (editButton) {
            editButton.style.opacity = 0;
            editButton.style.visibility = 'hidden';
        }
    };

    // =================================================================

    componentWillUnmount() {
        clearTimeout(this.idTimeout.current);
    }

    render() {
        const {
            draggable,
            label,
            type,
            productId,
            keyprop,
            href,
            id,
            side,
            src,
            name,
            version,
            onDragStart,
            onDragEnd,
            onDragEnter,
            onDragOver,
            onDrop,
        } = this.props;

        const dragDropAPIProps = {
            onDragStart,
            onDragEnd,
            onDragEnter,
            onDragOver,
            onDrop,
        };

        const ID = side ? `${side}-${type}-${id}` : `${type}-${id}`;
        const editButtonID = side ? `js-edit-button-${ID}` : `js-edit-button-${ID}`;
        const buttonID = side ? `js-button-${ID}` : `js-button-${ID}`;

        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="bottom"
                offset={[0, 4]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        {href && <div className={cx('library-href')}>{href}</div>}
                    </div>
                )}
            >
                <div id={`js-container-button-${type}-${id}`} className={cx('button-container')}>
                    <EditButton
                        editButtonID={editButtonID}
                        side={side}
                        type={type}
                        // =================================================================
                        onShowCreateTechnology={this.props?.onShowCreateTechnology}
                        onShowEditTechnology={() => this.handleShowEditTechnology(id)}
                        onDeleteTechnology={() => this.handleDeleteTechnology(id)}
                        // =================================================================
                        onMouseEnter={(e) => this.handleHoverEditButton(e, buttonID)}
                        onMouseLeave={(className) => this.handleUnhoverEditButton(editButtonID, buttonID, className)}
                        classHover={cx('hover-button')}
                        // =================================================================
                        dragDropAPIProps={dragDropAPIProps}
                    />
                    <Button
                        id={buttonID}
                        className={cx('button', {
                            'sourcecode-list': type === 'SOURCECODE',
                            'technology-list': type === 'TECHNOLOGY',
                            'library-list': type === 'LIBRARY',
                        })}
                        // =================================================================
                        onmouseenter={() => this.handleHoverButtonAndShowEditButton(editButtonID, buttonID)}
                        onmouseleave={() => this.handleUnhoverButtonAndHideEditButton(editButtonID, buttonID)}
                        // =================================================================
                        draggable={draggable}
                        href={href}
                        dragDropAPIProps={dragDropAPIProps}
                    >
                        <Image src={src || JpgImages.placeholder} className={cx('image')} />

                        {name && (
                            <span className={cx('name')} id={`js-name-button-${type}-${id}`}>
                                {name}
                            </span>
                        )}
                        {version && <span className={cx('version')}>{version}</span>}
                    </Button>
                </div>
            </HeadlessTippy>
        ) : (
            <CreateEditTechnology
                id={`js-edit-technology-${id}`}
                isedit
                data={this.state}
                type={type}
                label={label}
                keyprop={keyprop}
                productId={productId}
                onCloseCreateTechnology={this.handleCloseEditTechnology}
                onUpdateTechnology={this.props.onUpdateTechnology}
            />
        );
    }
}

export default Technology;
