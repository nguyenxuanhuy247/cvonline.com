import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

import styles from './ChangeImageModal.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import CropImageModal from './CropImageModal.js';

const cx = classnames.bind(styles);

class ChangeImageModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ImageUrl: '',
            isOpenCropImageModal: false,
        };
    }

    static propTypes = {
        ImageUrl: PropTypes.string,
    };

    handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const urlObj = URL.createObjectURL(file);
            this.setState({ ImageUrl: urlObj });
        }
    };

    handleDeleteImage = () => {
        this.setState({ ImageUrl: '' });
    };

    handleFinishChangeImage = () => {
        const { onGetUrl, onClose } = this.props;

        onGetUrl(this.state.ImageUrl);
        onClose();
    };

    handleOpenCropModal = () => {
        this.setState({ isOpenCropImageModal: true });
    };

    handleCloseCropImageModal = () => {
        this.setState({ isOpenCropImageModal: false });
    };

    handleGetUrlFromCropImageModal = (url) => {
        this.setState({ isOpenCropImageModal: false, ImageUrl: url });
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
                            <div className={cx('row no-gutters')}>
                                <div className={cx('col pc-9')}>
                                    <div className={cx('wrapper')}>
                                        <input
                                            id="upload"
                                            type="file"
                                            hidden
                                            onChange={(e) => this.handleUploadImage(e)}
                                        />
                                        <label
                                            htmlFor="upload"
                                            className={cx('label')}
                                            style={{
                                                borderRadius: round ? '999px' : '0',
                                                aspectRatio: round ? 1 : 'auto',
                                            }}
                                        >
                                            <Image
                                                src={this.state.ImageUrl || JpgImages.placeholder}
                                                className={cx('image')}
                                                alt="Product Image"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className={cx('col pc-3')}>
                                    <div className={cx('actions')}>
                                        <Button
                                            className={cx('btn', 'crop')}
                                            onClick={this.handleOpenCropModal}
                                            disabled={this.state.ImageUrl ? false : true}
                                        >
                                            <span className={cx('text')}>Cắt</span>
                                            <i className={cx('right-icon')}>
                                                <MdCrop />
                                            </i>
                                        </Button>
                                        <Button className={cx('btn', 'delete')} onClick={this.handleDeleteImage}>
                                            <span className={cx('text')}>Xóa</span>
                                            <i className={cx('right-icon')}>
                                                <AiTwotoneDelete />
                                            </i>
                                        </Button>
                                    </div>
                                </div>
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
                src={this.state.ImageUrl}
                onClose={this.handleCloseCropImageModal}
                onGetUrl={this.handleGetUrlFromCropImageModal}
            />
        );
    }
}

export default ChangeImageModal;
