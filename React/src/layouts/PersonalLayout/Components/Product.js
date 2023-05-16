import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import { JpgImages, Icons } from '~/components/Image/Images.js';
import AllUsedLibraries from './AllUsedLibraries';

const cx = className.bind(styles);

const SOURCE_CODE = [
    {
        id: 1,
        src: Icons.Github,
        name: 'Github',
    },
    {
        id: 2,
        src: Icons.Gitlab,
        name: 'Gitlab',
    },
];

const PRO_LANGUAGES = [
    {
        id: 1,
        src: Icons.HTML,
        name: 'HTML',
    },
    {
        id: 2,
        src: Icons.CSS,
        name: 'CSS',
    },
];
class Product extends PureComponent {
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
                                editText="Sửa ảnh"
                                sizeEditBtn="large"
                            />
                        </div>

                        <div className={cx('section')}>
                            <span className={cx('title')}>Source code</span>
                            <div className={cx('list')}>
                                <Technology data={SOURCE_CODE} />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Ngôn ngữ lập trình</span>
                            <div className={cx('list')}>
                                <Technology data={PRO_LANGUAGES} />
                            </div>
                        </div>
                        <div className={cx('section')}>
                            <span className={cx('title')}>Frameworks</span>
                            <div className={cx('list')}>
                                <Technology data={PRO_LANGUAGES} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-right', 'col-4')}>
                        <AllUsedLibraries />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
