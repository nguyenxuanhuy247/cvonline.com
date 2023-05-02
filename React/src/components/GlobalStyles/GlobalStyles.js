import { Component } from 'react';
import styles from './GlobalStyles.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GlobalStyles extends Component {
    render() {
        return (
            <div className={cx('global-styles')}>
                {this.props.children}
            </div>
        )
    }
}


export default GlobalStyles;