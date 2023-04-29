import { Component } from 'react';
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
