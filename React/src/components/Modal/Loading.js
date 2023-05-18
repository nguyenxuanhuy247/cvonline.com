import { PureComponent } from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Loading.module.scss';

const cx = className.bind(styles);

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: PropTypes.bool,
        };
    }

    static defaultProps = {
        isOpen: false,
    };

    static propTypes = {
        isOpen: PropTypes.bool,
    };

    render() {
        const { isOpen } = this.props;
        return (
            isOpen && (
                <div className={cx('modal')}>
                    <span className={cx('loader')}></span>
                </div>
            )
        );
    }
}

export default Modal;
