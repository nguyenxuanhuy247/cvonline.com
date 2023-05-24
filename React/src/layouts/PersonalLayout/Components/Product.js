import { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
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
    {
        id: 3,
        src: Icons.HTML,
        name: 'Python',
    },
    {
        id: 4,
        src: Icons.CSS,
        name: 'JavaScript',
    },
];
class Product extends PureComponent {
    render() {
        return (
            <div className={cx('container')} spellCheck="false">
                <div className={cx('row no-gutters')}>
                    <div className={cx('col pc-12')}>
                        <div className={cx('work-exp-desc')} spellCheck="false">
                            <div className={cx('work-exp')}>
                                <ContentEditableTag
                                    className={cx('exp')}
                                    placeholder="Tên công ty"
                                    reduxName="companyName"
                                />
                                <span className={cx('dash')}>-</span>
                                <ContentEditableTag
                                    className={cx('exp')}
                                    placeholder="Vị trí công việc"
                                    reduxName="jobPosition"
                                />
                            </div>
                            <ContentEditableTag
                                className={cx('desc')}
                                placeholder="Mô tả ngắn gọn về sản phẩm"
                                reduxName="productDesc"
                            />
                        </div>
                        <div>
                            <Image
                                src={JpgImages.avatar}
                                wrapperClass={cx('wrapper')}
                                className={cx('image')}
                                alt="Ảnh sản phẩm"
                                editButton="Sửa ảnh"
                            />
                        </div>
                    </div>
                    <div className={cx('wrapper')}>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-7')}>
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
                                        <Technology data={PRO_LANGUAGES} isEdit draggable />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col pc-5')}>
                                <AllUsedLibraries />
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

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
