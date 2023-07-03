import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { BsKeyboard } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { FaMicrophone } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import DefaultTippy from '@tippyjs/react';

import styles from './SearchBar.module.scss';
import Button from '~/components/Button/Button.js';
const cx = classnames.bind(styles);

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { searchValue: '', loading: false };
    }

    handleInputValue = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('search-bar')}>
                    <input
                        className={cx('search-input')}
                        value={this.state.searchValue}
                        placeholder="Tìm kiếm tên sản phẩm"
                        spellCheck={false}
                        onInput={(e) => this.handleInputValue(e)}
                    />

                    <DefaultTippy content="Bàn phím ảo" arrow="">
                        <Button className={cx('keyboard')}>
                            <BsKeyboard />
                        </Button>
                    </DefaultTippy>

                    <DefaultTippy content="Xóa" arrow="">
                        <Button className={cx('close')}>
                            <GrClose />
                        </Button>
                    </DefaultTippy>

                    <DefaultTippy content="Tìm kiếm" arrow="">
                        <Button className={cx('magnify')}>
                            <FiSearch />
                        </Button>
                    </DefaultTippy>
                </div>
                <DefaultTippy content="Tìm kiếm bằng giọng nói" arrow="">
                    <Button className={cx('micro-button')}>
                        <FaMicrophone />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default SearchBar;
