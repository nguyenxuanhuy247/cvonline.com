import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import DefaultTippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import * as userActions from '~/store/actions';
import styles from './SearchBar.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import { JpgImages } from '~/components/Image/Images.js';

const cx = classnames.bind(styles);

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { searchValue: '', loading: false, visible: false };
    }

    handleInputValue = async (e) => {
        const clearInputValueButton = document.getElementById('js-clear-input-value-button');

        await this.setState({ searchValue: e.target.value, visible: true });

        const value = e.target.value?.trim();

        if (value) {
            const notFoundElement = document.querySelector(`.${cx('not-found-result')}`);

            if (clearInputValueButton) {
                clearInputValueButton.classList.remove(cx('hide'));
            }

            notFoundElement?.classList.add(cx('hide'));

            this.props.productList?.forEach((product) => {
                const productElement = document.getElementById(`js-product-${product.id}`);
                const productSearchResult = document.getElementById(`js-short-search-result-${product.id}`);
                const productName = document.getElementById(`js-search-result-name-${product.id}`);
                const productDesc = document.getElementById(`js-search-result-desc-${product.id}`);

                if (productElement && productSearchResult && productName && productDesc) {
                    productSearchResult.style.display = 'flex';

                    const isIncludesName = productName.innerHTML.toLowerCase().includes(value?.trim().toLowerCase());
                    const isIncludesDesc = productDesc.innerHTML.toLowerCase().includes(value?.trim().toLowerCase());
                    if (isIncludesName || isIncludesDesc) {
                        productSearchResult.onclick = () => {
                            productElement.scrollIntoView();
                            this.setState({ visible: false });
                        };
                    } else {
                        productSearchResult.style.display = 'none';
                    }
                }
            });

            const searchResultArrary = document.querySelectorAll('[id*=js-short-search-result');
            if (searchResultArrary) {
                const isAllNone = Array.from(searchResultArrary).every((node) => {
                    return node.getAttribute('style') === 'display: none;';
                });

                if (isAllNone) {
                    notFoundElement.classList.remove(cx('hide'));
                }
            }
        } else {
            if (clearInputValueButton) {
                clearInputValueButton.classList.add(cx('hide'));
            }
            this.setState({ searchValue: e.target.value, visible: false });
        }
    };

    handleClearInputValue = () => {
        const clearInputValueButton = document.getElementById('js-clear-input-value-button');
        clearInputValueButton?.classList.add(cx('hide'));

        this.setState({ searchValue: '', visible: false });
    };

    handleHideTooltip = () => {
        this.setState({ visible: false });
    };

    render() {
        const { className } = this.props;

        const productInfoList = this.props.productList?.map((product) => {
            return product.productInfo;
        });

        return (
            <HeadlessTippy
                visible={this.state.visible && this.state.searchValue}
                // visible="true"
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
                                    <RxMagnifyingGlass className={cx('magnify')} />
                                    <p className={cx('text')}>
                                        <span>Kết quả cho</span>
                                        <span>{` '${this.state.searchValue}'`}</span>
                                    </p>
                                </div>

                                {productInfoList?.map((product, index) => {
                                    const productDescResult = document.getElementById(
                                        `js-search-result-desc-${product.id}`,
                                    );

                                    if (productDescResult) {
                                        productDescResult.innerText = product.desc;
                                    }

                                    return (
                                        <Button
                                            key={index}
                                            className={cx('short-search-result')}
                                            id={`js-short-search-result-${product.id}`}
                                        >
                                            <Image
                                                src={product.image || JpgImages.productPlaceholder}
                                                className={cx('product-image')}
                                            />
                                            <div className={cx('result-desc')}>
                                                <p
                                                    className={cx('product-name')}
                                                    id={`js-search-result-name-${product.id}`}
                                                >
                                                    {product.name}
                                                </p>
                                                <div className={cx('author')}>
                                                    <p
                                                        className={cx('name')}
                                                        id={`js-search-result-name-${product.id}`}
                                                    >
                                                        Nguyễn Xuân Huy
                                                    </p>
                                                    <span className={cx('separate')}>|</span>
                                                    <p
                                                        className={cx('job-title')}
                                                        id={`js-search-result-name-${product.id}`}
                                                    >
                                                        Front-end developer
                                                    </p>
                                                </div>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                            <p className={cx('not-found-result', 'hide')}>Không tìm thấy sản phẩm nào</p>
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
                        onChange={(e) => this.handleInputValue(e)}
                        onFocus={(e) => this.handleInputValue(e)}
                    />
                    <DefaultTippy content="Xóa" arrow="">
                        <Button
                            className={cx('clear', 'hide')}
                            onClick={() => this.handleClearInputValue()}
                            id="js-clear-input-value-button"
                        >
                            <GrClose />
                        </Button>
                    </DefaultTippy>
                </div>
            </HeadlessTippy>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productList: state.user.productList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
