import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import _ from 'lodash';

import styles from './UserIDSetting.module.scss';
import Button from '~/components/Button/Button.js';
import * as appActions from '~/store/actions';
import * as userActions from '~/store/actions/userActions.js';
import Loading from '~/components/Modal/Loading.js';
import { Toast } from '~/components/Toast/Toast.js';
import { dispatch } from '~/config/redux';

const cx = classnames.bind(styles);

class UserIDSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showIconAndText: false,
            showText: false,
            newID: '',
        };
        this.debouncedVerifyUserID = _.debounce(this.VerifyUserID, 1000);
    }

    handleInputNewUserID = (e) => {
        const newUserID = e.target.value;

        if (newUserID) {
            this.setState({ newID: newUserID, showIconAndText: true });
        } else {
            this.setState({ newID: newUserID, showIconAndText: false, showText: false });
        }
    };

    VerifyUserID = async (e) => {
        const { id: ownerID } = this.props.owner ?? {};
        const newUserID = e.target.value;

        if (newUserID && newUserID !== ownerID) {
            await this.setState({ showText: false });
            await this.props.verifyUserID(newUserID);
            await this.setState({ showText: true });
        } else if (newUserID === ownerID) {
            dispatch({ type: 'VERIFY_ID_SUCCESS' });
            await this.setState({ showText: true });
        }
    };

    handleChangeUserID = async (e) => {
        e.preventDefault();
        const { id: currentUserID } = this.props.owner ?? {};
        const data = {
            currentID: this.props?.owner?.id,
            newID: this.state.newID,
        };

        if (this.state.newID !== currentUserID) {
            const errorCode = await this.props.changeUserID(data);

            if (errorCode === 0) {
                this.setState({ showIconAndText: false, showText: false });
            }
        } else {
            Toast.TOP_CENTER_WARN('ID hiện tại đang được sử dụng, vui lòng nhập ID khác', 3000);
        }
    };

    preventLoadFormWhenPressEnter = (e) => {
        if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
            e.preventDefault();
        }
    };

    handleClearIDInput = () => {
        this.setState({ newID: '' });
    };

    componentDidMount() {
        this.setState({ newID: this.props?.owner?.id });
    }

    render() {
        const isFilled = !!this.state.newID;
        const isDisabled = !isFilled || !this.props.isUserIDVerified;

        return (
            <div className={cx('user-id-setting')}>
                <span className={cx('title')}>Cài đặt ID người dùng</span>
                <div className={cx('required')}>Nếu bạn đổi ID người dùng sẽ thay đổi địa chỉ tìm kiếm CV của bạn </div>

                <form className={cx('form')}>
                    <div className={cx('input-form-userID')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="userID" className={cx('form-label')}>
                                ID người dùng
                            </label>
                            <input
                                type="text"
                                id="userID"
                                value={this.state.newID}
                                className={cx('form-input')}
                                spellCheck={false}
                                onChange={(e) => this.handleInputNewUserID(e)}
                                onKeyDown={(e) => this.preventLoadFormWhenPressEnter(e)}
                                onInput={this.debouncedVerifyUserID}
                            />

                            {this.state.showIconAndText && this.state.newID && (
                                <span className={cx('icon-wrapper')}>
                                    {this.props.isUserIDVerified ? (
                                        <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                    ) : (
                                        <AiFillCloseCircle
                                            className={cx('icon', 'error')}
                                            onClick={() => this.handleClearIDInput()}
                                        />
                                    )}

                                    {this.props.isLoading_verifyUserID && <Loading inner verify />}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={cx('message-container')}>
                        {this.state.showIconAndText &&
                            this.state.showText &&
                            (this.state.newID ? (
                                this.props.isUserIDVerified ? (
                                    <p className={cx('message', 'OK')}>ID người dùng khả dụng</p>
                                ) : (
                                    <p className={cx('message', 'error')}>ID người dùng không khả dụng</p>
                                )
                            ) : (
                                <p className={cx('message', 'error')}>Vui lòng nhập ID người dùng</p>
                            ))}
                    </div>

                    <Button
                        disabled={isDisabled}
                        className={cx('save-btn')}
                        onClick={(e) => this.handleChangeUserID(e)}
                    >
                        {this.props.isLoading_changeUserID ? <Loading inner auth /> : `Lưu`}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        isLoading_verifyUserID: state.app.isLoading.verifiedUserID,
        isUserIDVerified: state.app.isUserIDVerified,
        isLoading_changeUserID: state.user.isLoading.changeUserID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyUserID: (userID) => dispatch(appActions.verifyUserID(userID)),
        changeUserID: (userID) => dispatch(userActions.changeUserID(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIDSetting);
