import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { MdClose, MdImageNotSupported } from 'react-icons/md';
import { BsCardImage, BsGithub, BsFillCheckCircleFill } from 'react-icons/bs';
import { BiCut } from 'react-icons/bi';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';
import { FaFileUpload } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './SendCVByEmailModal.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import Loading from '~/components/Modal/Loading.js';
import logoWithText from '~/assets/logo/logo-with-text.png';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import CommonUtils from '~/utils/CommonUtils.js';
import Modal from '~/components/Modal/Modal.js';
import CropImage from '~/components/Modal/CropImage.js';

const cx = classnames.bind(styles);

class SendCVByEmailModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            to: '',
            subject: '',
            companyName: '',
            source: '',
            jobTitle: '',
            productImage: '',
            pdfName: '',
            githubLink: '',

            pdf: null,
            fileName: '',

            isOpenCropImageModal: false,
            isDisplayPdfFile: false,
        };
        this.ref = React.createRef();
    }

    handleInputInfo = (e, name) => {
        const value = e.target.value?.trimStart();
        this.setState({ [name]: value });
    };

    handleCloseModal = () => {
        this.setState({
            to: '',
            subject: '',
            companyName: '',
            source: '',
            jobTitle: '',
            productImage: '',
            pdfName: '',
            githubLink: '',

            pdf: null,
            fileName: '',

            isOpenCropImageModal: false,
            isDisplayPdfFile: false,
        });

        this.props.onClose();
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
            delete data.pdf;
            delete data.isOpenCropImageModal;
            delete data.isDisplayPdfFile;

            const formData = new FormData();

            formData.append('pdf', this.state.pdf);
            formData.append('states', JSON.stringify(data));
            await this.props.SendCVByEmail(formData);
        }
    };

    handleUploadImage = async () => {
        const inputEl = document.getElementById('upload-image');
        const file = await inputEl.files[0];

        if (file) {
            if (file.size / (1024 * 1024) <= 5) {
                const urlBase64 = await CommonUtils.getBase64(file);
                await this.setState({ productImage: urlBase64, isOpenCropImageModal: true });
            } else {
                toast.error(`Kích thước ảnh lớn hơn 5MB. Vui lòng chọn ảnh khác`);
            }
        } else {
            toast.error(`Tải ảnh thất bại`);
        }
    };

    handleUploadCVPdf = async () => {
        const inputEl = document.getElementById('upload-cv-pdf');
        const pdfFile = await inputEl.files[0];

        if (pdfFile) {
            if (pdfFile.size / (1024 * 1024) <= 5) {
                this.setState({ pdfName: pdfFile.name, pdf: pdfFile, isDisplayPdfFile: true, fileName: pdfFile.name });
            } else {
                toast.error(`Kích thước file lớn hơn 5MB. Vui lòng giảm dung lượng`);
            }
        } else {
            toast.error(`Tải CV PDF thất bại`);
        }
    };

    handleDeletePdfFile = () => {
        this.setState({ pdf: null, isDisplayPdfFile: false, fileName: '' });
    };

    handleOpenCropImageModal = () => {
        this.setState({ isOpenCropImageModal: true });
    };

    handleCloseCropImageModal = () => {
        this.setState({ isOpenCropImageModal: false });
    };

    handleFinishDropImage = async () => {
        const image = await this.ref.current.crop();
        await this.setState({ isOpenCropImageModal: false, productImage: image });
    };

    handleDeleteImage = () => {
        this.setState({ productImage: '' });
    };

    isGitHubUrl = (url) => {
        const regex = /^https?:\/\/(www\.)?github\.com\/.*/;
        return regex.test(url);
    };

    render() {
        const { isOpen, onClose } = this.props;

        const isGithub = this.isGitHubUrl(this.state.githubLink);

        return (
            isOpen &&
            (this.props.isSignIn ? (
                !this.state.isOpenCropImageModal ? (
                    <div className={cx('overlay')} onClick={onClose}>
                        <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                            <div className={cx('modal-header')}>
                                <p className={cx('title')}>Email gửi nhà tuyển dụng</p>
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

                                <div className={cx('background')} id="js-background">
                                    <div className={cx('content')}>
                                        <a href="/" target="_blank" rel="noopener">
                                            <img src={logoWithText} alt="cvonline.com" className={cx('logo')} />
                                        </a>

                                        <div className={cx('cover-letter')}>
                                            <p className={cx('title')}>
                                                THƯ ỨNG TUYỂN VỊ TRÍ
                                                <input
                                                    value={this.state.jobTitle?.toUpperCase()}
                                                    className={cx('job-title')}
                                                    placeholder="NHẬP VỊ TRÍ ỨNG TUYỂN"
                                                    spellCheck={false}
                                                    onInput={(e) => this.handleInputInfo(e, 'jobTitle')}
                                                />
                                            </p>

                                            <div className={cx('candidate-info')}>
                                                <div className={cx('basic-info')}>
                                                    <img
                                                        src={this.props.owner.avatar}
                                                        alt="Ảnh đại diện"
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
                                                            placeholder="Nhập tên công ty"
                                                            spellCheck={false}
                                                            onInput={(e) => this.handleInputInfo(e, 'companyName')}
                                                        />
                                                        .
                                                    </p>
                                                    <p>
                                                        Đồng kính gửi : Bộ phận nhân sự, Trưởng phòng Công nghệ, Ban
                                                        giám đốc Quý công ty.
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
                                                        <input
                                                            value={this.state.source}
                                                            className={cx('input-info', 'letter')}
                                                            placeholder="Nhập nguồn tin tuyển dụng"
                                                            spellCheck={false}
                                                            onInput={(e) => this.handleInputInfo(e, 'source')}
                                                        />
                                                        , tôi được biết Quý Công ty đang cần tuyển vị trí
                                                        <input
                                                            defaultValue={this.state.jobTitle
                                                                ?.toLowerCase()
                                                                .split(' ')
                                                                .map(
                                                                    (word) =>
                                                                        word.charAt(0).toUpperCase() + word.slice(1),
                                                                )
                                                                .join(' ')}
                                                            className={cx('input-info', 'letter')}
                                                            placeholder="Ô này không cần nhập"
                                                            spellCheck={false}
                                                            disabled
                                                        />
                                                        . Sau khi tìm hiểu yêu cầu công việc, tôi nhận thấy mình có đủ
                                                        năng lực để đảm nhận vị trí công việc này. Với trình độ của
                                                        mình, tôi mong muốn được đóng góp vào sự phát triển của Quý công
                                                        ty.
                                                    </p>

                                                    <p className={cx('paragraph')}>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi xin gửi Quý Công ty bản CV mô
                                                        tả chi tiết kinh nghiệm và những sản phẩm tôi đã làm được. Tôi
                                                        rất mong công ty xem xét và đánh giá.
                                                    </p>

                                                    <div className={cx('button-container')}>
                                                        <Button
                                                            className={cx('button')}
                                                            href={`${process.env.REACT_APP_FRONTEND_URL}${this.props.owner.id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            SẢN PHẨM
                                                        </Button>
                                                        <Button
                                                            disabled={!isGithub}
                                                            className={cx('button', 'github')}
                                                            href={`${this.state.githubLink || ''}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <BsGithub className={cx('icon')} />
                                                            GITHUB
                                                        </Button>
                                                    </div>

                                                    <div
                                                        className={cx(
                                                            'github-link-container',
                                                            {
                                                                'not-github-link': !isGithub && this.state.githubLink,
                                                            },
                                                            {
                                                                'github-link-valid': isGithub && this.state.githubLink,
                                                            },
                                                        )}
                                                    >
                                                        <label htmlFor="github-link-input" className={cx('label')}>
                                                            Link Github :
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={this.state.githubLink}
                                                            id="github-link-input"
                                                            className={cx('github-link-input')}
                                                            onInput={(e) =>
                                                                this.setState({ githubLink: e.target.value })
                                                            }
                                                            placeholder="Nhập link Github (nếu có)"
                                                        />
                                                        {this.state.githubLink && (
                                                            <span className={cx('icon-wrapper')}>
                                                                {isGithub ? (
                                                                    <BsFillCheckCircleFill
                                                                        className={cx('icon', 'verified')}
                                                                    />
                                                                ) : (
                                                                    <AiFillCloseCircle
                                                                        className={cx('icon', 'error')}
                                                                        onClick={() => {}}
                                                                    />
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className={cx('paragraph', 'hightlight')}>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do sản phẩm được deploy trên những
                                                        nền tảng miễn phí như Firebase (Frontend), Render (Backend),
                                                        Supabase (Database) nên có ảnh hưởng đến tốc độ tải, mong Quý
                                                        công ty thông cảm. Tôi xin đính kèm 1 bản CV pdf và hình ảnh sản
                                                        phẩm để Quý công ty xem xét.
                                                    </p>

                                                    <p className={cx('paragraph')}>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang CV online này là sản phẩm cá
                                                        nhân của tôi. Tôi rất mong nhận được những đánh giá khách quan
                                                        về sản phẩm của mình. Mong Quý công ty giúp tôi chỉ ra những
                                                        thiếu xót để tôi có thể hoàn thiện sản phẩm hơn.
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

                                    <div className={cx('attachment')}>
                                        <div className={cx('cv-pdf-upload')}>
                                            {this.state.isDisplayPdfFile ? (
                                                <div className={cx('display-pdf-file')}>
                                                    <span className={cx('pdf-file-name')}>
                                                        {this.state.fileName || ''}
                                                    </span>
                                                    <AiOutlineClose
                                                        className={cx('delete-file')}
                                                        onClick={() => this.handleDeletePdfFile()}
                                                    />
                                                </div>
                                            ) : (
                                                <span className={cx('no-file-selected')}>Chưa có file PDF nào</span>
                                            )}

                                            <label
                                                className={cx('upload-btn')}
                                                onChange={() => this.handleUploadCVPdf()}
                                                htmlFor="upload-cv-pdf"
                                            >
                                                <FaFileUpload className={cx('icon')} />
                                                Tải CV PDF
                                                <input
                                                    id="upload-cv-pdf"
                                                    name="CVPdf"
                                                    accept=".pdf"
                                                    type="file"
                                                    hidden
                                                    readOnly
                                                />
                                            </label>
                                        </div>

                                        <div className={cx('image-upload')}>
                                            <label
                                                className={cx('btn', 'upload')}
                                                htmlFor="upload-image"
                                                onChange={this.handleUploadImage}
                                            >
                                                <BsCardImage className={cx('icon')} />
                                                Tải ảnh sản phẩm
                                            </label>

                                            <Button
                                                disabled={this.state.productImage ? false : true}
                                                className={cx('btn', 'crop')}
                                                onClick={this.handleOpenCropImageModal}
                                            >
                                                <BiCut className={cx('icon')} />
                                                <span className={cx('text')}>Cắt ảnh</span>
                                            </Button>

                                            <Button
                                                disabled={this.state.productImage ? false : true}
                                                className={cx('btn', 'delete')}
                                                onClick={this.handleDeleteImage}
                                            >
                                                <MdImageNotSupported className={cx('icon')} />
                                                <span className={cx('text')}>Xóa ảnh</span>
                                            </Button>
                                        </div>

                                        <label
                                            className={cx('image-display')}
                                            onChange={this.handleUploadImage}
                                            htmlFor="upload-image"
                                        >
                                            <Image
                                                id="js-product-image-in-cv-email"
                                                src={this.state.productImage || JpgImages.productPlaceholder}
                                                className={cx('image')}
                                                alt="Product Image"
                                            />
                                            <input id="upload-image" type="file" hidden readOnly />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('modal-footer')}>
                                <Button className={cx('cancel-button')} onClick={() => this.handleCloseModal()}>
                                    Hủy
                                </Button>
                                <Button
                                    disabled={this.props.isSendCVByEmailLoading}
                                    className={cx('finish-button')}
                                    onClick={() => this.handleSendInfoAndCVByEmail()}
                                >
                                    {!this.props.isSendCVByEmailLoading ? 'Gửi CV' : <Loading inner auth />}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Modal
                        title="Bạn có muốn cắt ảnh không?"
                        finishButtonText="Cắt ảnh"
                        onClose={this.handleCloseCropImageModal}
                        onFinish={this.handleFinishDropImage}
                    >
                        <CropImage src={this.state.productImage} ref={this.ref} />
                    </Modal>
                )
            ) : (
                <Redirect to="/signin" />
            ))
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
        isSendCVByEmailLoading: state.user.isLoading.sendCVByEmail,
        isCVSent: state.user.isCVSent,
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        SendCVByEmail: (data) => dispatch(userActions.SendCVByEmail(data)),
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCVByEmailModal);
