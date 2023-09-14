import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BiMove } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';

import CreateEditTechnology from '~/pages/CVPage/Components/CreateEditTechnology.js';

import * as userActions from '~/store/actions';
import styles from './Technology.module.scss';

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

    handleCloseEditTechnology = async () => {
        await this.setState({ isEdit: false });
    };

    handleDeleteTechnology = async (technologyId, SIDE_TYPE_ID) => {
        const { id: userId } = this.props?.userInfo ?? {};
        const { index: productIndex } = this.props ?? {};

        const buttonContainer = document.getElementById(`js-container-button-${SIDE_TYPE_ID}`);
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

            await this.props.deleteTechnology(data, productIndex);

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
        const { label, type, productId, keyprop, href, id, side, src, name, version, isSearch, onSearchLibrary } =
            this.props;
        const { id: userID } = this.props?.userInfo ?? {};
        const { id: ownerID } = this.props?.owner ?? {};

        const isCanEdit = userID === ownerID;

        const SIDE_TYPE_ID = side ? `${side}-${type}-${id}` : `${type}-${id}`;

        return !this.state.isEdit ? (
            <div
                id={`js-container-button-${SIDE_TYPE_ID}`}
                className={cx(
                    'button-and-edit-button-container',
                    { 'can-edit': isCanEdit },
                    {
                        'sourcecode-list': type === 'SOURCECODE',
                    },
                )}
            >
                <div className={cx('button-conntainer')}>
                    <Button
                        href={href}
                        id={`js-button-${SIDE_TYPE_ID}`}
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
                            <HeadlessTippy
                                placement="top"
                                arrow="true"
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        {name && <div className={cx('tooltip-name')}>{name}</div>}
                                    </div>
                                )}
                            >
                                {name && (
                                    <span className={cx('name')} id={`js-name-button-${SIDE_TYPE_ID}`}>
                                        {name}
                                    </span>
                                )}
                            </HeadlessTippy>

                            <HeadlessTippy
                                placement="bottom"
                                offset={[0, 10]}
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
                        <HeadlessTippy
                            placement="top"
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    {version && <div className={cx('tooltip-version')}>{version}</div>}
                                </div>
                            )}
                        >
                            {version && <span className={cx('version')}>{version}</span>}
                        </HeadlessTippy>
                    </Button>
                </div>

                {isCanEdit && (
                    <div
                        className={cx('edit-button-container', {
                            'sourcecode-list': type === 'SOURCECODE',
                        })}
                    >
                        <Button className={cx('technology-button', 'move-button')}>
                            <BiMove />
                        </Button>

                        <Button
                            className={cx('technology-button', 'edit-button')}
                            onClick={() => this.handleShowEditTechnology(id)}
                        >
                            <FaEdit />
                        </Button>
                        <Button
                            className={cx('technology-button', 'delete-button')}
                            onClick={() => this.handleDeleteTechnology(id, SIDE_TYPE_ID)}
                        >
                            <MdDelete />
                            {this.state.isLoading && <Loading inner small />}
                        </Button>
                    </div>
                )}
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
                onClose={() => this.handleCloseEditTechnology()}
                // =================================================================
                isSearch={isSearch}
                onSearchLibrary={onSearchLibrary}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTechnology: (technologyData, productIndex) =>
            dispatch(userActions.deleteTechnology(technologyData, productIndex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
