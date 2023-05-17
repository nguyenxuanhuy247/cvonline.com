import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames/bind';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
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
            const urlObj = URL.createObjectURL(file);
            this.setState({ url: urlObj });
        }
    };

    handleClickFinishButton = () => {
        this.props.onChange(this.state.url);
        this.props.onClose();
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
        console.log('componentWillUnmount', this.state.url);
    }

    render() {
        const { isOpen, onClose } = this.props;
        console.log('re-render url: ', this.state.url);
        return (
            <div>
                {!this.state.isCropOpen ? (
                    <Modal className={cx('modal')} size="lg" isOpen={isOpen} toggle={() => onClose()} centered>
                        <ModalHeader className={cx('header')} toggle={() => onClose()}>
                            Cập nhật ảnh đại diện
                        </ModalHeader>

                        <ModalBody className={cx('container', 'body')}>
                            <React.Fragment>
                                <div className={cx('col-8', 'wrapper')}>
                                    <input id="upload" type="file" hidden onChange={(e) => this.handleUploadImage(e)} />
                                    <label htmlFor="upload" className={cx('label')}>
                                        <Image
                                            src={this.state.url || JpgImages.placeholder}
                                            className={cx('placeholder')}
                                            alt="placeholder"
                                        />
                                    </label>
                                </div>
                                <div className={cx('col-2', 'actions')}>
                                    <Button
                                        className={cx('btn', 'crop')}
                                        onClick={() => this.handleOpenCropModal()}
                                        disabled={this.state.url ? false : true}
                                    >
                                        <span className={cx('text')}>Cắt</span>
                                        <i className={cx('right-icon')}>
                                            <MdCrop />
                                        </i>
                                    </Button>
                                    <Button className={cx('btn', 'delete')} onClick={() => this.handleDeleteImage()}>
                                        <span className={cx('text')}>Xóa</span>
                                        <i className={cx('right-icon')}>
                                            <AiTwotoneDelete />
                                        </i>
                                    </Button>
                                </div>
                            </React.Fragment>
                        </ModalBody>

                        <ModalFooter className={cx('footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={() => onClose()}>
                                Hủy
                            </Button>
                            <Button className={cx('btn', 'finish')} onClick={() => this.handleClickFinishButton()}>
                                Hoàn tất
                            </Button>
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
