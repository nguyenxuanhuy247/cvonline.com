import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';

import styles from './Modal.module.scss';
import Button from '~/components/Button/Button.js';

const cx = className.bind(styles);

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: PropTypes.bool,
        };
    }

    static defaultProps = {
        color: 'blue',
    };

    static propTypes = {
        name: PropTypes.string,
    };

    render() {
        const { isOpen } = this.props;
        return (
            isOpen && (
                <div isOpen={this.state.isOpen} className={cx('modal')}>
                    <div className={cx('container')}>
                        <header className={cx('header')}>
                            <p className={cx('title')}>Header Modal</p>
                            <i className={cx('close')}>
                                <GrClose />
                            </i>
                        </header>
                        <main className={cx('body')}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </main>
                        <footer className={cx('footer')}>
                            <Button>Do Something</Button>
                            <Button>Cancel</Button>
                        </footer>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
