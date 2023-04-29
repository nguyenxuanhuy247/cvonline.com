import { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './ImageIcon.module.scss';

const cx = classNames.bind(styles);

export class ImageIcon extends Component {

    render = () => {
        return (
            <img
                className={classNames(cx('image-icon'))}
                src={this.props.src}
                width={this.props.width || '30px'}
                height={this.props.height || '30px'}
                alt={this.props.alt}
            />
        );
    };
}
