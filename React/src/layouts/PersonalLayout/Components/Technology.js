import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';

import * as userActions from '~/store/actions';
import Button from '~/components/Button/Button.js';
import styles from './Technology.module.scss';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);
class Technology extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isLoading: false,

            id: undefined,
            image: undefined,
            name: undefined,
            version: undefined,
            link: undefined,
        };
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

    handleDeleteTechnology = async (technologyId, buttonContainerID) => {
        const { id: userId } = this.props?.userInfo ?? {};

        const buttonContainer = document.getElementById(buttonContainerID);
        if (buttonContainer) {
            const data = {
                technologyId: technologyId,
                type: this.props?.type,
                key: this.props?.keyprop,
                side: this.props?.side,
                userId: userId,
                productId: this.props?.productId,
                label: this.props?.label,
            };

            await this.setState({ isLoading: true });
            buttonContainer.classList.add(cx('hover-button'));

            await this.props.deleteTechnology(data, this.props.index);

            await this.setState({ isLoading: false });
            buttonContainer.classList.remove(cx('hover-button'));
        }
    };

    // =================================================================

    componentDidUpdate() {
        if (this.props.isCloseEditTechnology === true) {
            this.setState({ isEdit: false });
        }
    }
    render() {
        const { label, type, productId, keyprop, href, id, side, src, name, version } = this.props;

        const ID = side ? `${side}-${type}-${id}` : `${type}-${id}`;
        const editButtonID = side ? `js-edit-button-${ID}` : `js-edit-button-${ID}`;
        const buttonID = side ? `js-button-${ID}` : `js-button-${ID}`;
        const buttonContainerID = side ? `js-container-button-${ID}` : `js-container-button-${ID}`;

        return !this.state.isEdit ? (
            <div
                id={buttonContainerID}
                className={cx('button-container', {
                    'sourcecode-list': type === 'SOURCECODE',
                    'technology-list': type === 'TECHNOLOGY',
                    'library-list': type === 'LIBRARY',
                })}
            >
                <Button
                    className={cx('technology-button', 'move-button', {
                        'sourcecode-list': type === 'SOURCECODE',
                    })}
                >
                    <RxDragHandleDots2 />
                </Button>

                <Button
                    href={href}
                    id={buttonID}
                    className={cx(
                        'button',
                        {
                            'sourcecode-list': type === 'SOURCECODE',
                            'technology-list': type === 'TECHNOLOGY',
                            'library-list': type === 'LIBRARY',
                        },
                        { 'no-link-cursor': !href },
                    )}
                >
                    {type !== 'LIBRARY' ? (
                        src && <Image src={src || JpgImages.imagePlaceholder} className={cx('image')} />
                    ) : (
                        <Image src={src || JpgImages.imagePlaceholder} className={cx('image')} />
                    )}

                    <div className={cx('name-link')}>
                        {name && (
                            <span className={cx('name')} id={`js-name-button-${type}-${id}`}>
                                {name}
                            </span>
                        )}
                        <HeadlessTippy
                            placement="bottom"
                            offset={[0, 4]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    {href && <div className={cx('library-href')}>{href}</div>}
                                </div>
                            )}
                        >
                            {href && (
                                <span className={cx('link')}>
                                    <BsLink45Deg />
                                </span>
                            )}
                        </HeadlessTippy>
                    </div>

                    {version && <span className={cx('version')}>{version}</span>}
                </Button>
                <Button
                    className={cx('technology-button', 'edit-button')}
                    onClick={() => this.handleShowEditTechnology(id, editButtonID)}
                >
                    <FaEdit />
                </Button>
                <Button
                    className={cx('technology-button', 'delete-button')}
                    onClick={() => this.handleDeleteTechnology(id, buttonContainerID)}
                >
                    <MdDelete />
                    {this.state.isLoading && <Loading inner small />}
                </Button>
            </div>
        ) : (
            <CreateEditTechnology
                id={`js-edit-technology-${id}`}
                index={this.props.index}
                isedit
                data={this.state}
                type={type}
                label={label}
                side={side}
                keyprop={keyprop}
                productId={productId}
                onCloseCreateTechnology={this.handleCloseEditTechnology}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTechnology: (technologyData, index) => dispatch(userActions.deleteTechnology(technologyData, index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
