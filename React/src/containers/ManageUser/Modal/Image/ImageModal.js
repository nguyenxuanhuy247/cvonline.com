import React, { PureComponent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames/bind';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

import CustomButton from '~/components/Button/Button.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import styles from './ImageModal.module.scss';
import CropImageModal from '~/containers/ManageUser/Modal/Crop/CropImageModal.js';

const cx = classNames.bind(styles);

class ImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isCropOpen: false,
        };
    }

    handleUploadImage = (e) => {
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
        this.setState({
            isCropOpen: true,
        });
    };

    handleCloseCropModal = () => {
        this.setState({
            isCropOpen: false,
        });
    };

    handleGetCroppedImage = (url) => {
        this.setState({ url: url, isCropOpen: false });
    };

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.url);
    }

    render() {
        const { isOpen, onClose } = this.props;

        return (
            <div>
                {!this.state.isCropOpen ? (
                    <Modal
                        className={classNames(cx('modal'))}
                        size="lg"
                        isOpen={isOpen}
                        toggle={() => onClose()}
                        centered
                    >
                        <ModalHeader className={classNames(cx('header'))} toggle={() => onClose()}>
                            Cập nhật ảnh đại diện
                        </ModalHeader>

                        <ModalBody className={classNames(cx('container', 'body'))}>
                            <React.Fragment>
                                <div className={classNames(cx('col-8', 'wrapper'))}>
                                    <input id="upload" type="file" hidden onChange={(e) => this.handleUploadImage(e)} />
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
                                        size="lg"
                                        className={classNames(cx('btn', 'crop'))}
                                        onClick={() => this.handleOpenCropModal()}
                                        disabled={this.state.url ? false : true}
                                    >
                                        Cắt <MdCrop />
                                    </Button>
                                    <Button
                                        size="lg"
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
                                Hủy
                            </CustomButton>
                            <CustomButton
                                className={classNames(cx('btn', 'finish'))}
                                onClick={() => this.handleClickFinishButton()}
                            >
                                Hoàn tất
                            </CustomButton>
                        </ModalFooter>
                    </Modal>
                ) : (
                    <CropImageModal
                        isOpen={this.state.isCropOpen}
                        src={this.state.url}
                        onClose={this.handleCloseCropModal}
                        onGetUrl={this.handleGetCroppedImage}
                    />
                )}
            </div>
        );
    }
}

export default ImageModal;
