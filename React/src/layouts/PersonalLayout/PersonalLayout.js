import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import AvatarFullname from '~/layouts/PersonalLayout/Components/AvatarFullname.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';
import Literacy from '~/layouts/PersonalLayout/Components/Literacy.js';
import Languages from '~/layouts/PersonalLayout/Components/Languages.js';

import styles from './PersonalLayout.module.scss';
import JobTitle from '~/layouts/PersonalLayout/Components/JobTitle.js';

const cx = className.bind(styles);

class PersonalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                
                <div className={`container ${cx('wrapper')}`}>
                    <div className={`col-4 ${cx('col-left')}`}>
                        <AvatarFullname />
                        <PersonalInfo />
                        <Literacy />
                        <Languages />
                    </div>

                    <div className={`col-8 ${cx('col-right')}`}>
                        <JobTitle />
                        <div className={cx('product-list')}>
                            <Product />
                            <Product />
                            <Product />
                            <Product />
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

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
