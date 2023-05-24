import { PureComponent } from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { AiFillCloseSquare } from 'react-icons/ai';

import styles from './Modal.module.scss';
import Button from '~/components/Button/Button.js';

const cx = className.bind(styles);

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }

    static propTypes = {
        isOpen: PropTypes.bool,
    };

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { isModalOpen } = this.props;

        return (
            isModalOpen && this.state.isOpen && (
                <div className={cx('overlay')} onClick={() => this.handleCloseModal()}>
                    <div className={cx('container')}>
                        <div className={cx('modal-dialog')}>
                            <div className={cx('modal-header')}>
                                <p className={cx('title')}>Header Modal</p>
                                <span className={cx('close')} onClick={() => this.handleCloseModal()}>
                                    <AiFillCloseSquare />
                                </span>
                            </div>
                            <div className={cx('modal-body')}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </div>
                            <div className={cx('modal-footer')}>
                                <Button onClick={() => this.handleCloseModal()}>Do Something</Button>
                                <Button onClick={() => this.handleCloseModal()}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Modal;
