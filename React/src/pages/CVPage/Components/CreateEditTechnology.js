import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import * as userActions from '~/store/actions';
import styles from './CreateEditTechnology.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import { Toast } from '~/components/Toast/Toast.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);
class CreateEditTechnology extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            id: this.props?.data?.id || undefined,
            image: this.props?.data?.image || '',
            name: this.props?.data?.name || '',
            version: this.props?.data?.version || '',
            link: this.props?.data?.link || '',
        };
        this.redirectID = React.createRef();
    }

    // =================================================================

    handleOpenChangeImageModal = () => {
        this.setState({ isModalOpen: true });
    };

    handleGetImageUrlFromChangeImageModal = (url) => {
        this.setState({ image: url });
        return 0;
    };

    handleCloseChangeImageModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleInputTechnology = (e, name) => {
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleCreateOrUpdateTechnology = async (isUpdate) => {
        const { id: userId } = this.props?.userInfo ?? {};
        const { index: productIndex } = this.props ?? {};

        const data = {
            id: this.state.id,
            type: this.props?.type,
            key: this.props?.keyprop,
            side: this.props?.side,
            image: this.state.image,
            name: this.state.name?.trim(),
            version: this.state.version?.trim(),
            link: this.state.link?.trim(),
            userId: userId,
            productId: this.props?.productId,
            label: this.props?.label,
        };

        if (!isUpdate) {
            // CREATE NEW TECHNOLOGY
            if (this.props?.type === 'SOURCECODE') {
                if (this.state.name && this.state.link) {
                    await this.setState({ isLoading: true });
                    const errorCode = await this.props.createTechnology(data, productIndex);
                    await this.setState({ isLoading: false });

                    if (errorCode === 0) {
                        this.props.onClose();
                    }
                } else if (!this.state.name) {
                    Toast.TOP_CENTER_INFO(`Vui lòng nhập tên của Source code`, 3000);
                } else if (!this.state.link) {
                    Toast.TOP_CENTER_INFO(`Vui lòng nhập link của Source code`, 3000);
                }
            } else {
                if (this.state.name) {
                    await this.setState({ isLoading: true });
                    const errorCode = await this.props.createTechnology(data, productIndex);
                    await this.setState({ isLoading: false });

                    if (errorCode === 0) {
                        this.props.onClose();
                    }
                } else {
                    Toast.TOP_CENTER_INFO(`Vui lòng nhập tên của ${this.props.label}`, 3000);
                }
            }
        } else {
            // UPDATE TECHNOLOGY
            await this.setState({ isLoading: true });
            const errorCode = await this.props?.updateTechnology(data, productIndex);
            await this.setState({ isLoading: false });

            if (errorCode === 0 || errorCode === 32) {
                await this.props.onClose();
            }
        }

        if (this.props?.isSearch) {
            await this.props?.onSearchLibrary();
        }
    };

    componentDidMount() {
        // Press ENTER to change input field or submit
        const container = document.getElementById(this.props.id);

        const inputElementArray = container.getElementsByTagName('input');
        Array.from(inputElementArray)?.forEach((inputElement) => {
            inputElement.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    let nextEl = event.target.nextElementSibling;

                    if (nextEl) {
                        while (nextEl.hidden) {
                            nextEl = nextEl.nextElementSibling;
                        }

                        if (nextEl.nodeName === 'INPUT') {
                            nextEl.focus();
                        }
                    } else {
                        this.handleCreateOrUpdateTechnology(this.props?.isedit);
                    }
                }
            };
        });
    }

    componentWillUnmount = () => {
        clearTimeout(this.redirectID.current);
    };

    render() {
        const { id, isedit, type, label } = this.props;

        return (
            <div
                className={cx('create-edit-technology', {
                    'source-code': type === 'SOURCECODE',
                    'edit-technology': isedit,
                })}
                id={id}
            >
                <div className={cx('info')}>
                    <p className={cx('heading')}>
                        {isedit
                            ? `Chỉnh sửa ${type === 'SOURCECODE' ? '' : label}`
                            : `Thêm ${type === 'SOURCECODE' ? '' : label} mới`}
                    </p>

                    <div className={cx('image-wrapper')}>
                        <Button
                            className={cx('add-edit-image-button')}
                            onClick={() => this.handleOpenChangeImageModal()}
                        >
                            {this.state.image ? `Sửa ảnh` : `Thêm ảnh`}
                        </Button>

                        <Image className={cx('image')} src={this.state.image} round />

                        {this.state.isModalOpen && (
                            <ChangeImageModal
                                round
                                src={this.state.image}
                                onClose={this.handleCloseChangeImageModal}
                                onGetUrl={this.handleGetImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>

                    <input
                        id={`js-autofocus-input-${this.props.type}`}
                        type="text"
                        spellCheck="false"
                        className={cx('input-form')}
                        placeholder={`Nhập tên ${label}`}
                        value={this.state.name}
                        onChange={(e) => this.handleInputTechnology(e, 'name')}
                    />
                    <input
                        hidden={type !== 'LIBRARY'}
                        type="text"
                        spellCheck="false"
                        className={cx('input-form')}
                        placeholder="Nhập version"
                        value={this.state.version}
                        onChange={(e) => this.handleInputTechnology(e, 'version')}
                    />
                    <input
                        type="text"
                        spellCheck="false"
                        className={cx('input-form')}
                        placeholder="Nhập link website"
                        value={this.state.link}
                        onChange={(e) => this.handleInputTechnology(e, 'link')}
                    />
                </div>

                <div className={cx('actions')}>
                    <Button
                        className={cx('btn', 'cancel', { 'source-code-edit-btn': isedit })}
                        onClick={this.props.onClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        className={cx('btn', 'add', { 'source-code-edit-btn': isedit })}
                        onClick={() => this.handleCreateOrUpdateTechnology(isedit)}
                    >{`${isedit ? `Cập nhật` : `Thêm`}`}</Button>
                </div>

                {this.state.isLoading && <Loading inner />}
            </div>
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
        createTechnology: (data, productIndex) => dispatch(userActions.createTechnology(data, productIndex)),
        updateTechnology: (data, productIndex) => dispatch(userActions.updateTechnology(data, productIndex)),
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditTechnology);
