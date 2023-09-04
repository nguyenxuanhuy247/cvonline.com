import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { MdClose } from 'react-icons/md';

import styles from './SendCVByEmailModal.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import Loading from '~/components/Modal/Loading.js';
import logoWithText from '~/assets/logo/logo-with-text.png';

const cx = classnames.bind(styles);

class SendCVByEmailModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            to: '',
            subject: '',
            companyName: '',
            source: '',
            jobTitle: '',
        };
    }

    handleInputInfo = (e, name) => {
        const value = e.target.value?.trimStart();
        this.setState({ [name]: value });
    };

    handleSendInfoAndCVByEmail = async () => {
        if (!this.state.to) {
            Toast.TOP_CENTER_WARN('Nhập email nhà tuyển dụng', 3000);
        } else if (!this.state.subject) {
            Toast.TOP_CENTER_WARN('Nhập tiêu đề email gửi nhà tuyển dụng', 3000);
        } else if (!this.state.companyName) {
            Toast.TOP_CENTER_WARN('Nhập tên công ty', 3000);
        } else if (!this.state.source) {
            Toast.TOP_CENTER_WARN('Nhập nguồn biết tin tuyển dụng', 3000);
        } else if (!this.state.jobTitle) {
            Toast.TOP_CENTER_WARN('Nhập vị trí ứng tuyển', 3000);
        } else {
            const data = { ...this.state, from: this.props.owner?.email };

            await this.setState({ isLoading: true });
            await this.props.SendCVByEmail(data);
            await this.setState({ isLoading: false });
        }
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
                            <div className={cx('email-header')}>
                                <div className={cx('email-info-group')}>
                                    <label className={cx('label')}>Người nhận</label>
                                    <input
                                        className={cx('input')}
                                        value={this.state.to}
                                        placeholder="Email nhà tuyển dụng"
                                        spellCheck={false}
                                        onInput={(e) => this.handleInputInfo(e, 'to')}
                                    />
                                </div>
                                <div className={cx('email-info-group')}>
                                    <label className={cx('label')}>Tiêu đề</label>
                                    <input
                                        className={cx('input')}
                                        value={this.state.subject}
                                        placeholder="Tiêu đề gửi nhà tuyển dụng"
                                        spellCheck={false}
                                        onInput={(e) => this.handleInputInfo(e, 'subject')}
                                    />
                                </div>
                            </div>

                            <div className={cx('background')}>
                                <img src={logoWithText} alt="cvonline.com" className={cx('logo')} />

                                <div className={cx('cover-letter')}>
                                    <p className={cx('title')}>THƯ ỨNG TUYỂN VỊ TRÍ {this.props.owner.jobPosition}</p>

                                    <div className={cx('candidate-info')}>
                                        <div className={cx('basic-info')}>
                                            <img
                                                src={this.props.owner.avatar}
                                                alt="ac"
                                                className={cx('candidate-image')}
                                            />
                                            <div className={cx('candidate-desc')}>
                                                <span className={cx('candidate-name')}>
                                                    {this.props.owner.fullName}
                                                </span>
                                                <span className={cx('candidate-job')}>
                                                    {this.props.owner.jobPosition}
                                                </span>
                                                <p className={cx('contact-info-title')}>Thông tin liên hệ</p>
                                                <p className={cx('contact-group')}>
                                                    <span className={cx('label')}>Số điện thoại</span>
                                                    <span>:</span>
                                                    <span className={cx('contact')}>
                                                        {this.props.owner.phoneNumber || 'Không có'}
                                                    </span>
                                                </p>
                                                <p className={cx('contact-group')}>
                                                    <span className={cx('label')}>Email</span>
                                                    <span>:</span>
                                                    <span className={cx('contact')}>
                                                        {this.props.owner.email || 'Không có'}
                                                    </span>
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
                                                    placeholder="Điền tên công ty"
                                                    spellCheck={false}
                                                    onInput={(e) => this.handleInputInfo(e, 'companyName')}
                                                />
                                                .
                                            </p>
                                            <p>
                                                Đồng kính gửi : Bộ phận nhân sự, Trưởng phòng Công nghệ, Ban giám đốc
                                                Quý công ty.
                                            </p>
                                            <p>
                                                Hà Nội, ngày {String(new Date().getDate())} tháng{' '}
                                                {String(new Date().getMonth() + 1)} năm{' '}
                                                {String(new Date().getFullYear())}.
                                            </p>
                                        </div>

                                        <div className={cx('letter-body')}>
                                            <p className={cx('paragraph')}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thông qua
                                                <u>
                                                    <input
                                                        value={this.state.source}
                                                        className={cx('input-info', 'letter')}
                                                        placeholder="Điền nguồn tin tuyển dụng"
                                                        spellCheck={false}
                                                        onInput={(e) => this.handleInputInfo(e, 'source')}
                                                    />
                                                </u>
                                                , tôi được biết Quý Công ty đang cần tuyển vị trí
                                                <input
                                                    value={this.state.jobTitle}
                                                    className={cx('input-info', 'letter')}
                                                    placeholder="Điền vị trí ứng tuyển"
                                                    spellCheck={false}
                                                    onInput={(e) => this.handleInputInfo(e, 'jobTitle')}
                                                />
                                                . Sau khi tìm hiểu yêu cầu công việc, tôi nhận thấy mình có đủ năng lực
                                                để đảm nhận vị trí công việc này. Với trình độ của mình, tôi mong muốn
                                                được đóng góp vào sự phát triển của Quý công ty.
                                            </p>

                                            <p className={cx('paragraph')}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi xin gửi Quý Công ty bản CV mô tả chi
                                                tiết kinh nghiệm và những sản phẩm tôi đã làm được. Tôi rất mong công ty
                                                xem xét và đánh giá.
                                            </p>

                                            <div className={cx('button-container')}>
                                                <a
                                                    className={cx('button')}
                                                    href={`${process.env.REACT_APP_FRONTEND_URL}${this.props.owner.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Trang CV của tôi
                                                </a>
                                            </div>

                                            <p className={cx('paragraph')}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang CV
                                                online này là sản phẩm cá nhân của tôi. Tôi rất mong nhận được những
                                                đánh giá khách quan về sản phẩm của mình. Mong Quý công ty giúp tôi chỉ
                                                ra những thiếu xót để tôi có thể hoàn thiện sản phẩm hơn.
                                            </p>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xin trân trọng cảm ơn.</p>

                                            <p className={cx('note')}>
                                                *** Email được gửi bởi{' '}
                                                <a
                                                    className={cx('link')}
                                                    href={`${process.env.REACT_APP_FRONTEND_URL}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    cvonline.com
                                                </a>{' '}
                                                - sản phẩm của Nguyễn Xuân Huy ***
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('modal-footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button
                                disabled={this.state.isLoading}
                                className={cx('btn', 'finish')}
                                onClick={() => this.handleSendInfoAndCVByEmail()}
                            >
                                {!this.state.isLoading ? 'Gửi CV' : <Loading inner auth />}
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
        SendCVByEmail: (data) => dispatch(userActions.SendCVByEmail(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCVByEmailModal);
