import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import Library from '~/components/Library/Library.js';
import Images from '~/assets/icons/Images.js';
import PaginationBar from '~/components/Pagination/PaginationBar.js';
import Avatar from '~/assets/img/avatar.jpg';

const cx = className.bind(styles);

class Product extends Component {
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
        console.log(this.state.company);
        return (
            <div className={cx('container')} spellCheck="false">
                <div className={cx('company')}>
                    <p
                        className={cx('name')}
                        contentEditable="true"
                        onInput={(e) => this.handleChangeNameCompany(e)}
                        suppressContentEditableWarning={true}
                    >
                        Tên công ty
                    </p>
                    <span className={cx('dash')}>-</span>
                    <p className={cx('job-title')}>Vị trí công việc</p>
                </div>
                <div className={cx('description')}>
                    <p
                        className={cx('job-title')}
                        contentEditable="true"
                        data-placeholder="Mô tả ngắn gọn về sản phẩm"
                        spellCheck="false"
                    ></p>
                </div>

                <div className={cx('product-detail')}>
                    <div className={cx('col-left')}>
                        <div className={cx('product-image')}>
                            <img className={cx('image')} src={Avatar} alt="" />
                        </div>

                        <div className={cx('section')}>
                            <span className={cx('title')}>Source code</span>
                            <div className={cx('list')}>
                                <Technology src={Images.Github} name="Github" />
                                <Technology src={Images.Gitlab} name="Gitlab" />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Ngôn ngữ lập trình</span>
                            <div className={cx('list')}>
                                <Technology src={Images.HTML} name="HTML" />
                                <Technology src={Images.CSS} name="CSS" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Frameworks</span>
                            <div className={cx('list')}>
                                <Technology src={Images.HTML} name="HTML" />
                                <Technology src={Images.CSS} name="CSS" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                                <Technology src={Images.CSS} name="JavaScript" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-right')}>
                        <div className={cx('library-used')}>
                            <p className={cx('library-heading')}>Danh sách thư viện sử dụng</p>
                            <div className={cx('divide')}>
                                <span className={cx('text', 'active')}>Front-end</span>
                                <span className={cx('text')}>Back-end</span>
                            </div>
                            <div className={cx('library-list')}>
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
                                <Library src={Images.Github} name="React router dom" version="6.10.0" />
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
