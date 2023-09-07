import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classnames.bind(styles);
class Loading extends PureComponent {
    render() {
        const { inner, small, verify, text, auth, largeButton, button, smallButton, search, authLayout } = this.props;

        return (
            <div className={cx('overlay', { inner: inner }, { 'auth-layout': authLayout })}>
                <div
                    className={cx(
                        'loading',
                        { 'small-spinner': small },
                        { 'verify-spinner': verify },
                        { 'auth-spinner': auth },
                        { 'large-button-spinner': largeButton },
                        { 'button-spinner': button },
                        { 'small-button-spinner': smallButton },
                        { 'search-spinner': search },
                    )}
                    data-text={text}
                ></div>
            </div>
        );
    }
}

export default Loading;
