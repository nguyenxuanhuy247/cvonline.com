import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { AiFillCloseSquare } from 'react-icons/ai';

import styles from './Modal.module.scss';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class ChangeImageModal extends PureComponent {
    render() {
        const { title = 'Nhập tiêu đề của modal', onClose, onFinish, children, isCrop } = this.props;

        return (
            <div className={cx('overlay')} onClick={onClose}>
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-header')}>
                        <p className={cx('title')}>{title}</p>
                        <span className={cx('close')} onClick={onClose}>
                            <AiFillCloseSquare />
                        </span>
                    </div>

                    <div className={cx('modal-body', { 'iscrop': isCrop })}>{children}</div>

                    <div className={cx('modal-footer')}>
                        <Button className={cx('btn', 'cancel')} onClick={onClose}>
                            Hủy
                        </Button>
                        <Button className={cx('btn', 'finish')} onClick={onFinish}>
                            Hoàn tất
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeImageModal;
