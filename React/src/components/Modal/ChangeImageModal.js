import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { ImUpload3 } from 'react-icons/im';

import styles from './ChangeImageModal.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import CropImageModal from './CropImageModal.js';
import CommonUtils from '~/utils/CommonUtils.js';
import { toast } from 'react-toastify';

const cx = classnames.bind(styles);

class ChangeImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.src || '',
            isOpenCropImageModal: false,
        };
    }

    handleUploadImage = async () => {
        const inputEl = document.getElementById('upload');
        const file = await inputEl.files[0];

        if (file) {
            if (file.size / (1024 * 1024) <= 5) {
                const urlBase64 = await CommonUtils.getBase64(file);
                await this.setState({ imageUrl: urlBase64 });
            } else {
                toast.error(`Kích thước ảnh lớn hơn 5MB. Vui lòng chọn ảnh khác`);
            }
        } else {
            toast.error(`Tải ảnh thất bại`);
        }
    };

    handleDeleteImage = () => {
        this.setState({ imageUrl: '' });
    };

    handleFinishChangeImage = () => {
        const { onGetUrl, onClose } = this.props;

        onGetUrl(this.state.imageUrl);
        onClose();
    };

    handleOpenCropModal = () => {
        this.setState({ isOpenCropImageModal: true });
    };

    handleCloseCropImageModal = () => {
        this.setState({ isOpenCropImageModal: false });
    };

    handleGetUrlFromCropImageModal = (url) => {
        this.setState({ isOpenCropImageModal: false, imageUrl: url });
    };

    render() {
        const { onClose, round } = this.props;
        const { isOpenCropImageModal } = this.state;

        return !isOpenCropImageModal ? (
            <div className={cx('overlay')} onClick={onClose}>
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-dialog')}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Thay đổi hình ảnh</p>
                            <span className={cx('close')} onClick={onClose}>
                                <AiFillCloseSquare />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <div className={cx('image-display')}>
                                <div
                                    className={cx('label')}
                                    style={{
                                        borderRadius: round ? '999px' : '0',
                                        aspectRatio: round ? 1 : 'auto',
                                    }}
                                >
                                    <Image src={this.state.imageUrl} className={cx('image')} alt="Product Image" />
                                </div>
                            </div>
                            <div className={cx('actions')}>
                                <label
                                    className={cx('btn', 'change')}
                                    onChange={this.handleUploadImage}
                                    htmlFor="upload"
                                >
                                    Tải ảnh
                                    <input id="upload" type="file" hidden />
                                    <i className={cx('right-icon')}>
                                        <ImUpload3 />
                                    </i>
                                </label>
                                <Button
                                    className={cx('btn', 'crop')}
                                    onClick={this.handleOpenCropModal}
                                    disabled={this.state.imageUrl ? false : true}
                                >
                                    <span className={cx('text')}>Cắt ảnh</span>
                                    <i className={cx('right-icon')}>
                                        <MdCrop />
                                    </i>
                                </Button>
                                <Button className={cx('btn', 'delete')} onClick={this.handleDeleteImage}>
                                    <span className={cx('text')}>Xóa ảnh</span>
                                    <i className={cx('right-icon')}>
                                        <AiTwotoneDelete />
                                    </i>
                                </Button>
                            </div>
                        </div>

                        <div className={cx('modal-footer')}>
                            <Button className={cx('btn', 'cancel')} onClick={() => onClose()}>
                                Hủy
                            </Button>
                            <Button className={cx('btn', 'finish')} onClick={() => this.handleFinishChangeImage()}>
                                Hoàn tất
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <CropImageModal
                round={round}
                src={this.state.imageUrl}
                onClose={this.handleCloseCropImageModal}
                onGetUrl={this.handleGetUrlFromCropImageModal}
            />
        );
    }
}

export default ChangeImageModal;
