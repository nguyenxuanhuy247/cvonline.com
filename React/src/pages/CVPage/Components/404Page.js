import { PureComponent } from 'react';
import classnames from 'classnames/bind';

import styles from './404Page.module.scss';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';

const cx = classnames.bind(styles);

export class NotFound404 extends PureComponent {
    render() {
        return (
            <div className={cx('not-found')}>
                <div className={cx('not-found-inner')}>
                    <Image src={JpgImages.emptyProductList} className={cx('image')} />
                    <span className={cx('text')}>{this.props.text}</span>
                </div>
            </div>
        );
    }
}
export class EmptyList404 extends PureComponent {
    render() {
        return (
            <div className={cx('empty-list')}>
                <Image src={JpgImages.emptyProductIcon} className={cx('image')} />
                <span className={cx('text')}>Danh sách trống</span>
            </div>
        );
    }
}
