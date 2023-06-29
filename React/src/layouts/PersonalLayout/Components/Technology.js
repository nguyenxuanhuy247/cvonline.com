import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Buffer } from 'buffer';

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

    handleShowEditTechnology = async (id) => {
        this.props.onCloseCreateTechnology();

        let selectedLibrary;
        const libraryList = this.props.librarylist;
        if (libraryList) {
            selectedLibrary = libraryList.find((library) => {
                return library.id === id;
            });
        }

        let imageBase64;
        if (selectedLibrary.image) {
            imageBase64 = Buffer.from(selectedLibrary.image, 'base64').toString('binary');
        }

        await this.setState({
            isEdit: true,
            id: selectedLibrary.id,
            image: imageBase64,
            name: selectedLibrary.name,
            version: selectedLibrary.version,
            link: selectedLibrary.link,
        });
    };

    handleCloseEditTechnology = () => {
        this.setState({ isEdit: false });
    };

    handleDeleteTechnology = (id, type) => {
        this.props.onDeleteTechnology(id, type);
    };

    // =================================================================
    // Hover and Unhover Button and Edit Button
    handleHoverButtonAndShowEditButton = (id) => {
        const editButton = document.getElementById(`js-edit-button-${id}`);
        const button = document.getElementById(`js-button-${id}`);

        if (button) {
            button.classList.remove(this.props.hoverSortButtonClass);
            button.classList.add(cx('hover-button'));

            if (editButton) {
                editButton.style.visibility = 'visible';
            }
        }
    };

    handleUnhoverButtonAndHideEditButton = (id) => {
        const editButton = document.getElementById(`js-edit-button-${id}`);
        const button = document.getElementById(`js-button-${id}`);

        if (editButton) {
            this.idTimeout.current = setTimeout(() => (editButton.style.visibility = 'hidden'), 0);
        }

        if (button) {
            button.classList.remove(cx('hover-button'));
        }
    };

    handleMouseHoverEditButton = () => {
        // Disable hide Edit button
        clearTimeout(this.idTimeout.current);
    };

    handleMouseUnHoverEditButton = (id) => {
        // Hide Edit button
        const editButton = document.getElementById(`js-edit-button-${id}`);

        if (editButton) {
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
            ondragstart,
            ondragend,
            ondragenter,
            ondragover,
            ondrop,
        } = this.props;

        const buttonProps = {
            draggable,
            href,
            ondragstart,
            ondragend,
            ondragenter,
            ondragover,
            ondrop,
        };

        let imageUrl;
        if (src) {
            imageUrl = Buffer.from(src, 'base64').toString('binary');
        }

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
                <div id={`js-button-container-${type}-${id}`} className={cx('button-container')}>
                    <EditButton
                        editButtonID={side ? `js-edit-button-${side}-${type}-${id}` : `js-edit-button-${type}-${id}`}
                        buttonID={side ? `js-button-${side}-${type}-${id}` : `js-button-${type}-${id}`}
                        side={side}
                        type={type}
                        idTimeout={this.idTimeout.current}
                        // =================================================================
                        onShowCreateTechnology={this.props?.onShowCreateTechnology}
                        onShowEditTechnology={() => this.handleShowEditTechnology(id)}
                        onDeleteTechnology={() => this.handleDeleteTechnology(id, type)}
                        // =================================================================
                        ondragstart={ondragstart}
                        ondragend={this.props.ondragend}
                        ondrop={ondrop}
                        ondragenter={ondragenter}
                        // =================================================================
                        onmouseenter={() => this.handleMouseHoverEditButton()}
                        onmouseleave={() =>
                            this.handleMouseUnHoverEditButton(side ? `${side}-${type}-${id}` : `${type}-${id}`)
                        }
                        classHover={cx('hover-button')}
                    />
                    <Button
                        id={side ? `js-button-${side}-${type}-${id}` : `js-button-${type}-${id}`}
                        className={cx('button', {
                            'sourcecode-list': type === 'SOURCECODE',
                            'technology-list': type === 'TECHNOLOGY',
                            'library-list': type === 'LIBRARY',
                        })}
                        {...buttonProps}
                        onmouseenter={() =>
                            this.handleHoverButtonAndShowEditButton(side ? `${side}-${type}-${id}` : `${type}-${id}`)
                        }
                        onmouseleave={() =>
                            this.handleUnhoverButtonAndHideEditButton(side ? `${side}-${type}-${id}` : `${type}-${id}`)
                        }
                    >
                        <Image src={imageUrl || JpgImages.placeholder} className={cx('image')} />

                        {name && (
                            <span className={cx('name')} id={`js-button-name-${type}-${id}`}>
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
