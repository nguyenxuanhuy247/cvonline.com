import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from './CropImageModal.module.scss';
import StyledCrop from '~/components/Image/CropImage/index.js';

const cx = classNames.bind(styles);

class CropImageModal extends PureComponent {
    render() {
        const { isOpen, onClose, onGetUrl, src } = this.props;
        return (
            <div>
                <Modal className={classNames(cx('modal'))} size="lg" isOpen={isOpen} toggle={() => onClose()} centered>
                    <ModalHeader className={classNames(cx('header'))} toggle={() => onClose()}>
                        Chỉnh sửa hình ảnh
                    </ModalHeader>

                    <ModalBody className={classNames(cx('crop-wrapper'))}>
                        <StyledCrop onClose={onClose} onGetUrl={onGetUrl} src={src} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CropImageModal;
