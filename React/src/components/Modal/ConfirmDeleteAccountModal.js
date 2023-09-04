import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { AiFillWarning } from 'react-icons/ai';

import styles from './ConfirmDeleteAccountModal.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';

const cx = classnames.bind(styles);

class ConfirmDeleteAccountModal extends PureComponent {
    render() {
        const { isOpen, onClose, onDelete } = this.props;

        return (
            isOpen && (
                <div className={cx('overlay')} onClick={onClose}>
                    <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Xóa tài khoản</p>
                        </div>

                        <div className={cx('modal-body')}>
                            <p className={cx('confirm')}>
                                <span>Bạn có chắc chắn muốn xóa tài khoản </span>{' '}
                                <span className={cx('account-name')}>{this.props.owner.fullName}</span> ?
                            </p>
                            <div className={cx('warning-container')}>
                                <div className={cx('warning-title')}>
                                    <AiFillWarning className={cx('icon')} />
                                    Cảnh báo
                                </div>
                                <p className={cx('warning-text')}>
                                    Nếu xóa tài khoản này, bạn sẽ không thể truy cập vào trang CV của bạn nữa
                                </p>
                            </div>
                        </div>

                        <div className={cx('modal-footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button className={cx('btn', 'finish')} onClick={onDelete}>
                                Xóa
                            </Button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        SendCVByEmail: (data) => dispatch(userActions.SendCVByEmail(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteAccountModal);
