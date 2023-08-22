import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './GetGoogleAppPasswordModal.module.scss';
import Button from '~/components/Button/Button.js';
import { googleAppPasswordGuide } from '~/components/Image/Images.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';

const cx = classnames.bind(styles);

class GetGoogleAppPasswordModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            gmailPassword: '',
        };
    }

    handleInputGmailPassword = (e) => {
        const value = e.target.value.replace(/ /g, '');
        this.setState({ gmailPassword: value });
    };

    handleUpdateGmailPassword = (e) => {
        e.preventDefault();
        const { id: userId } = this.props?.owner ?? {};
        const gmailPassword = this.state.gmailPassword;
        if (userId) {
            if (gmailPassword) {
                const data = { userId: userId, gmailPassword: gmailPassword, label: 'Google App Password' };
                this.props.updateUserInformation(data);
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
                                    Gửi
                                </Button>
                            </form>
                            <span className={cx('close')} onClick={onClose}>
                                <MdClose />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide1} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide2} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide3} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide4} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide5} alt="" />
                            </div>
                            <div className={cx('guide-container')}>
                                <p className={cx('text')}>aaaaaaaaaaaa</p>
                                <img src={googleAppPasswordGuide.guide6} alt="" />
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetGoogleAppPasswordModal);
