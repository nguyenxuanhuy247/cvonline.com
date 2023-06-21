import { PureComponent } from 'react';
import * as React from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import styles from './PersonalInfo.module.scss';

const cx = className.bind(styles);

class PersonalInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        const { title, data } = this.props;
        return (
            <div className={cx('candidate-info')}>
                <p className={cx('text')}>{title}</p>
                <div className={cx('content')}>
                    {data &&
                        data.map((item) => (
                            <div key={item.id} className={cx('info')}>
                                <span className={cx('icon')}>{item.icon}</span>
                                <ContentEditableTag className={cx('info-text')} placeholder={item.placeholder} />
                            </div>
                        ))}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
