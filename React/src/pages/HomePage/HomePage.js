import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './HomePage.module.scss';
import { MainLayout } from '~/layouts';
import Image from '~/components/Image/Image.js';

const cx = classnames.bind(styles);

class HomePage extends PureComponent {
    render() {
        return (
            <MainLayout>
                <div className={cx('home-page')}>
                    <Link to="/2">
                        <div className={cx('candidate')}>
                            <div className={cx('image-name-job-title')}>
                                <Image className={cx('image')} alt="Nguyen Xuan Huy" round />
                                <span className={cx('full-name')}>Nguyen Xuan Huyasdddddddddasdadasdasd</span>
                                <span className={cx('job-title')}>Fullstack developer</span>
                            </div>
                            <div className={cx('outcome')}>
                                <div className={cx('project-technology')}>
                                    <div className={cx('project')}>
                                        <span className={cx('number')}>3</span>
                                        san pham
                                    </div>
                                    <div className={cx('technology')}>
                                        <div className={cx('side')}>
                                            <span className={cx('title')}>Front-end</span>
                                            <div className={cx('list')}>
                                                <div className={cx('button')}>- HTML</div>
                                                <div className={cx('button')}>- CSS</div>
                                                <div className={cx('button')}>- JavaScript</div>
                                            </div>
                                        </div>
                                        <div className={cx('side')}>
                                            <span className={cx('title')}>Back-end</span>
                                            <div className={cx('list')}>
                                                <div className={cx('button')}>- HTML</div>
                                                <div className={cx('button')}>- CSS</div>
                                                <div className={cx('button')}>- JavaScript</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(HomePage);
