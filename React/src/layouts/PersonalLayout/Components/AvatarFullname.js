import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './AvatarFullname.module.scss';
import avatar from '~/assets/img/avatar.jpg';

const cx = className.bind(styles);

class AvatarFullname extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('candidate')}>
                <img src={avatar} className={cx('avatar')} alt="Nguyen Xuan Huy" />
                <strong className={cx('name')}>Nguyễn Xuân Huy</strong>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarFullname);
