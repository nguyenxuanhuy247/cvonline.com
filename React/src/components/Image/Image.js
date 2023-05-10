import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { MdFileUpload } from 'react-icons/md';

import styles from './Image.module.scss';
import CropModal from '~/containers/ManageUser/Modal/Crop/CropImage.js';
import Button from '~/components/Button/Button.js';
const cx = classNames.bind(styles);

export class ImageIcon extends PureComponent {
    render = () => {
        return (
            <div>
                <img
                    className={classNames(cx('image-icon', this.props.hover))}
                    src={this.props.src}
                    width={this.props.width || '24px'}
                    height={this.props.height || '24px'}
                    alt={this.props.alt}
                />
                {this.props.isModified && <div>Button</div>}
            </div>
        );
    };
}
class Image extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            isCrop: false,
            url: '',
        };

        this.btnRef = React.createRef();
    }

    handleChangeImageSrc = (url) => {
        this.setState({
            isModal: false,
            url: url,
        });
    };

    handleOpenModal = () => {
        this.setState({ isModal: true });
    };

    handleCloseModal = () => {
        this.setState({ isModal: false });
    };

    handleOpenCropImage = () => {
        this.setState({
            isModal: false,
            isCrop: true,
        });
    };

    render() {
        const { forwardRef, wapperClass, className, width, height, alt, isModified, isLazy } = this.props;

        return (
            <div className={classNames(cx('wapper', wapperClass))}>
                <img
                    className={classNames(cx('image', className))}
                    src={this.state.url || this.props.src}
                    width={width || '40px'}
                    height={height || '40px'}
                    alt={alt}
                    ref={forwardRef}
                    loading={isLazy || 'lazy'}
                />

                {isModified && (
                    <div className={cx('overlay')}>
                        <Button
                            leftIcon={<MdFileUpload />}
                            buttonClass={cx('button')}
                            leftIconClass={cx('left-icon')}
                            childrenClass={cx('text')}
                            ref={this.btnRef}
                            onClick={this.handleOpenModal}
                        >
                            Sửa ảnh
                        </Button>

                        {this.state.isModal && (
                            <CropModal
                                isOpen={this.state.isModal}
                                onClose={this.handleCloseModal}
                                onChange={this.handleChangeImageSrc}
                                onCrop={this.handleOpenCropImage}
                                src={this.state.url}
                            />
                        )}

                        {this.state.isCrop && <CropModal src={this.state.url} onChange={this.handleChangeImageSrc} />}
                    </div>
                )}
            </div>
        );
    }
}

export const ImageWithRef = React.forwardRef((props, ref) => <Image {...props} forwardRef={ref} />);
