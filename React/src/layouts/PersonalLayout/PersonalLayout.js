import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { RiEnglishInput } from 'react-icons/ri';
import { TbLanguageHiragana } from 'react-icons/tb';
import HeadlessTippy from '@tippyjs/react/headless';

import Header from '~/containers/Header/Header.js';
import Product from '~/layouts/PersonalLayout/Components/Product.js';
import PersonalInfo from '~/layouts/PersonalLayout/Components/PersonalInfo.js';
import PersonalInformation from '~/layouts/PersonalLayout/Components/PersonalInformation.js';

import styles from './PersonalLayout.module.scss';
import ContentEditableTag from '~/layouts/PersonalLayout/Components/ContentEditableTag.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';

const cx = classnames.bind(styles);

const LANGUAGES = [
    {
        id: 1,
        icon: <RiEnglishInput />,
        placeholder: 'Tiếng anh',
    },
    {
        id: 2,
        icon: <TbLanguageHiragana />,
        placeholder: 'Tiếng nhật',
    },
];

class PersonalLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            avatarUrl: '',
            avatarBase64: '',
        };
    }

    handleCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    getAvatarUrlFromChangeImageModal = (url) => {
        this.setState({ avatarUrl: url });
    };

    render = () => {
        return (
            <div className={cx('body')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('grid wide')}>
                        <div className={cx('row no-gutters')}>
                            <div className={cx('col pc-3')}>
                                <div className={cx('col-left')}>
                                    <div className={cx('avatar-wrapper')}>
                                        <div className={cx('border-outline')}>
                                            <HeadlessTippy
                                                zIndex="10"
                                                placement="bottom"
                                                interactive
                                                delay={[0, 300]}
                                                offset={[0, -100]}
                                                render={(attrs) => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <div
                                                            className={cx('tooltip')}
                                                            onClick={() => this.setState({ isModalOpen: true })}
                                                        >
                                                            Sửa ảnh
                                                        </div>
                                                    </div>
                                                )}
                                            >
                                                <Image
                                                    className={cx('avatar')}
                                                    src={this.state.avatarUrl || JpgImages.JpgImages}
                                                    width="170px"
                                                    height="170px"
                                                    alt={`${this.props?.user?.fullName}`}
                                                    round
                                                />
                                            </HeadlessTippy>
                                            {this.state.isModalOpen && (
                                                <ChangeImageModal
                                                    round
                                                    onClose={this.handleCloseChangeImageModal}
                                                    onGetUrl={this.getAvatarUrlFromChangeImageModal}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <ContentEditableTag
                                        content={this.props?.user?.fullName}
                                        className={cx('full-name')}
                                        placeholder="Nguyễn Xuân Huy"
                                    />
                                    <select className={cx('select-job-title')} onMouseEnter={(e) => e.target.focus()}>
                                        <option className={cx('option-job-title')}>Fullstack developer</option>
                                        <option className={cx('option-job-title')}>Frontend developer</option>
                                        <option className={cx('option-job-title')}>Backend developer</option>
                                    </select>
                                    <div className={cx('separate')}></div>
                                    <PersonalInformation email={this.props?.user?.email} />
                                    <div></div>
                                    <div className={cx('separate')}></div>
                                    <PersonalInfo title="Trình độ ngoại ngữ" data={LANGUAGES} />
                                </div>
                            </div>

                            <div className={cx('col pc-9')}>
                                <div className={cx('product-list')}>
                                    <Product />
                                    {/* <Product />
                                    <Product /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLayout);
