import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import styles from './Image.module.scss';
import ImageModal from '~/containers/ManageUser/Modal/Image/ImageModal.js';
import Button from '~/components/Button/Button.js';
import { JpgImages } from '~/components/Image/Images.js';

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
            isOpen: false,
            url: '',
        };

        this.btnRef = React.createRef();
    }

    handleChangeImageFromModal = (url) => {
        this.setState({
            isOpen: false,
            url: url,
        });
    };

    handleOpenModal = () => {
        this.setState({ isOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { forwardRef, wapperClass, className, width, height, alt, isLazy, editText, sizeEditBtn } = this.props;

        return (
            <div className={cx('wapper', wapperClass)}>
                <img
                    className={cx('image', className)}
                    src={this.state.url || this.props.src || JpgImages.placeholder}
                    width={width || '40px'}
                    height={height || '40px'}
                    alt={alt}
                    ref={forwardRef}
                    loading={isLazy || 'lazy'}
                />

                {editText && (
                    <div className={cx('overlay')}>
                        <Button
                            className={sizeEditBtn === 'large' ? cx('button-lg') : cx('button-sm')}
                            ref={this.btnRef}
                            onClick={this.handleOpenModal}
                        >
                            <span className={cx('text')}>{editText}</span>
                        </Button>

                        {this.state.isOpen && (
                            <ImageModal
                                isOpen={this.state.isOpen}
                                onClose={this.handleCloseModal}
                                onChange={this.handleChangeImageFromModal}
                                src={this.state.url}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export const ImageWithRef = React.forwardRef((props, ref) => <Image {...props} forwardRef={ref} />);
