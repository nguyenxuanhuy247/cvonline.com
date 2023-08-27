import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './SendCVViaEmailModal.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';

const cx = classnames.bind(styles);

class SendCVViaEmailModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            source: '',
            jobTitle: '',
        };
    }

    handleInputInfo = (e, name) => {
        const value = e.target.value?.trim();
        this.setState({ [name]: value });
    };

    handleSendInfoAndCVViaEmail = () => {
        console.log('aaaaaaaaaaaa', this.state);
    };

    render() {
        const { isOpen, onClose } = this.props;

        return (
            isOpen && (
                <div className={cx('overlay')} onClick={onClose}>
                    <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Mẫu email gửi nhà tuyển dụng</p>
                            <span className={cx('close')} onClick={onClose}>
                                <MdClose />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <div className={cx('cover-letter')}>
                                <p className={cx('title')}>THƯ ỨNG TUYỂN VỊ TRÍ {this.props.owner.jobPosition}</p>

                                <div className={cx('candidate-info')}>
                                    <div className={cx('basic-info')}>
                                        <img src={this.props.owner.avatar} alt="ac" className={cx('candidate-image')} />
                                        <div className={cx('candidate-desc')}>
                                            <span className={cx('candidate-name')}>{this.props.owner.fullName}</span>
                                            <span className={cx('candidate-job')}>{this.props.owner.jobPosition}</span>
                                            <p className={cx('contact-info-title')}>Thông tin liên hệ</p>
                                            <p className={cx('contact-group')}>
                                                <span className={cx('label')}>Số điện thoại</span>
                                                <span>:</span>
                                                <span className={cx('contact')}>{this.props.owner.phoneNumber}</span>
                                            </p>
                                            <p className={cx('contact-group')}>
                                                <span className={cx('label')}>Email</span>
                                                <span>:</span>
                                                <span className={cx('contact')}>{this.props.owner.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('letter')}>
                                    <div className={cx('letter-header')}>
                                        <p className={cx('line')}>
                                            <span>Kính gửi : Trưởng phòng nhân sự</span>
                                            <input
                                                value={this.state.companyName}
                                                className={cx('input-info', 'company-name')}
                                                placeholder="Tên công ty"
                                                spellCheck={false}
                                                onInput={(e) => this.handleInputInfo(e, 'companyName')}
                                            />
                                        </p>
                                        <p>
                                            Đồng kính gửi : Bộ phận nhân sự, Trưởng phòng Công nghệ, Ban giám đốc Quý
                                            công ty
                                        </p>
                                        <p>
                                            Hà Nội, ngày {String(new Date().getDate())} tháng{' '}
                                            {String(new Date().getMonth())} năm {String(new Date().getFullYear())}
                                        </p>
                                    </div>

                                    <div className={cx('letter-body')}>
                                        <p className={cx('paragraph')}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thông qua
                                            <input
                                                value={this.state.source}
                                                className={cx('input-info', 'letter')}
                                                placeholder="Nguồn tin tuyển dụng"
                                                spellCheck={false}
                                                onInput={(e) => this.handleInputInfo(e, 'source')}
                                            />
                                            , tôi được biết Quý Công ty đang cần tuyển vị trí
                                            <input
                                                value={this.state.jobTitle}
                                                className={cx('input-info', 'letter')}
                                                placeholder="Vị trí ứng tuyển"
                                                spellCheck={false}
                                                onInput={(e) => this.handleInputInfo(e, 'jobTitle')}
                                            />
                                            . Sau khi tìm hiểu yêu cầu công việc, tôi nhận thấy mình có đủ năng lực để
                                            đảm nhận vị trí công việc này. Với trình độ của mình, tôi mong muốn được
                                            đóng góp vào sự phát triển của Quý công ty.
                                        </p>

                                        <p className={cx('paragraph')}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi xin gửi Quý Công ty bản CV mô tả chi tiết
                                            kinh nghiệm và những sản phẩm tôi đã làm được. Tôi rất mong công ty xem xét
                                            và đánh giá.{' '}
                                            <strong className={cx('cta')}>(Vui lòng click vào nút bên dưới)</strong>
                                        </p>

                                        <div className={cx('button-container')}>
                                            <a className={cx('button')} href="#!">
                                                Trang CV của tôi
                                            </a>
                                        </div>

                                        <p className={cx('paragraph')}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang CV Online này là sản phẩm cá nhân của
                                            tôi. Tôi rất mong nhận được những đánh giá chân thực và thiếu xót về sản
                                            phẩm này từ của Quý công ty để tôi có thể hoàn thiện sản phẩm hơn.
                                        </p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xin trân trọng cảm ơn.</p>

                                        <p className={cx('note')}>
                                            --- Thư này được gửi bởi cvonline.com là sản phẩm của Nguyễn Xuân Huy ---
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('modal-footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button className={cx('btn', 'finish')} onClick={() => this.handleSendInfoAndCVViaEmail()}>
                                Gửi CV
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCVViaEmailModal);
