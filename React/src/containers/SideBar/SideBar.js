import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { MdRemoveRedEye } from 'react-icons/md';
import { BsFillEnvelopeAtFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { IoNewspaperSharp } from 'react-icons/io5';

import styles from './SideBar.module.scss';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import Button from '~/components/Button/Button.js';

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
            const errorCode = await this.props.readUserInformation(ownerID);

            if (errorCode !== 0) {
                Toast.TOP_CENTER_ERROR('Vui lòng đăng nhập lại', 3000);
                this.props.userSignOut();
            }
        }
    };

    handleGoBackToPreviousCV = () => {
        const prevUserID = this.props.prevUserID;

        if (prevUserID) {
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
        const prevUserID = this.props.prevUserID;

        return (
            <div className={cx('side-bar')}>
                <Button route="/" className={cx('button', { hover: pathname === '/' })}>
                    <span className={cx('icon')}>
                        <AiFillHome />
                    </span>
                    <span className={cx('text')}>Trang chủ</span>
                </Button>
                <Button
                    route={`/${this.props.owner?.id}`}
                    className={cx('button', {
                        hover: pathname === `/${ownerID}`,
                    })}
                    onClick={() => this.handleGoBackToMyCVPage()}
                >
                    <span className={cx('icon')}>
                        <IoNewspaperSharp />
                    </span>
                    <span className={cx('text')}>CV của tôi</span>
                </Button>
                <Button
                    disabled={!prevUserID}
                    route={`/${prevUserID}`}
                    className={cx('button')}
                    onClick={() => this.handleGoBackToPreviousCV()}
                >
                    <span className={cx('icon')}>
                        <MdRemoveRedEye />
                    </span>
                    <span className={cx('text')}>Vừa xem</span>
                </Button>
                <Button className={cx('button')}>
                    <span className={cx('icon')}>
                        <BsFillEnvelopeAtFill />
                    </span>
                    <span className={cx('text')}>Gửi CV</span>
                </Button>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        prevUserID: state.user.prevUserID,
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
