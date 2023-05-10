import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from './CropImage.module.scss';
import Crop from '~/components/Image/CropImage/index.js';

const cx = classNames.bind(styles);

class CropImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            croppedImageUrl: '',
        };
    }

    handleTakeCroppedImage = (url) => {
        this.setState({ croppedImageUrl: url });
        this.props.onChange(url)
    };

    render() {
        const { isOpen, onClose } = this.props;
        console.log(this.state.croppedImageUrl);
        return (
            <div>
                <Modal className={classNames(cx('modal'))} size="lg" isOpen={isOpen} toggle={() => onClose()} centered>
                    <ModalHeader className={classNames(cx('header'))} toggle={() => onClose()}>
                        <div className={classNames(cx('text'))}>Cập nhật ảnh đại diện</div>
                    </ModalHeader>

                    <ModalBody className={classNames(cx('crop-wrapper'))}>
                        <Crop onTake={this.handleTakeCroppedImage} src={this.props.src}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CropImage;
