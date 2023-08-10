import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import _ from 'lodash';

import styles from './UserIDSetting.module.scss';
import Button from '~/components/Button/Button.js';

const cx = classnames.bind(styles);

class UserIDSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
        };
    }

    batchLog = () => {
        return 1111;
    };

    handleChangeUserID = (e) => {
        this.setState({ userID: e.target.value });
        const value11 = e.target.value;
        const debouncedLog = _.debounce((value) => console.log(value), 1000);
        debouncedLog(value11);
    };

    render() {
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
                                value={this.state.userID || this.props?.owner?.id}
                                onChange={(e) => this.handleChangeUserID(e)}
                                className={cx('form-input')}
                                placeholder="nguyenxuanhuy"
                            />
                            <span className={cx('icon-wrapper')}>
                                <BsFillCheckCircleFill className={cx('icon', 'verified')} />
                                {/* <AiFillCloseCircle className={cx('icon', 'error')} /> */}
                            </span>
                        </div>
                    </div>
                    <p className={cx('message', 'OK')}>ID người dùng khả dụng</p>
                    <p className={cx('message', 'error')}>ID người dùng không khả dụng</p>

                    <Button className={cx('save-btn')}>Lưu</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIDSetting);
