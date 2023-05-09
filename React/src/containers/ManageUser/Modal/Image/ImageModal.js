import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '~/components/Button/Button.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';

import classNames from 'classnames/bind';

import styles from './ImageModal.module.scss';

const cx = classNames.bind(styles);

class ImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
    }

    componentWillUnmount() {
        console.log('DOne');
        URL.revokeObjectURL(this.state.url);
    }

    changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            let url = URL.createObjectURL(file);
            this.setState({ url: url });
        }
    };

    render() {
        const { isOpen, closeModal } = this.props;

        return (
            <div>
                <Modal
                    className={classNames(cx('modal', { 'modal-lg': 'width: 1500px' }))}
                    size="lg"
                    isOpen={isOpen}
                    toggle={() => closeModal()}
                    centered
                >
                    <ModalHeader className={classNames(cx('header'))} toggle={() => closeModal()}>
                        Cập nhật ảnh đại diện
                    </ModalHeader>
                    <ModalBody className={classNames(cx('container', 'body'))}>
                        <div className={classNames(cx('col-8', 'img-wrapper'))}>
                            <input id="upload" type="file" onChange={(e) => this.changeImage(e)} hidden />
                            <label htmlFor="upload" className={cx('label')}>
                                <ImageWithRef
                                    src={this.state.url || JpgImages.placeholder}
                                    className={cx('placeholder')}
                                    alt="placeholder"
                                />
                            </label>

                            {/* {this.state.url && <img className={classNames(cx('image'))} src={this.state.url} alt="" />} */}
                        </div>
                    </ModalBody>
                    <ModalFooter className={classNames(cx('footer'))}>
                        <Button className={classNames(cx('btn', 'close'))} onClick={() => closeModal()}>
                            Đóng lại
                        </Button>
                        <Button className={classNames(cx('btn', 'finish'))} onClick={() => closeModal()}>
                            Hoàn tất
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ImageModal;
