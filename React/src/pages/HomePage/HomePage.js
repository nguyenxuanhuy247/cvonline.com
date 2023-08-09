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

const cx = classnames.bind(styles);

class HomePage extends PureComponent {
    componentDidMount() {
        this.props.readHomeLayout();
    }

    render() {
        return (
            <MainLayout>
                <div className={cx('home-page')}>
                    {this.props.allCVList?.map((userCV) => {
                        const { userInfo, numberofProduct, FETechnologyList, BETechnologyList } = userCV;
                        return (
                            <Link to={`/${userInfo.id}`}>
                                <div className={cx('candidate')}>
                                    <div className={cx('avatar-name-job-title')}>
                                        <Image
                                            src={userInfo.avatar}
                                            className={cx('avatar')}
                                            alt={userInfo.fullName}
                                            round
                                        />
                                        <span className={cx('full-name')}>{userInfo.fullName}</span>
                                        <span className={cx('job-title')}>{userInfo.jobPosition}</span>
                                    </div>
                                    <div className={cx('outcome')}>
                                        <div className={cx('project-technology')}>
                                            <div className={cx('project-stats')}>
                                                <span className={cx('text')}>Số lượng sản phẩm :</span>
                                                <span className={cx('number')}>{numberofProduct || 0}</span>
                                            </div>
                                            <div className={cx('technology-stats')}>
                                                <div className={cx('text')}>Công nghệ sử dụng :</div>
                                                <div className={cx('listed')}>
                                                    <div className={cx('side')}>
                                                        <span className={cx('title')}>Front-end</span>
                                                        {FETechnologyList?.length > 0 ? (
                                                            <div className={cx('list')}>
                                                                {FETechnologyList?.map((technology) => {
                                                                    return (
                                                                        <div className={cx('technology')}>
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
                                                                    className={cx('image')}
                                                                />
                                                                <span className={cx('text')}>Danh sách trống</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={cx('side')}>
                                                        <span className={cx('title')}>Back-end</span>
                                                        <div className={cx('list')}>
                                                            {BETechnologyList?.length > 0 ? (
                                                                BETechnologyList?.map((technology) => {
                                                                    return (
                                                                        <div className={cx('technology')}>
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
                                                                        className={cx('image')}
                                                                    />
                                                                    <span className={cx('text')}>Danh sách trống</span>
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
