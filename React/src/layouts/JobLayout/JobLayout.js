import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import AvatarFullname from '~/layouts/PersonalLayout/Components/AvatarFullname.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';
import Literacy from '~/layouts/PersonalLayout/Components/Literacy.js';
import Languages from '~/layouts/PersonalLayout/Components/Languages.js';

import styles from './JobLayout.module.scss';

const cx = className.bind(styles);

class JobLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <Header />

                <div className={`container ${cx('wrapper')}`}>
                    <div className={`col-4 ${cx('col-left')}`}>
                    </div>

                    <div className={`col-8 ${cx('col-right')}`}>
                        <div className={cx('product-list')}>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobLayout);
