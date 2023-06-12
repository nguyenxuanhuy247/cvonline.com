import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Product.module.scss';
import Technology from '~/components/Technology/Technology.js';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages, Icons } from '~/components/Image/Images.js';
import LibraryList from './LibraryList.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';
import * as userActions from '~/store/actions';

const cx = classnames.bind(styles);

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
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            imageUrl: '',
        };
    }

    onClose = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getImageUrlFromChangeImageModal = (url) => {
        this.setState({ imageUrl: url });
    };

    componentDidMount() {
        this.props.readFramework();
    }

    render() {
        const { frameworkList } = this.props;

        let frameworkListArray;
        if (Array.isArray(frameworkList)) {
            frameworkListArray = frameworkList;
        } else {
            frameworkListArray = [frameworkList];
        }

        return (
            <div className={cx('product')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col pc-12')}>
                        <div className={cx('product-desc')} spellCheck="false">
                            <div className={cx('work-exp')}>
                                <ContentEditableTag className={cx('exp')} placeholder="Tên sản phẩm" />
                            </div>
                            <ContentEditableTag className={cx('desc')} placeholder="Mô tả ngắn gọn về sản phẩm" />
                        </div>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -200]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <div className={cx('tooltip')} onClick={() => this.setState({ isModalOpen: true })}>
                                        Sửa ảnh
                                    </div>
                                </div>
                            )}
                        >
                            <Image
                                src={this.state.imageUrl || JpgImages.avatar}
                                className={cx('image')}
                                alt="Ảnh sản phẩm"
                            />
                        </HeadlessTippy>

                        {this.state.isModalOpen && (
                            <ChangeImageModal
                                round={false}
                                onClose={this.onClose}
                                onGetUrl={this.getImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>
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
                                <Technology data={frameworkListArray} isEdit draggable />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col pc-5')}>
                        <LibraryList />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        frameworkList: state.user.readFramework.frameworks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readFramework: () => dispatch(userActions.readTechnology('framework', 'FRAMEWORK', 'ALL', 'FW')),
        createFramework: (data) => dispatch(userActions.createTechnology('framework', 'FRAMEWORK', data)),
        updateFramework: (data) => dispatch(userActions.updateTechnology('framework', 'FRAMEWORK', data)),
        deleteFramework: (isFE, id) => dispatch(userActions.deleteTechnology('framework', 'FRAMEWORK', isFE, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
