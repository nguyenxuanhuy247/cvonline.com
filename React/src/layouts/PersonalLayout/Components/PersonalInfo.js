import { PureComponent } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

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
                        data.map((item) => {
                            return (
                                <div key={item.id} className={cx('info')}>
                                    <span className={cx('icon')}>{item.icon}</span>
                                    <span className={cx('info-text')}>{item.text}</span>
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
