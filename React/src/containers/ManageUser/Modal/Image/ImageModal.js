import React, { PureComponent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames/bind';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

import CustomButton from '~/components/Button/Button.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import styles from './ImageModal.module.scss';

const cx = classNames.bind(styles);

class ImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
    }

    handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            let url = URL.createObjectURL(file);
            this.setState({ url: url });
        }
    };

    handleClickFinishButton = () => {
        this.props.onClose();
        this.props.onChange(this.state.url);
    };

    handleDeleteImage = () => {
        this.setState({ url: '' });
    };

    handleOpenCropModal = () => {
        
    };

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.url);
    }

    render() {
        const { isOpen, onClose } = this.props;

        return (
            <div>
                <Modal className={classNames(cx('modal'))} size="lg" isOpen={isOpen} toggle={() => onClose()} centered>
                    <ModalHeader className={classNames(cx('header'))} toggle={() => onClose()}>
                        <div className={classNames(cx('text'))}>Cập nhật ảnh đại diện</div>
                    </ModalHeader>

                    <ModalBody className={classNames(cx('container', 'body'))}>
                        <React.Fragment>
                            <div className={classNames(cx('col-8', 'wrapper'))}>
                                <input id="upload" type="file" hidden onChange={(e) => this.handleChangeImage(e)} />
                                <label htmlFor="upload" className={cx('label')}>
                                    <ImageWithRef
                                        src={this.state.url || JpgImages.placeholder}
                                        className={cx('placeholder')}
                                        alt="placeholder"
                                    />
                                </label>
                            </div>
                            <div className={classNames(cx('col-2', 'actions'))}>
                                <Button
                                    className={classNames(cx('btn', 'crop'))}
                                    onClick={() => this.props.onCrop()}
                                >
                                    Cắt <MdCrop />
                                </Button>
                                <Button
                                    color="danger"
                                    className={classNames(cx('btn'))}
                                    onClick={() => this.handleDeleteImage()}
                                >
                                    Xóa <AiTwotoneDelete />
                                </Button>
                            </div>
                        </React.Fragment>
                    </ModalBody>

                    <ModalFooter className={classNames(cx('footer'))}>
                        <CustomButton className={classNames(cx('btn'))} onClick={() => onClose()}>
                            Đóng lại
                        </CustomButton>
                        <CustomButton
                            className={classNames(cx('btn', 'finish'))}
                            onClick={() => this.handleClickFinishButton()}
                        >
                            Hoàn tất
                        </CustomButton>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ImageModal;
