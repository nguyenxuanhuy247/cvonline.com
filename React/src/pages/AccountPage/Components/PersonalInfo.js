import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './PersonalInfo.module.scss';
import Button from '~/components/Button/Button.js';
import * as userActions from '~/store/actions';

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

    handleUpdateFullName = (e) => {
        e.preventDefault();
        const { id: userId } = this.props?.owner ?? {};

        const fullName = this.state.fullName;
        const data = { userId: userId, fullName: fullName, label: 'Họ và tên' };
        this.props.updateUserInformation(data);
    };

    componentWillUnmount() {
        console.log('aaaaaaaa');
    }

    componentDidMount() {
        // console.log('aaaaaaaa', this.props.owner?.fullName);
        // this.setState({ fullName: this.props.owner?.fullName });
    }

    render() {
        console.log('aaaaaaaa', this.props.owner?.fullName);
        return (
            <div className={cx('personal-info')}>
                <span className={cx('title')}>Thông tin tài khoản</span>
                <p className={cx('required')}>
                    <span className={cx('symbol')}>(*)</span> Các thông tin bắt buộc
                </p>

                <form className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="full-name" className={cx('form-label')}>
                            Họ và tên <span className={cx('symbol')}>*</span>
                        </label>
                        <input
                            type="text"
                            id="full-name"
                            value={this.state.fullName}
                            className={cx('form-input')}
                            placeholder="Nguyễn Xuân Huy"
                            onInput={(e) => this.handleChangeFullName(e)}
                        />
                        {!this.state.fullName && (
                            <div className={cx('error-message')}>Trường này không được để trống</div>
                        )}
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={this.props.owner?.email}
                            className={cx('form-input')}
                            placeholder="VD: nguyenxuanhuy@gmail.com"
                            disabled
                        />
                    </div>

                    <Button
                        disabled={!this.state.fullName}
                        className={cx('save-btn')}
                        onClick={(e) => this.handleUpdateFullName(e)}
                    >
                        Lưu
                    </Button>
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
    return {
        updateUserInformation: (data) => dispatch(userActions.updateUserInformation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
