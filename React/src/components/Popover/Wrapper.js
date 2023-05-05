import { Component } from 'react';
import className from 'classnames/bind';
import styles from './Wrapper.module.scss';

const cx = className.bind(styles);

class Wrapper extends Component {
    render() {
        let { children, className } = this.props;
        return <div className={cx('wrapper', className)}>{children}</div>;
    }
}

export default Wrapper
