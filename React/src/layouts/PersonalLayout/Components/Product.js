import { PureComponent, createRef } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import Library from '~/components/Library/Library.js';
import PaginationBar from '~/components/Pagination/PaginationBar.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages, Icons } from '~/components/Image/Images.js';
import LibraryList from './LibraryList';

const cx = className.bind(styles);

const FE_LIBRARY_LIST = [
    {
        id: 1,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 2,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 3,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 4,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 5,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 6,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 7,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 8,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 9,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 10,
        icon: Icons.Github,
        name: 'React router dom',
        version: '6.10.0',
    },
];

const BE_LIBRARY_LIST = [
    {
        id: 1,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 2,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 3,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 4,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 5,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 6,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 7,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 8,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 9,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
    {
        id: 10,
        icon: Icons.Gitlab,
        name: 'React router dom',
        version: '6.10.0',
    },
];

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFE: false,
        };
        this.FEBtnRef = createRef();
        this.BEBtnRef = createRef();
    }

    handleShowFELibraryList = () => {
        console.log('FE Button: ', this.FEBtnRef.current);
        this.setState({ isFE: true });
        this.FEBtnRef.current.classList.add(cx('active'));
        this.BEBtnRef.current.classList.remove(cx('active'));
    };

    handleShowBELibraryList = () => {
        this.setState({ isFE: false });
        this.FEBtnRef.current.classList.remove(cx('active'));
        this.BEBtnRef.current.classList.add(cx('active'));
    };

    render() {
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
                            <ImageWithRef
                                src={JpgImages.avatar || JpgImages.placeholder}
                                className={cx('image')}
                                alt="Ảnh sản phẩm"
                                isModified
                            />
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
                                <button
                                    className={cx('text', 'active', 'FE-btn')}
                                    onClick={() => this.handleShowFELibraryList()}
                                    ref={this.FEBtnRef}
                                >
                                    Front-end
                                </button>
                                <button
                                    className={cx('text', 'BE-btn')}
                                    onClick={() => this.handleShowBELibraryList()}
                                    ref={this.BEBtnRef}
                                >
                                    Back-end
                                </button>
                            </div>
                            <div className={cx('library-list')}>
                                {this.state.isFE ? (
                                    <LibraryList data={FE_LIBRARY_LIST} />
                                ) : (
                                    <LibraryList data={BE_LIBRARY_LIST} />
                                )}
                            </div>
                            <div className={cx('paganition')}>
                                <PaginationBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
