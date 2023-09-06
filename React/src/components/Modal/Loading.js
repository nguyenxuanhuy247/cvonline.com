import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classnames.bind(styles);
class Loading extends PureComponent {
    render() {
        const { inner, small, verify, text, auth, button, search } = this.props;

        return (
            <div className={cx('overlay', { inner: inner })}>
                <div
                    className={cx(
                        'loading',
                        { 'small-spinner': small },
                        { 'verify-spinner': verify },
                        { 'auth-spinner': auth || button },
                        { 'search-spinner': search },
                    )}
                    data-text={text}
                ></div>
            </div>
        );
    }
}

export default Loading;
