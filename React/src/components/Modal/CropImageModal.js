import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './CropImageModal.module.scss';
import StyledCrop from '~/components/Image/CropImage/index.js';
import { AiFillCloseSquare } from 'react-icons/ai';

const cx = classnames.bind(styles);

class CropImageModal extends PureComponent {
    render() {
        const { onClose, onGetUrl, src } = this.props;
        return (
            <div className={cx('overlay')} onClick={() => onClose()}>
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-dialog')}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Chỉnh sửa hình ảnh</p>
                            <span className={cx('close')} onClick={() => onClose()}>
                                <AiFillCloseSquare />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <StyledCrop />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CropImageModal;
