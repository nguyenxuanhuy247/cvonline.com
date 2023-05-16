import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './AvatarFullname.module.scss';
import { ImageWithRef } from '~/components/Image/Image.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
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
                        <ImageWithRef
                            className={cx('avatar')}
                            src={JpgImages.avatar}
                            width="170px"
                            height="170px"
                            alt="Nguyễn Xuân Huy"
                        />
                    </div>
                </div>
                <ContentEditableTag className={cx('full-name')} placeholder="Nguyễn Xuân Huy" reduxName="fullName" />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarFullname);
