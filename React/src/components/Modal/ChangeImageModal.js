import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdCrop } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

import styles from './CropImageModal.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import CropImageModal from './CropImageModal';

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
        const { onGet, onClose } = this.props;

        onGet(this.state.ImageUrl);
        onClose();
    };

    handleOpenCropModal = () => {
        this.setState({ isOpenCropImageModal: true });
    };

    render() {
        const { onClose } = this.props;
        const { isOpenCropImageModal } = this.state;

        return !isOpenCropImageModal ? (
            <div className={cx('overlay')} onClick={() => onClose()}>
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('modal-dialog')}>
                        <div className={cx('modal-header')}>
                            <p className={cx('title')}>Thay đổi hình ảnh</p>
                            <span className={cx('close')} onClick={() => onClose()}>
                                <AiFillCloseSquare />
                            </span>
                        </div>

                        <div className={cx('modal-body')}>
                            <div className={cx('grid')}>
                                <div className={cx('row')}>
                                    <div className={cx('col pc-9')}>
                                        <div className={cx('wrapper')}>
                                            <input
                                                id="upload"
                                                type="file"
                                                hidden
                                                onChange={(e) => this.handleUploadImage(e)}
                                            />
                                            <label htmlFor="upload" className={cx('label')}>
                                                <Image
                                                    src={this.state.ImageUrl || JpgImages.placeholder}
                                                    className={cx('image')}
                                                    alt="Product Image"
                                                    editText=""
                                                    editButton=""
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={cx('col pc-2')}>
                                        <div className={cx('actions')}>
                                            <Button
                                                className={cx('btn', 'crop')}
                                                onClick={() => this.handleOpenCropModal()}
                                                disabled={this.state.ImageUrl ? false : true}
                                            >
                                                <span className={cx('text')}>Cắt</span>
                                                <i className={cx('right-icon')}>
                                                    <MdCrop />
                                                </i>
                                            </Button>
                                            <Button
                                                className={cx('btn', 'delete')}
                                                onClick={() => this.handleDeleteImage()}
                                            >
                                                <span className={cx('text')}>Xóa</span>
                                                <i className={cx('right-icon')}>
                                                    <AiTwotoneDelete />
                                                </i>
                                            </Button>
                                        </div>
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
            <CropImageModal />
        );
    }
}

export default ChangeImageModal;
