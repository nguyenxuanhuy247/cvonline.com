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

const cx = classnames.bind(styles);

class UserIDSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newID: '',
        };
    }

    handleInputNewUserID = (e) => {
        const newUserID = e.target.value;

        this.setState({ newID: newUserID });
        if (newUserID) {
            const debouncedVerify = _.debounce((newUserID) => {
                this.props.verifyUserID(newUserID);
            }, 500);

            debouncedVerify(newUserID);
        }
    };

    handleChangeUserID = (e) => {
        const { id: currentUserID } = this.props.owner ?? {};
        e.preventDefault();
        const data = {
            currentID: this.props?.owner?.id,
            newID: this.state.newID,
        };

        if (this.state.newID !== currentUserID) {
            this.props.changeUserID(data);
        } else {
            Toast.TOP_CENTER_WARN('ID hiện tại đang được  sử dụng, vui lòng nhập ID khác', 4000);
        }
    };

    componentDidMount() {
        this.setState({ newID: this.props?.owner?.id });
    }

    render() {
        console.log(this.props.isLoading_changeUserID);
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
                                onChange={(e) => this.handleInputNewUserID(e)}
                                className={cx('form-input')}
                                placeholder="nguyenxuanhuy"
                                spellCheck={false}
                            />
                            {this.state.newID && (
                                <span className={cx('icon-wrapper')}>
                                    {this.props.isUserIDVerified ? (
                                        <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                    ) : (
                                        <AiFillCloseCircle className={cx('icon', 'error')} />
                                    )}

                                    {this.props.isLoading_verifyUserID && <Loading inner small />}
                                </span>
                            )}
                        </div>
                    </div>
                    {this.state.newID ? (
                        this.props.isUserIDVerified ? (
                            <p className={cx('message', 'OK')}>ID người dùng khả dụng</p>
                        ) : (
                            <p className={cx('message', 'error')}>ID người dùng không khả dụng</p>
                        )
                    ) : (
                        <p className={cx('message', 'error')}>Vui lòng nhập ID người dùng</p>
                    )}

                    <Button
                        className={cx('save-btn')}
                        onClick={(e) => this.handleChangeUserID(e)}
                        disabled={
                            this.props.isLoading_verifyUserID || !this.props.isUserIDVerified || !this.state.newID
                        }
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
