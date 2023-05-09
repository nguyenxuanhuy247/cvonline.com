import { PureComponent } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import Library from '~/components/Library/Library.js';
import { Icons } from '~/components/Image/Images.js';
import PaginationBar from '~/components/Pagination/PaginationBar.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import { ImageWithRef } from '~/components/Image/Image.js';

import { JpgImages } from '~/components/Image/Images.js';

const cx = className.bind(styles);

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            company: this.company,
        };
    }

    handleChangeNameCompany = (e) => {
        this.setState({ company: e.target.innerText });
    };

    render = () => {
        return (
            <div className={cx('container')} spellCheck="false">
                <div className={cx('work-exp-desc')} spellCheck="false">
                    <div className={cx('work-exp')}>
                        <ContentEditableTag
                            className="company-name"
                            placeholder="Tên công ty"
                            reduxName="companyName"
                        />
                        <span className={cx('dash')}>-</span>
                        <ContentEditableTag
                            className="job-position"
                            placeholder="Vị trí công việc"
                            reduxName="jobPosition"
                        />
                    </div>

                    <div className={cx('product-desc')}>
                        <ContentEditableTag
                            className="product-desc"
                            placeholder="Mô tả ngắn gọn về sản phẩm"
                            reduxName="productDesc"
                        />
                    </div>
                </div>

                <div className={cx('product-detail')}>
                    <div className={cx('col-left', 'col-8')}>
                        <div className={cx('product-image')}>
                            <ImageWithRef src={JpgImages.avatar} className={cx('image')} alt="Ảnh sản phẩm" isModified />
                        </div>

                        <div className={cx('section')}>
                            <span className={cx('title')}>Source code</span>
                            <div className={cx('list')}>
                                <Technology src={Icons.Github} name="Github" />
                                <Technology src={Icons.Gitlab} name="Gitlab" />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Ngôn ngữ lập trình</span>
                            <div className={cx('list')}>
                                <Technology src={Icons.HTML} name="HTML" />
                                <Technology src={Icons.CSS} name="CSS" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Frameworks</span>
                            <div className={cx('list')}>
                                <Technology src={Icons.HTML} name="HTML" />
                                <Technology src={Icons.CSS} name="CSS" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                                <Technology src={Icons.CSS} name="JavaScript" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-right', 'col-4')}>
                        <div className={cx('library-used')}>
                            <p className={cx('library-heading')}>Danh sách thư viện sử dụng</p>
                            <div className={cx('divide')}>
                                <span className={cx('text', 'active')}>Front-end</span>
                                <span className={cx('text')}>Back-end</span>
                            </div>
                            <div className={cx('library-list')}>
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                                <Library src={Icons.Github} name="React router dom" version="6.10.0" />
                            </div>
                            <div className={cx('paganition')}>
                                <PaginationBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
