import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import * as userActions from '~/store/actions';
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
    handleShowEditTechnology = async (id, editButtonID) => {
        const editButton = document.getElementById(editButtonID);

        // Hide Edit Button
        if (editButton) {
            editButton.style.display = 'none';
        }

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
        const data = {
            technologyId: technologyId,
            type: this.props?.type,
            key: this.props?.keyprop,
            side: this.props?.side,
            label: this.props?.label,
        };

        this.props.deleteTechnology(data, this.props.index);
    };

    // =================================================================
    // Hover and Unhover Edit Button

    handleHoverEditButton = (buttonContainerID) => {
        // Skip hide Edit button
        clearTimeout(this.idTimeout.current);

        // Still Hover Button
        const buttonContainer = document.getElementById(buttonContainerID);

        if (buttonContainer) {
            buttonContainer.classList.add(cx('hover-button'));
        }
    };

    handleUnhoverEditButton = (editButtonID, buttonContainerID) => {
        const editButton = document.getElementById(editButtonID);
        const buttonContainer = document.getElementById(buttonContainerID);

        // Unhover Button
        if (buttonContainer) {
            buttonContainer.classList.remove(cx('hover-button'));

            if (editButton) {
                editButton.style.display = 'none';
            }
        }
    };

    handleHoverButtonAndShowEditButton = (editButtonID, buttonContainerID) => {
        const editButton = document.getElementById(editButtonID);
        const buttonContainer = document.getElementById(buttonContainerID);

        if (buttonContainer) {
            buttonContainer.classList.add(cx('hover-button'));

            if (editButton) {
                editButton.style.display = 'flex';
            }
        }
    };

    handleUnhoverButtonAndHideEditButton = (editButtonID, buttonContainerID) => {
        const editButton = document.getElementById(editButtonID);
        const buttonContainer = document.getElementById(buttonContainerID);

        if (buttonContainer) {
            buttonContainer.classList.remove(cx('hover-button'));

            if (editButton) {
                this.idTimeout.current = setTimeout(() => (editButton.style.display = 'none'), 0);
            }
        }
    };

    handleDoubleClickButtonAndOpenLink = (href) => {
        window.open(href, '_blank', 'noopener');
    };

    // =================================================================

    componentDidUpdate() {
        if (this.props.isCloseEditTechnology === true) {
            this.setState({ isEdit: false });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.idTimeout.current);
    }

    render() {
        const { label, type, productId, keyprop, href, id, side, src, name, version } = this.props;

        const ID = side ? `${side}-${type}-${id}` : `${type}-${id}`;
        const editButtonID = side ? `js-edit-button-${ID}` : `js-edit-button-${ID}`;
        const buttonID = side ? `js-button-${ID}` : `js-button-${ID}`;
        const buttonContainerID = side ? `js-container-button-${ID}` : `js-container-button-${ID}`;

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
                <div
                    id={buttonContainerID}
                    className={cx('button-container', {
                        'sourcecode-list': type === 'SOURCECODE',
                        'technology-list': type === 'TECHNOLOGY',
                        'library-list': type === 'LIBRARY',
                    })}
                >
                    <EditButton
                        editButtonID={editButtonID}
                        side={side}
                        type={type}
                        // =================================================================
                        onShowCreateTechnology={this.props?.onShowCreateTechnology}
                        onShowEditTechnology={() => this.handleShowEditTechnology(id, editButtonID)}
                        onDeleteTechnology={() => this.handleDeleteTechnology(id)}
                        // =================================================================
                        onMouseEnter={() => this.handleHoverEditButton(buttonContainerID)}
                        onMouseLeave={() => this.handleUnhoverEditButton(editButtonID, buttonContainerID)}
                    />
                    <Button
                        href={href}
                        id={buttonID}
                        className={cx('button')}
                        // =================================================================
                        onMouseEnter={() => this.handleHoverButtonAndShowEditButton(editButtonID, buttonContainerID)}
                        onMouseLeave={() => this.handleUnhoverButtonAndHideEditButton(editButtonID, buttonContainerID)}
                        onDoubleClick={() => this.handleDoubleClickButtonAndOpenLink(href)}
                    >
                        {type !== 'LIBRARY' ? (
                            src && <Image src={src || JpgImages.imagePlaceholder} className={cx('image')} />
                        ) : (
                            <Image src={src || JpgImages.imagePlaceholder} className={cx('image')} />
                        )}

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
                index={this.props.index}
                isedit
                data={this.state}
                type={type}
                label={label}
                keyprop={keyprop}
                productId={productId}
                onCloseCreateTechnology={this.handleCloseEditTechnology}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTechnology: (technologyData, index) => dispatch(userActions.deleteTechnology(technologyData, index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
