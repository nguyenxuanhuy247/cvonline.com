import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { MdFileUpload } from 'react-icons/md';

import styles from './Image.module.scss';
import ImageModal from '~/containers/ManageUser/Modal/Image/ImageModal.js';
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
            isModalOpen: false,
        };

        this.ref = React.createRef();
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { forwardRef, className, src, width, height, alt, isModified } = this.props;

        return (
            <div className={classNames(cx('wapper'))}>
                <img
                    className={classNames(cx('image', className))}
                    src={src}
                    width={width || '40px'}
                    height={height || '40px'}
                    alt={alt}
                    ref={forwardRef}
                />

                {isModified && (
                    <div className={cx('overlay')}>
                        <Button
                            leftIcon={<MdFileUpload />}
                            buttonClass={cx('button')}
                            leftIconClass={cx('left-icon')}
                            childrenClass={cx('text')}
                            ref={this.ref}
                            onClick={this.openModal}
                        >
                            Sửa ảnh
                        </Button>
                        <ImageModal isOpen={this.state.isModalOpen} closeModal={this.closeModal} />
                    </div>
                )}
            </div>
        );
    }
}

export const ImageWithRef = React.forwardRef((props, ref) => <Image {...props} forwardRef={ref} />);
