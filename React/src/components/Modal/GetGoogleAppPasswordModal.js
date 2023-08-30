import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './GetGoogleAppPasswordModal.module.scss';
import Button from '~/components/Button/Button.js';
import { googleAppPasswordGuide } from '~/components/Image/Images.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

class GetGoogleAppPasswordModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            gmailPassword: '',
        };
    }

    handleInputGmailPassword = (e) => {
        const value = e.target.value.replace(/ /g, '');
        this.setState({ gmailPassword: value });
    };

    handleUpdateGmailPassword = async (e) => {
        e.preventDefault();
        const { id: userId } = this.props?.owner ?? {};
        const gmailPassword = this.state.gmailPassword;

        if (userId) {
            if (gmailPassword) {
                const data = { userId: userId, gmailPassword: gmailPassword, label: 'Google App Password' };
                await this.setState({ isLoading: true });
                const errorCode = await this.props.updateUserInformation(data);
                await this.setState({ isLoading: false });

                if (errorCode === 0) {
                    Toast.TOP_CENTER_SUCCESS('Cập nhật Google App Password thành công', 3000);
                    this.props.onClose();
                }
            }
        } else {
            Toast.TOP_CENTER_ERROR('Không tìm thấy ID người dùng, vui lòng đăng nhập lại', 3000);
        }
    };

    render() {
        const { isOpen, onClose } = this.props;

        return (
            isOpen && (
                <div className={cx('overlay')} onClick={onClose}>
                    <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('modal-header')}>
                            <form className={cx('app-password-form')}>
                                <label className={cx('label')}>Google App Password</label>
                                <input
                                    className={cx('input')}
                                    value={this.state.gmailPassword}
                                    placeholder="Nhập Google App Password"
                                    onInput={(e) => this.handleInputGmailPassword(e)}
                                />
                                <Button
                                    className={cx('send-button')}
                                    onClick={(e) => this.handleUpdateGmailPassword(e)}
                                >
                                    {!this.state.isLoading ? 'Cập nhật' : <Loading inner auth />}
                                </Button>
                            </form>
                            <span className={cx('close')} onClick={onClose}>
                                <MdClose />
                            </span>
                        </div>
                        <div className={cx('warning')}>
                            Nhập mật khẩu Google App Password để cvonline.com có thể gửi email bằng Gmail của bạn đến
                            nhà tuyển dụng, mà vẫn đảm bảo về an toàn và bảo mật
                        </div>

                        <div className={cx('modal-body')}>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>
                                    Bước 1 : Đăng nhập vào trang www.google.com. Sau đó vào phần Account
                                </p>
                                <img className={cx('image')} src={googleAppPasswordGuide.guide1} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>Bước 2 : Vào phần Bảo mật</p>
                                <img className={cx('image')} src={googleAppPasswordGuide.guide2} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>Bước 3 : Vào phần Xác minh 2 bước</p>
                                <img className={cx('image')} src={googleAppPasswordGuide.guide3} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>Bước 4 : Vào phần Mật khẩu ứng dụng</p>
                                <img className={cx('image', 'step-4')} src={googleAppPasswordGuide.guide4} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>Bước 5 : Thiết lập như hình. Sau đó ấn Tạo</p>
                                <img className={cx('image', 'step-5')} src={googleAppPasswordGuide.guide5} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>
                                    Bước 6 : Sao chép chuỗi mật khẩu ứng dụng và dán vào ô bên trên
                                </p>
                                <img className={cx('image', 'step-6')} src={googleAppPasswordGuide.guide6} alt="" />
                            </div>
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
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetGoogleAppPasswordModal);
