import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './HomePage.module.scss';
import { MainLayout } from '~/layouts';
import Image from '~/components/Image/Image.js';
import * as userActions from '~/store/actions';
import Loading from '~/components/Modal/Loading.js';
import { JpgImages } from '~/components/Image/Images';
import NotFound404 from '~/pages/CVPage/Components/404Page.js';

const cx = classnames.bind(styles);

class HomePage extends PureComponent {
    componentDidMount() {
        this.props.readHomeLayout();
    }

    render() {
        const length = this.props.allCVList?.length;

        return (
            <MainLayout isShowScrollButtons={true}>
                <div className={cx('home-page')}>
                    {length > 0 && (
                        <div className={cx('home-page-container')}>
                            {this.props.allCVList?.map((userCV, index) => {
                                const { userInfo, numberofProduct, FETechnologyList, BETechnologyList } = userCV;
                                return (
                                    <Link to={`/${userInfo.id}`} key={index}>
                                        <div className={cx('candidate')}>
                                            <div className={cx('avatar-name-job-title')}>
                                                <Image
                                                    src={userInfo.avatar}
                                                    className={cx('avatar')}
                                                    alt={userInfo.fullName}
                                                    round
                                                />
                                                <div className={cx('full-name-job-title')}>
                                                    <span className={cx('full-name')}>{userInfo.fullName}</span>
                                                    <span className={cx('job-title')}>{userInfo.jobPosition}</span>
                                                </div>
                                            </div>
                                            <div className={cx('outcome')}>
                                                <div className={cx('project-technology')}>
                                                    <div className={cx('project-stats')}>
                                                        <span className={cx('number')}>{numberofProduct || 0}</span>
                                                        <span className={cx('text')}>sản phẩm</span>
                                                    </div>
                                                    <div className={cx('technology-stats')}>
                                                        <div className={cx('text')}>CÔNG NGHỆ SỬ DỤNG</div>
                                                        <div className={cx('listed')}>
                                                            <div className={cx('side')}>
                                                                <span className={cx('title')}>Front-end</span>
                                                                {FETechnologyList?.length > 0 ? (
                                                                    <div className={cx('list')}>
                                                                        {FETechnologyList?.map((technology, index) => {
                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    className={cx('technology')}
                                                                                >
                                                                                    {technology.image && (
                                                                                        <Image
                                                                                            src={technology?.image}
                                                                                            className={cx('image')}
                                                                                        />
                                                                                    )}
                                                                                    <span className={cx('name')}>
                                                                                        {technology?.name}
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                ) : (
                                                                    <div className={cx('empty-list')}>
                                                                        <Image
                                                                            src={JpgImages.emptyProductIcon}
                                                                            className={cx('empty-list-image')}
                                                                        />
                                                                        <span className={cx('empty-list-text')}>
                                                                            Danh sách trống
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className={cx('side')}>
                                                                <span className={cx('title')}>Back-end</span>
                                                                <div className={cx('list')}>
                                                                    {BETechnologyList?.length > 0 ? (
                                                                        BETechnologyList?.map((technology, index) => {
                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    className={cx('technology')}
                                                                                >
                                                                                    {technology.image && (
                                                                                        <Image
                                                                                            src={technology?.image}
                                                                                            className={cx('image')}
                                                                                        />
                                                                                    )}
                                                                                    <span className={cx('name')}>
                                                                                        {technology?.name}
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        })
                                                                    ) : (
                                                                        <div className={cx('empty-list')}>
                                                                            <Image
                                                                                src={JpgImages.emptyProductIcon}
                                                                                className={cx('empty-list-image')}
                                                                            />
                                                                            <span className={cx('empty-list-text')}>
                                                                                Danh sách trống
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {length <= 0 && this.props.allCVList !== undefined && (
                        <NotFound404 text="Không tìm thấy danh sách CV" />
                    )}

                    {this.props.isLoading && <Loading text="Đang tải..." />}
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.homeLayout,
        allCVList: state.user.allCVList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readHomeLayout: () => dispatch(userActions.readHomeLayout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
