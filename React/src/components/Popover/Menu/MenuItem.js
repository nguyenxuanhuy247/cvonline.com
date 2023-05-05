import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './MenuItem.module.scss';
import * as userActions from '~/store/actions/userActions.js';

const cx = className.bind(styles);

class MenuItem extends Component {
    handleUserClick = () => {
        if (this.props.text === 'Đăng xuất') {
            this.props.userSignOut();
        }

        this.props.onClick();
    };

    render() {
        let { icon, title } = this.props.data;

        return (
            <button className={cx('menu-item')} onClick={() => this.handleUserClick()}>
                <span className={cx('icon')}>{icon}</span>
                <span className={cx('text')}>{title}</span>
                <span className={cx('arrow')}>
                    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
                        />
                    </svg>
                </span>
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
