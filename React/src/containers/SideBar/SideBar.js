import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { IoNewspaperSharp } from 'react-icons/io5';

import styles from './SideBar.module.scss';

const cx = classnames.bind(styles);

class Header extends PureComponent {
    render = () => {
        return (
            <div className={cx('side-bar')}>
                <Link to="/" className={cx('button')}>
                    <span className={cx('icon')}>
                        <AiFillHome />
                    </span>
                    <span className={cx('text')}>Trang chủ</span>
                </Link>
                <Link to={`/${this.props.ownerId}`} className={cx('button')}>
                    <span className={cx('icon')}>
                        <IoNewspaperSharp />
                    </span>
                    <span className={cx('text')}>CV của tôi</span>
                </Link>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        ownerId: state.user.owner?.id,
    };
};

export default connect(mapStateToProps, null)(Header);
