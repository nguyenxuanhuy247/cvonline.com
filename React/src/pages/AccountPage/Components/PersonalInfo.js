import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { AiFillCloseCircle } from 'react-icons/ai';

import styles from './PersonalInfo.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';
import { Toast } from '~/components/Toast/Toast.js';
import AccountPage from '~/pages/AccountPage/AccountPage.js';

const cx = classnames.bind(styles);

class PersonalInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
        };
    }

    handleChangeFullName = (e) => {
        this.setState({ fullName: e.target.value });
    };

    handleUpdateFullName = async (e) => {
        e.preventDefault();
        const { id: userId } = this.props?.owner ?? {};

        const fullName = this.state.fullName;
        const isEqual = this.props.owner?.fullName === this.state.fullName;

        if (!isEqual) {
            const data = { userId: userId, fullName: fullName, label: 'Họ và tên' };
            const errorCode = await this.props.updateUserInformation(data);

            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS('Cập nhật Họ và tên thành công', 2000);
            }
        }
    };

    preventLoadFormWhenPressEnter = (e) => {
        if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
            e.preventDefault();
            this.handleUpdateFullName(e);
        }
    };

    handleClearFullNameInput = () => {
        this.setState({ fullName: '' });
    };

    componentDidMount() {
        this.setState({ fullName: this.props.owner?.fullName });
    }

    render() {
        const isFilled = !!this.state.fullName;
        const isEqual = this.props.owner?.fullName === this.state.fullName;

        return (
            <AccountPage>
                <div className={cx('personal-info')}>
                    <span className={cx('title')}>Thông tin tài khoản</span>

                    <div className={cx('error-message-container')}>
                        {!this.state.fullName && (
                            <div className={cx('error-message')}>Trường Họ và tên không được để trống</div>
                        )}
                    </div>

                    <form className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="full-name" className={cx('form-label')}>
                                Họ và tên
                            </label>
                            <div className={cx('form-input-container')}>
                                <input
                                    type="text"
                                    id="full-name"
                                    value={this.state.fullName}
                                    className={cx('form-input')}
                                    spellCheck={false}
                                    onInput={(e) => this.handleChangeFullName(e)}
                                    onKeyDown={(e) => this.preventLoadFormWhenPressEnter(e)}
                                />
                                {this.state.fullName && (
                                    <span
                                        className={cx('icon-wrapper')}
                                        onClick={() => this.handleClearFullNameInput()}
                                    >
                                        <AiFillCloseCircle className={cx('icon-clear')} />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="email" className={cx('form-label')}>
                                Email
                            </label>
                            <div className={cx('form-input-container')}>
                                <input
                                    type="email"
                                    id="email"
                                    value={this.props.owner?.email}
                                    className={cx('form-input', 'email')}
                                    placeholder="VD: nguyenxuanhuy@gmail.com"
                                    disabled
                                />
                            </div>
                        </div>

                        <Button
                            disabled={!isFilled || isEqual}
                            className={cx('save-btn')}
                            onClick={(e) => this.handleUpdateFullName(e)}
                        >
                            Lưu
                        </Button>
                    </form>
                </div>
            </AccountPage>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
