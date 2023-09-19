import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { IoNewspaperSharp } from 'react-icons/io5';
import { MdRemoveRedEye } from 'react-icons/md';
import { BsFillEnvelopeAtFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

import styles from './SideBar.module.scss';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import Button from '~/components/Button/Button.js';
import GetGoogleAppPasswordModal from '~/components/Modal/GetGoogleAppPasswordModal.js';
import SendCVByEmailModal from '~/components/Modal/SendCVByEmailModal.js';

const cx = classnames.bind(styles);

class SideBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            prevUserID: undefined,
            isGetGoogleAppPasswordModal: false,
            isSendCVViaEmailModal: false,
        };

        this.id = React.createRef();
    }

    handleGoBackToMyCVPage = async () => {
        const isSignIn = this.props.isSignIn;

        if (!isSignIn) {
            Toast.TOP_CENTER_INFO('Vui lòng đăng nhập để tạo CV của bạn', 3000);
            this.id.current = setTimeout(() => {
                this.props.userSignOutAndRedirectToSignIn();
            }, 2000);
        }
    };

    handleClickSendCVViaEmailButton = async () => {
        const { isGmailPassword } = this.props.owner ?? {};
        const isSignIn = this.props.isSignIn;

        if (isSignIn) {
            if (isGmailPassword) {
                this.setState({ isSendCVViaEmailModal: true });
            } else {
                this.setState({ isGetGoogleAppPasswordModal: true });
            }
        } else {
            Toast.TOP_CENTER_INFO('Vui lòng đăng nhập để gửi CV bằng email', 3000);
            this.id.current = setTimeout(() => {
                this.props.userSignOutAndRedirectToSignIn();
            }, 2000);
        }
    };

    handleCloseModal = () => {
        this.setState({
            isGetGoogleAppPasswordModal: false,
            isSendCVViaEmailModal: false,
        });
    };

    handleCloseSendCVModalAndOpenGetGoogleAppPasswordModal = () => {
        this.setState({
            isGetGoogleAppPasswordModal: true,
            isSendCVViaEmailModal: false,
        });
    };

    handleCloseGetGoogleAppPasswordModalAndOpenSendCVModal = () => {
        this.setState({
            isGetGoogleAppPasswordModal: false,
            isSendCVViaEmailModal: true,
        });
    };
    componentDidUpdate(prevProps) {
        if (this.props.userInfo?.id !== prevProps.userInfo?.id) {
            this.setState({ prevUserID: prevProps.userInfo?.id });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id.current);
    }

    render = () => {
        const { pathname } = this.props?.location ?? {};
        const { id: ownerID } = this.props?.owner ?? {};
        const CVHistory = this.props?.CVHistory;
        const firstUserIDInList = CVHistory[0];

        return (
            <div className={cx('side-bar')}>
                <Button route="/" className={cx('button', { hover: pathname === '/' })}>
                    <span className={cx('icon')}>
                        <AiFillHome />
                    </span>
                    <span className={cx('text')}>Trang chủ</span>
                </Button>
                <Button
                    route={this.props.isSignIn ? `/${this.props.owner?.id}` : '#!'}
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
                    disabled={!firstUserIDInList}
                    route={`/${firstUserIDInList}`}
                    className={cx('button')}
                    onClick={() => this.props.removeCVFromHistory()}
                >
                    <span className={cx('icon')}>
                        <MdRemoveRedEye />
                    </span>
                    <span className={cx('text')}>Vừa xem</span>
                </Button>
                <Button className={cx('button')} onClick={() => this.handleClickSendCVViaEmailButton()}>
                    <span className={cx('icon')}>
                        <BsFillEnvelopeAtFill />
                    </span>
                    <span className={cx('text')}>Gửi CV</span>
                </Button>

                <GetGoogleAppPasswordModal
                    isOpen={this.state.isGetGoogleAppPasswordModal}
                    onClose={() => this.handleCloseModal()}
                    onCloseAndOpenSendCVModal={() => this.handleCloseGetGoogleAppPasswordModalAndOpenSendCVModal()}
                />
                <SendCVByEmailModal
                    isOpen={this.state.isSendCVViaEmailModal}
                    onClose={() => this.handleCloseModal()}
                    onCloseAndOpenGetGoogleAppPasswordModal={() =>
                        this.handleCloseSendCVModalAndOpenGetGoogleAppPasswordModal()
                    }
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.user.isSignIn,
        owner: state.user.owner,
        CVHistory: state.user.CVHistory,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCVFromHistory: () => dispatch({ type: 'REMOVE_CV_FROM_HISTORY' }),
        userSignOut: () => dispatch(userActions.userSignOut()),
        userSignOutAndRedirectToSignIn: () => dispatch(userActions.userSignOutAndRedirectToSignIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));
