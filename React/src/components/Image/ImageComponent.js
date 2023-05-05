import { Component, forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './ImageIcon.module.scss';

const cx = classNames.bind(styles);

export class ImageIcon extends Component {
    render = () => {
        return (
            <img
                className={classNames(cx('image-icon', this.props.hover))}
                src={this.props.src}
                width={this.props.width || '24px'}
                height={this.props.height || '24px'}
                alt={this.props.alt}
            />
        );
    };
}

export class Avatar extends Component {
    render = () => {
        return (
            <img
                className={classNames(cx('avatar', this.props.className))}
                src={this.props.src}
                width={this.props.width || '40px'}
                height={this.props.height || '40px'}
                alt={this.props.alt}
                ref={this.props.ref}
            />
        );
    };
}

export const AvatarRef = forwardRef((props, ref) => <Avatar {...props} ref={ref} />);
