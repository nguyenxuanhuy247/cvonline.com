import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import AvatarFullname from '~/layouts/PersonalLayout/Components/AvatarFullname.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';
import Literacy from '~/layouts/PersonalLayout/Components/Literacy.js';
import Languages from '~/layouts/PersonalLayout/Components/Languages.js';

import styles from './PersonalLayout.module.scss';
import JobTitle from '~/layouts/PersonalLayout/Components/JobTitle.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';

const cx = className.bind(styles);

class PersonalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className={cx('body')}>
                <Header />
                <div className={cx('wrapper', 'container')}>
                    <div className={cx('col-left', 'col-3')}>
                        <AvatarFullname />
                        <PersonalInfo />
                        <Literacy />
                        <Languages />
                    </div>

                    <div className={cx('col-right', 'col-9')}>
                        <div className={cx('job-title')}>
                            <JobTitle />
                        </div>
                        <div>
                            <ContentEditableTag className='product-desc' placeholder='Mô tả ngắn gọn về sản phẩm'/>
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
