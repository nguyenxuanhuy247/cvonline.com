import { PureComponent } from 'react';
import classnames from 'classnames/bind';

import styles from './404Page.module.scss';

const cx = classnames.bind(styles);

class NotFoundLayout extends PureComponent {
    render() {
        return (
            <div className={cx('not-found-section')}>
                <div className={cx('not-found-container')}>
                    <span className={cx('number')}>404</span>
                    <span className={cx('text')}>Không tìm thấy CV phù hợp</span>
                </div>
            </div>
        );
    }
}

export default NotFoundLayout;
