import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
// import ImageModal from '~/containers/ManageUser/Modal/Image/ImageModal.js';
import Button from '~/components/Button/Button.js';
import { JpgImages } from '~/components/Image/Images.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';

const cx = classNames.bind(styles);
class Image extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            url: '',
        };

        this.btnRef = React.createRef();
    }

    handleOpenModal = (e) => {
        e.stopPropagation();
        this.setState({ isOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    };

    getImageUrlFromModal(url) {
        this.setState({ url: url, isOpen: false });
    }

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.url);
    }

    render() {
        const { forwardRef, wrapperClass, className, round, width, height, alt, isLazy, editText, editButton } =
            this.props;

        const classes = cx('image', {
            [className]: className,
            round,
        });

        return (
            <div className={cx('wapper', wrapperClass, { 'mouse-enter': editButton || editText })}>
                <img
                    className={classes}
                    src={this.state.url || this.props.src || JpgImages.placeholder}
                    width={width || '40px'}
                    height={height || '40px'}
                    alt={alt}
                    ref={forwardRef}
                    loading={isLazy || 'lazy'}
                />

                {(editText || editButton) && (
                    <Button
                        className={cx({ 'edit-button': editButton, 'edit-text': editText })}
                        ref={this.btnRef}
                        onClick={this.handleOpenModal}
                    >
                        <span className={cx('text')}>{editText || editButton}</span>
                    </Button>
                )}

                {this.state.isOpen && (
                    <ChangeImageModal onClose={this.handleCloseModal} onGet={(url) => this.getImageUrlFromModal(url)} />
                )}
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <Image {...props} forwardRef={ref} />);
