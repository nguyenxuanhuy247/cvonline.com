import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { MdRemoveRedEye } from 'react-icons/md';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { IoNewspaperSharp } from 'react-icons/io5';

import styles from './SideBar.module.scss';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';

const cx = classnames.bind(styles);

class SideBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            prevUserID: undefined,
        };
    }

    handleGoBackToMyCVPage = async () => {
        const { id: ownerID } = this.props?.owner ?? {};
        const { id: userID } = this.props?.userInfo ?? {};

        if (ownerID !== userID) {
            console.log('prevUserID 1111111');
            const errorCode = await this.props.readUserInformation(ownerID);

            if (errorCode !== 0) {
                console.log('LỖI Ở NUT CV CỦA TÔI', errorCode);
                Toast.TOP_CENTER_ERROR('Vui lòng đăng nhập lại', 3000);
                this.props.userSignOut();
            }
        }
    };

    handleGoBackToPreviosCV = () => {
        const prevUserID = this.state.prevUserID;
        if (prevUserID) {
            console.log('prevUserID', prevUserID);
            this.props.readUserInformation(prevUserID);
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.userInfo?.id !== prevProps.userInfo?.id) {
            this.setState({ prevUserID: prevProps.userInfo?.id });
        }
    }

    render = () => {
        const { pathname } = this.props?.location ?? {};
        const { id: ownerID } = this.props?.owner ?? {};

        const prevUserID = this.state.prevUserID;

        console.log('prevUserID 333333333333', !!prevUserID && prevUserID !== ownerID);

        return (
            <div className={cx('side-bar')}>
                <Link to="/" className={cx('button', { hover: pathname === '/' })}>
                    <span className={cx('icon')}>
                        <AiFillHome />
                    </span>
                    <span className={cx('text')}>Trang chủ</span>
                </Link>
                <Link
                    to={`/${this.props.owner?.id}`}
                    className={cx('button', {
                        hover: pathname === `/${ownerID}`,
                    })}
                    onClick={() => this.handleGoBackToMyCVPage()}
                >
                    <span className={cx('icon')}>
                        <IoNewspaperSharp />
                    </span>
                    <span className={cx('text')}>CV của tôi</span>
                </Link>
                <Link
                    to={`/${this.props.owner?.id}`}
                    className={cx('button', {
                        hover: prevUserID && prevUserID !== ownerID,
                    })}
                    onClick={() => this.handleGoBackToPreviosCV()}
                >
                    <span className={cx('icon')}>
                        <MdRemoveRedEye />
                    </span>
                    <span className={cx('text')}>Vừa xem</span>
                </Link>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readUserInformation: (userId) => dispatch(userActions.readUserInformation(userId)),
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));
