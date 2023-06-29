import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify';

import styles from './CreateEditTechnology.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';

const cx = classnames.bind(styles);
class CreateEditTechnology extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props?.data?.id || undefined,
            image: this.props?.data?.image || '',
            name: this.props?.data?.name || '',
            version: this.props?.data?.version || '',
            link: this.props?.data?.link || '',
        };
    }

    handleGetImageUrlFromChangeImageModal = async (url) => {
        await this.setState({ image: url });
    };

    handleCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    handleInputTechnology = (e, name) => {
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleCreateOrUpdateTechnology = async (isEdit) => {
        const data = {
            id: this.state.id,
            type: this.props?.type,
            key: this.props?.keyprop,
            side: this.props?.side,
            image: this.state.image,
            name: this.state.name?.trim(),
            version: this.state.version?.trim(),
            link: this.state.link,
            productId: this.props?.productId,
        };

        if (isEdit) {
            const errorCode = await this.props?.onUpdateTechnology(data, this.props.type);
            if (errorCode === 0) {
                this.props.onCloseCreateTechnology();
            }
        } else {
            if (this.props?.type === 'SOURCECODE') {
                if (this.state.name && this.state.link) {
                    const errorCode = await this.props.onCreateTechnology(data, this.props.type);
                    if (errorCode === 0) {
                        this.props.onCloseCreateTechnology();
                    }
                } else {
                    toast.error(`Nhập tên hoặc link để tạo ${this.props.label} mới`);
                }
            } else {
                if (this.state.name) {
                    const errorCode = await this.props.onCreateTechnology(data, this.props?.type);
                    if (errorCode === 0) {
                        this.props.onCloseCreateTechnology();
                    }
                } else {
                    toast.error(`Nhập tên tên để tạo ${this.props.label} mới`);
                }
            }
        }
    };

    render() {
        const { id, isedit, type, label } = this.props;

        return (
            <div className={cx('create-edit-technology', { 'source-code': type === 'SOURCECODE' })} id={id}>
                <div className={cx('info')}>
                    <p className={cx('heading')}>
                        {isedit
                            ? `Chỉnh sửa ${type === 'SOURCECODE' ? '' : label}`
                            : `Thêm ${type === 'SOURCECODE' ? '' : label} mới`}
                    </p>
                    <div className={cx('image-wrapper')}>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -50]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Button
                                        className={cx('add-edit-image-button')}
                                        onClick={() => this.setState({ isModalOpen: true })}
                                    >
                                        {`${isedit ? `Sửa ảnh` : `Thêm ảnh`}`}
                                    </Button>
                                </div>
                            )}
                        >
                            <Image className={cx('image')} src={this.state.image} round />
                        </HeadlessTippy>
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
                        className={cx('input-form')}
                        placeholder={`Nhập tên ${label}`}
                        value={this.state.name}
                        onChange={(e) => this.handleInputTechnology(e, 'name')}
                    />
                    <input
                        hidden={type !== 'LIBRARY'}
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập version"
                        value={this.state.version}
                        onChange={(e) => this.handleInputTechnology(e, 'version')}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập link website"
                        value={this.state.link}
                        onChange={(e) => this.handleInputTechnology(e, 'link')}
                    />
                </div>
                <div className={cx('actions')}>
                    <Button
                        className={cx('btn', 'cancel', { 'source-code-edit-btn': isedit })}
                        onClick={this.props.onCloseCreateTechnology}
                    >
                        Hủy
                    </Button>
                    <Button
                        className={cx('btn', 'add', { 'source-code-edit-btn': isedit })}
                        onClick={() => this.handleCreateOrUpdateTechnology(isedit)}
                    >{`${isedit ? `Cập nhật` : `Thêm`}`}</Button>
                </div>
            </div>
        );
    }
}

export default CreateEditTechnology;
