import { PureComponent } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import styles from './PersonalInfo.module.scss';
import { HeadlessTippy } from '~/components/Tooltip/CustomTooltip.js';

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
                        data.map((item) => {
                            return (
                                <div key={item.id} className={cx('info')}>
                                    <HeadlessTippy>
                                        <span className={cx('icon')}>{item.icon}</span>
                                    </HeadlessTippy>
                                    <ContentEditableTag
                                        className={cx('info-text')}
                                        placeholder={item.placeholder}
                                        reduxName="fullName"
                                    />
                                </div>
                            );
                        })}
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
