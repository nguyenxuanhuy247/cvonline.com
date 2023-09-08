import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import styles from './MainLayout.module.scss';
import Header from '~/containers/Header/Header';
import SideBar from '~/containers/SideBar/SideBar';

const cx = classnames.bind(styles);

class MainLayout extends PureComponent {
    componentDidMount() {
        // Scroll to TOP or BOTTOM button
        const goToTopButton = document.getElementById('go-top-button');
        const goToBottomButton = document.getElementById('go-bottom-button');

        if (goToTopButton && goToBottomButton) {
            const checkHeight = () => {
                const documentHeight = document.body.scrollHeight;
                const scrollTY_innerHeight = window.scrollY + window.innerHeight;

                if (scrollTY_innerHeight >= documentHeight - 50) {
                    goToTopButton.style.display = 'grid';
                    goToBottomButton.style.display = 'none';
                } else if (window.scrollY > 0) {
                    goToTopButton.style.display = 'grid';
                    goToBottomButton.style.display = 'grid';
                } else if (window.scrollY <= 50) {
                    goToTopButton.style.display = 'none';
                    goToBottomButton.style.display = 'none';
                }
            };

            window.addEventListener('scroll', checkHeight);

            goToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            goToBottomButton.addEventListener('click', () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    render() {
        const { isShowScrollButtons } = this.props;
        
        return (
            <div className={cx('main-layout')}>
                <Header />
                <SideBar />

                <div className={cx('main-section')}>{this.props.children}</div>

                {isShowScrollButtons && (
                    <div className={cx('scroll-to-top-bottom')}>
                        <span className={cx('go-to-button', 'go-top')} id="go-top-button">
                            <FaArrowUp />
                        </span>
                        <span className={cx('go-to-button', 'go-bottom')} id="go-bottom-button">
                            <FaArrowDown />
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.authLayout,
    };
};

export default connect(mapStateToProps, null)(MainLayout);
