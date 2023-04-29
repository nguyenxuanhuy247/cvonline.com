import { Component } from 'react';
import className from 'classnames/bind';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import Library from '~/components/Library/Library.js';
import Images from '~/assets/icons/Images.js';

const cx = className.bind(styles);

export default class Product extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className={cx('container')}>
                <div className={cx('item', 'company')}>
                    <input type="text" className={cx('company-name')} placeholder="Nhập tên công ty bạn từng làm ..." />
                </div>
                <div className={cx('item', 'product')}>
                    <input type="text" className={cx('product-name')} placeholder="Nhập sản phẩm bạn từng làm ..." />
                </div>
                <div className={cx('item', 'product-image')}>Anh san pham</div>
                <div className={cx('item', 'library-used')}>
                    <p>Danh sách thư viện sử dụng</p>
                </div>
                <div className={cx('item', 'library-list')}>
                    <p>Front-end</p>
                    <div>
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                        <Library src={Images.Github} name="React router dom" version="6.10.0" />
                    </div>
                    <p className={cx('item', 'paganition')}>paganition</p>
                </div>
                <div className={cx('item', 'source-code')}>
                    <Technology src={Images.Github} name="Github" />
                    <Technology src={Images.Gitlab} name="Gitlab" />
                </div>
                <div className={cx('item', 'programming-langs')}>
                    <div className={cx('text')}>Ngon ngu lap trinh</div>
                    <div className={cx('list')}>
                        <Technology src={Images.HTML} name="HTML" />
                        <Technology src={Images.CSS} name="CSS" />
                        <Technology src={Images.CSS} name="JavaScript" />
                    </div>
                </div>
                <div className={cx('item', 'framworks')}>
                    <span className={cx('text')}>Frameworks</span>
                    <span className={cx('list')}>
                        <Technology src={Images.HTML} name="HTML" />
                        <Technology src={Images.CSS} name="CSS" />
                        <Technology src={Images.CSS} name="JavaScript" />
                    </span>
                </div>
            </div>
        );
    };
}
