import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './Modal.module.scss';
import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

class ChangeImageModal extends PureComponent {
    render() {
        const {
            isLoading,
            title = 'Nhập tiêu đề của modal',
            round,
            onClose,
            onFinish,
            children,
            finishButtonText = 'Hoàn tất',
        } = this.props;

        return (
            <div className={cx('overlay')} onClick={onClose}>
                <div className={cx('container', { round: round })} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-header')}>
                        <p className={cx('title')}>{title}</p>
                        <span className={cx('close')} onClick={onClose}>
                            <MdClose />
                        </span>
                    </div>

                    <div className={cx('modal-body')}>{children}</div>

                    <div className={cx('modal-footer')}>
                        <Button className={cx('cancel-button')} onClick={onClose}>
                            Hủy
                        </Button>
                        <Button className={cx('finish-button')} onClick={onFinish}>
                            {!isLoading ? finishButtonText : <Loading inner button />}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeImageModal;
