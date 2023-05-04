import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './JobTitle.module.scss';

const cx = className.bind(styles);

class JobTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('row-job-title')}>
                <span className={cx('job-title')}>Fullstack developer</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobTitle);
