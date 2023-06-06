import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './CropImageModal.module.scss';
import StyledCrop from '~/components/Image/CropImage/index.js';
import { AiFillCloseSquare } from 'react-icons/ai';

import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class CropImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCrop: false,
        };
    }

    handleCropImage = (cb) => {
        cb();
    };

    render() {
        const { onClose, onGetUrl, src } = this.props;
        return (
            <div className={cx('overlay')} onClick={onClose}>
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-dialog')}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Chỉnh sửa hình ảnh</p>
                            <span className={cx('close')} onClick={onClose}>
                                <AiFillCloseSquare onCrop={this.handleFinishCropImage} />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <StyledCrop src={src} isCrop={this.state.isCrop} onGetUrl={onGetUrl} />
                        </div>

                        <div className={cx('modal-footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button className={cx('btn', 'finish')} onClick={() => this.setState({ isCrop: true })}>
                                Hoàn tất
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CropImageModal;
