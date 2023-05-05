import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './AvatarFullname.module.scss';
import { AvatarRef } from '~/components/Image/ImageComponent.js';
import { JpgImages } from '~/components/Image/Images.js';

const cx = className.bind(styles);

class AvatarFullname extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('candidate')}>
                    <div className={cx('avatar-outline')}>
                        <div className={cx('avatar-border')}>
                            <AvatarRef
                                className={cx('avatar')}
                                src={JpgImages.avatar}
                                width="170px"
                                height="170px"
                                alt="Nguyễn Xuân Huy"
                            />
                        </div>
                    </div>
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
