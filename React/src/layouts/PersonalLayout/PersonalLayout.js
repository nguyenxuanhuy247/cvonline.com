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

const cx = className.bind(styles);

class PersonalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <header className={cx('header')}>
                    <Header />
                </header>
                <div className={`container ${cx('wrapper')}`}>
                        <div className={`col-4 ${cx('col-left')}`}>
                            <AvatarFullname />
                            <PersonalInfo />
                            <Literacy />
                            <Languages />
                        </div>

                        <div className={`col-8 ${cx('col-right')}`}>
                            <div className={cx('row-job-title')}>
                                <span className={cx('job-title')}>Fullstack developer</span>
                            </div>
                            <div className={cx('experience')}>
                                <div className={cx('real-product')}>
                                    <p className={cx('title')}>SẢN PHẨM THỰC TẾ</p>
                                </div>
                                
                                <div className={cx('product-list')}>
                                    <Product />
                                    <Product />
                                    <Product />
                                    <Product />
                                </div>
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
