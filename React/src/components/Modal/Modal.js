import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './Modal.module.scss';
import Button from '~/components/Button/Button.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

class ChangeImageModal extends PureComponent {
    render() {
        const { isLoading, title = 'Nhập tiêu đề của modal', round, onClose, onFinish, children } = this.props;
        
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
                        <Button className={cx('btn', 'cancel')} onClick={onClose}>
                            Hủy
                        </Button>
                        <Button className={cx('btn', 'finish')} onClick={onFinish}>
                            {!isLoading ? 'Hoàn tất' : <Loading inner button />}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeImageModal;
