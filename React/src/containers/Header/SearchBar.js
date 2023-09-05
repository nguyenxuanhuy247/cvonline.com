import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import HeadlessTippy from '@tippyjs/react/headless';
import _ from 'lodash';

import * as userActions from '~/store/actions';
import styles from './SearchBar.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';
import Loading from '~/components/Modal/Loading.js';

const cx = classnames.bind(styles);

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { searchValue: '', visible: false, startSearching: false };
        this.debouncedHandleChange = _.debounce(this.debounceInputSearchValue, 1000);
    }

    handleInputSearchValue = (e) => {
        const value = e.target.value?.trimStart();
        if (value) {
            this.setState({ searchValue: value, visible: true, startSearching: false });
        } else {
            this.setState({ searchValue: value, visible: false, startSearching: false });
            this.props.clearSearchResult();
        }
    };

    debounceInputSearchValue = (e) => {
        const value = e.target.value?.trimStart();
        if (value) {
            this.props.readSearch(value);
            this.setState({ startSearching: true });
        }
    };

    handleClearInputValue = () => {
        this.setState({ searchValue: '', visible: false, startSearching: false });
        this.props.clearSearchResult();
    };

    handleFocusSearchInput = () => {
        this.setState({ visible: true });
    };

    handleHideTooltip = () => {
        this.setState({ visible: false });
    };

    handleClickOnSreachResult = (productID) => {
        const productName = document.getElementById(`js-product-name-${productID}`);

        if (productName) {
            productName.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    componentWillUnmount() {
        this.props.clearSearchResult();
    }

    render() {
        const { className } = this.props;
        const isHasSeachResult = this.props.searchResultList.length > 0;

        return (
            <HeadlessTippy
                visible={this.state.visible && this.state.searchValue}
                onClickOutside={() => this.handleHideTooltip()}
                zIndex="10"
                placement="bottom"
                interactive
                delay={[0, 300]}
                offset={[0, 10]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <div className={cx('search-result-tooltip')}>
                            <div className={cx('search-result-container')} id="js-container-search-result">
                                <div className={cx('search-display')}>
                                    <span className={cx('icon-container')}>
                                        {!this.props.isLoading ? (
                                            <RxMagnifyingGlass className={cx('magnify')} />
                                        ) : (
                                            true && <Loading inner search />
                                        )}
                                    </span>
                                    <p className={cx('text')}>
                                        {this.props.isLoading ? (
                                            <span>Tìm kiếm cho</span>
                                        ) : isHasSeachResult ? (
                                            <span>Kết quả cho</span>
                                        ) : !this.state.startSearching ? (
                                            <span>Kết quả cho</span>
                                        ) : (
                                            <span>Không có kết quả cho</span>
                                        )}
                                        <span>{` '${this.state.searchValue}'`}</span>
                                    </p>
                                </div>

                                {this.props.searchResultList?.map((result, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={cx('short-search-result')}
                                            route={`/${result.user.id}`}
                                            onClick={() => this.handleClickOnSreachResult(result.id)}
                                        >
                                            <Image
                                                src={result.image || JpgImages.productPlaceholder}
                                                className={cx('product-image')}
                                            />
                                            <div className={cx('result-desc')}>
                                                <p className={cx('product-name')}>{result.name}</p>
                                                <div className={cx('author')}>
                                                    <p className={cx('name')}>
                                                        {result.user.fullName
                                                            ? result.user.fullName
                                                            : 'Chưa có Tên tác giả'}
                                                    </p>
                                                    <p className={cx('separate')}>-</p>
                                                    <p className={cx('job-title')}>
                                                        {result.user.jobPosition
                                                            ? result.user.jobPosition
                                                            : 'Chưa có Vị trí ứng tuyển'}
                                                    </p>
                                                </div>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className={cx('search-bar', className)}>
                    <span className={cx('magnify')}>
                        <RxMagnifyingGlass />
                    </span>
                    <input
                        className={cx('search-input')}
                        value={this.state.searchValue}
                        placeholder="Tìm kiếm sản phẩm"
                        spellCheck={false}
                        onInput={(e) => this.handleInputSearchValue(e)}
                        onChange={this.debouncedHandleChange}
                        onFocus={() => this.handleFocusSearchInput()}
                    />
                    <Button
                        className={cx('clear', { hide: !this.state.searchValue })}
                        onClick={() => this.handleClearInputValue()}
                    >
                        <GrClose />
                    </Button>
                </div>
            </HeadlessTippy>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading.search,
        searchResultList: state.user.searchResultList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        readSearch: (data) => dispatch(userActions.readSearch(data)),
        clearSearchResult: () => dispatch({ type: 'CLEAR_SEARCH_RESULT' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
